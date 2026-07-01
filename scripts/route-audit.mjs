#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const configuredBaseUrl = (process.env.ROUTE_AUDIT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const autoStartPort = process.env.ROUTE_AUDIT_START_PORT ?? "3105";
const reportPath = path.join(projectRoot, ".next", "route-audit-report.json");
const startupTimeoutMs = 120_000;
const navigationTimeoutMs = 15_000;

const routes = [
  "/",
  "/about",
  "/success-stories",
  "/login",
  "/signup",
  "/pricing",
  "/pricing/student",
  "/pricing/employer",
  "/pricing/university",
  "/student/dashboard",
  "/student/onboarding",
  "/student/profile",
  "/student/settings",
  "/student/events",
  "/student/events/spring-2026",
  "/student/event-day",
  "/student/messages",
  "/student/companies/emp-001",
  "/student/coach",
  "/student/global",
  "/student/live-booth",
  "/student/network",
  "/student/upgrade",
  "/student/billing",
  "/student/billing/history",
  "/student/billing/invoices",
  "/student/billing/payment-methods",
  "/student/billing/cancel",
  "/employer/dashboard",
  "/employer/browse",
  "/employer/student/stu-001",
  "/employer/messages",
  "/employer/scanner",
  "/employer/shortlist",
  "/employer/upgrade",
  "/employer/billing",
  "/employer/billing/history",
  "/employer/billing/invoices",
  "/employer/billing/payment-methods",
  "/admin",
  "/admin/events",
  "/admin/employers",
  "/admin/billing",
  "/admin/billing/transactions",
  "/admin/billing/refunds",
  "/billing/receipt/txn-stu-001",
];

const scenarios = [
  { name: "desktop-light", width: 1280, height: 900, theme: "light" },
  { name: "mobile-light", width: 375, height: 900, theme: "light" },
  { name: "desktop-dark", width: 1280, height: 900, theme: "dark" },
];

function log(message) {
  console.log(`[route-audit] ${message}`);
}

function isLocalBaseUrl(urlString) {
  const { hostname } = new URL(urlString);
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

async function isHealthyApp(urlString) {
  try {
    const response = await fetch(urlString, {
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) return false;
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return true;

    const html = await response.text();
    return !/<h1[^>]*>\s*Page not found\s*<\/h1>/i.test(html);
  } catch {
    return false;
  }
}

async function stopChildProcess(child) {
  if (!child || child.exitCode !== null) return;

  child.kill("SIGINT");
  const deadline = Date.now() + 10_000;
  while (child.exitCode === null && Date.now() < deadline) {
    await delay(250);
  }

  if (child.exitCode === null) child.kill("SIGKILL");
}

async function ensureLocalApp() {
  if (!isLocalBaseUrl(configuredBaseUrl) || process.env.ROUTE_AUDIT_BASE_URL) {
    return { baseUrl: configuredBaseUrl, cleanup: async () => {} };
  }

  if (await isHealthyApp(configuredBaseUrl)) {
    return { baseUrl: configuredBaseUrl, cleanup: async () => {} };
  }

  const resolved = new URL(configuredBaseUrl);
  resolved.port = autoStartPort;
  let activeBaseUrl = resolved.toString().replace(/\/$/, "");

  log(`Starting local dev server on ${activeBaseUrl}`);
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(npmCommand, ["run", "dev", "--", "--port", autoStartPort], {
    cwd: projectRoot,
    env: { ...process.env, BROWSER: "none" },
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });

  child.stdout.on("data", (chunk) => {
    const text = chunk.toString().trim();
    const match = text.match(/https?:\/\/localhost:\d+/);
    if (match) activeBaseUrl = match[0];
  });

  child.stderr.on("data", (chunk) => {
    const text = chunk.toString().trim();
    const match = text.match(/https?:\/\/localhost:\d+/);
    if (match) activeBaseUrl = match[0];
  });

  const deadline = Date.now() + startupTimeoutMs;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Local dev server exited early with code ${child.exitCode}`);
    }

    if (await isHealthyApp(activeBaseUrl)) {
      await delay(1_000);
      return { baseUrl: activeBaseUrl, cleanup: async () => stopChildProcess(child) };
    }

    await delay(1_000);
  }

  await stopChildProcess(child);
  throw new Error(`Timed out waiting for ${activeBaseUrl}`);
}

function makeUrl(baseUrl, route) {
  return new URL(route, `${baseUrl}/`).toString();
}

async function inspectPage(page, route, scenario, consoleErrors) {
  const result = await page.evaluate(({ route: currentRoute, scenarioName }) => {
    const isVisible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden"
        && style.display !== "none"
        && Number(style.opacity) !== 0
        && rect.width > 0
        && rect.height > 0;
    };

    const textOf = (element) => (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
    const h1s = [...document.querySelectorAll("h1")].filter(isVisible).map(textOf).filter(Boolean);
    const issues = [];

    if (h1s.length !== 1) issues.push(`h1 count ${h1s.length}`);

    const navVisible = [...document.querySelectorAll("header, nav")].some(isVisible);
    if (!navVisible) issues.push("nav/header missing");

    const bodyText = document.body.innerText;

    const themeControl = [...document.querySelectorAll("button, [role='button']")]
      .some((element) => /theme/i.test(element.getAttribute("aria-label") ?? textOf(element)));
    if (!themeControl) issues.push("theme toggle missing");

    const unnamedButtons = [...document.querySelectorAll("button")]
      .filter(isVisible)
      .filter((button) => {
        const name = (button.getAttribute("aria-label") ?? button.getAttribute("title") ?? textOf(button)).trim();
        return !name;
      });
    if (unnamedButtons.length) issues.push(`unnamed icon buttons ${unnamedButtons.length}`);

    const unlabeledFields = [...document.querySelectorAll("input, textarea, select")]
      .filter(isVisible)
      .filter((field) => field.closest("[aria-hidden='true']") === null)
      .filter((field) => field.getAttribute("aria-hidden") !== "true")
      .filter((field) => field.tabIndex !== -1)
      .filter((field) => field.getAttribute("type") !== "hidden")
      .filter((field) => {
        const id = field.getAttribute("id");
        const hasLabel = field.closest("label") || (id && document.querySelector(`label[for="${CSS.escape(id)}"]`));
        const hasAria = field.getAttribute("aria-label") || field.getAttribute("aria-labelledby");
        return !hasLabel && !hasAria;
      });
    if (unlabeledFields.length) issues.push(`unlabeled fields ${unlabeledFields.length}`);

    if (scenarioName.includes("mobile")) {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      if (overflow > 2) issues.push(`horizontal overflow ${overflow}px`);
    }

    if (/billing|upgrade|pricing/.test(currentRoute) && !/Prototype billing|No real payment|mock checkout|demo mode/i.test(bodyText)) {
      issues.push("prototype billing notice missing");
    }

    return {
      issues,
      h1s,
      unlabeledFields: unlabeledFields.map((field) => field.getAttribute("placeholder") || field.tagName.toLowerCase()),
      unnamedButtons: unnamedButtons.length,
    };
  }, { route, scenarioName: scenario.name });

  if (consoleErrors.length) {
    result.issues.push(`console errors ${consoleErrors.length}`);
  }

  return result;
}

async function hasLogoutAccess(page, route) {
  const appRoute = route.startsWith("/student") || route.startsWith("/employer") || route.startsWith("/admin");
  if (!appRoute) return true;

  const userMenu = page.getByRole("button", { name: /user menu/i }).first();
  if (await userMenu.isVisible().catch(() => false)) {
    return true;
  }

  const mobileMenu = page.getByRole("button", { name: /open.*menu/i }).first();
  if (await mobileMenu.isVisible().catch(() => false)) {
    await mobileMenu.click({ force: true });
    await page.waitForTimeout(150);
    return /log\s*out/i.test(await page.locator("body").innerText());
  }

  return /log\s*out/i.test(await page.locator("body").innerText());
}

async function runInteractionChecks(browser, baseUrl) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  const results = [];

  async function gotoInteractive(route) {
    await page.goto(makeUrl(baseUrl, route), { waitUntil: "load" });
    await page.waitForTimeout(350);
  }

  async function check(name, action) {
    try {
      await action();
      results.push({ name, passed: true });
    } catch (error) {
      results.push({
        name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  try {
    await check("theme persists and resolves dark", async () => {
      await gotoInteractive("/login");
      await page.getByRole("button", { name: /Theme:/ }).click();
      await page.getByText("Dark", { exact: true }).click();
      const theme = await page.evaluate(() => ({
        stored: window.localStorage.getItem("nexhibit-theme"),
        resolved: document.documentElement.dataset.theme,
      }));
      if (theme.stored !== "dark" || theme.resolved !== "dark") {
        throw new Error(`Expected persisted dark theme, received ${JSON.stringify(theme)}`);
      }
    });

    await check("admin demo login and logout", async () => {
      await gotoInteractive("/login");
      await page.getByRole("button", { name: "Admin", exact: true }).click();
      await page.waitForTimeout(100);
      await page.getByRole("button", { name: "Open admin demo", exact: true }).click();
      await page.waitForURL("**/admin", { timeout: 5_000 });
      await page.waitForTimeout(350);
      const role = await page.evaluate(() => {
        const raw = window.localStorage.getItem("nexhibit-demo-session");
        return raw ? JSON.parse(raw).role : null;
      });
      if (role !== "admin") throw new Error(`Expected admin session, received ${String(role)}`);

      await page.getByRole("button", { name: /Admin demo user menu/i }).click();
      await page.getByRole("menuitem", { name: /Log out demo session/i }).click();
      await page.waitForURL("**/login", { timeout: 5_000 });
      const session = await page.evaluate(() => window.localStorage.getItem("nexhibit-demo-session"));
      if (session !== null) throw new Error("Demo session remained after logout");
    });

    await check("student dashboard action feedback", async () => {
      await gotoInteractive("/student/dashboard");
      await page.getByRole("button", { name: "Promote winner", exact: true }).click();
      await page.waitForFunction(
        () => document.body.innerText.toLowerCase().includes("promoted for this prototype session"),
        { timeout: 3_000 },
      );
    });

    await check("event-day QR pass feedback", async () => {
      await gotoInteractive("/student/event-day");
      await page.getByRole("button", { name: /Show.*QR/i }).click();
      await page.waitForTimeout(100);
      await page.locator("button").filter({ hasText: "Download demo pass" }).click();
      await page.waitForFunction(
        () => document.body.innerText.includes("No real credential was downloaded"),
        { timeout: 3_000 },
      );
    });

    await check("profile pitch, evidence, and employer preview", async () => {
      await gotoInteractive("/student/profile");
      await page.getByRole("button", { name: "Pitch & Verify", exact: true }).click();
      await page.getByText("Demo pitch builder", { exact: true }).waitFor({ state: "visible", timeout: 3_000 });

      await page.getByRole("button", { name: "Portfolio", exact: true }).click();
      await page.getByText("Portfolio evidence builder", { exact: true }).waitFor({ state: "visible", timeout: 3_000 });

      await page.getByRole("button", { name: "Preview as employer", exact: true }).click();
      const previewDialog = page.getByRole("dialog");
      const preview = await previewDialog.count();
      const h1Count = await page.locator("h1").count();
      const previewTitle = await previewDialog.getByRole("heading", { name: "Nattapong Saetang", level: 2 }).count();
      if (preview !== 1 || h1Count !== 1 || previewTitle !== 1) {
        throw new Error(`Preview semantics failed: dialog=${preview}, h1=${h1Count}, title=${previewTitle}`);
      }
    });
  } finally {
    await context.close();
  }

  return results;
}

async function run() {
  const server = await ensureLocalApp();
  const browser = await chromium.launch({ headless: true });
  const interactionsOnly = process.env.ROUTE_AUDIT_INTERACTIONS_ONLY === "1";
  const failures = [];
  const checks = [];
  let interactionChecks = [];

  try {
    if (!interactionsOnly) {
    for (const scenario of scenarios) {
      const context = await browser.newContext({
        viewport: { width: scenario.width, height: scenario.height },
        colorScheme: scenario.theme,
      });

      await context.addInitScript((theme) => {
        window.localStorage.setItem("nexhibit-theme", theme);
        window.localStorage.setItem("nexhibit-demo-session", JSON.stringify({
          role: "student",
          userName: "Nattapong Saetang",
          startedAt: new Date().toISOString(),
        }));
      }, scenario.theme);

      const page = await context.newPage();

      for (const route of routes) {
        const consoleErrors = [];
        const onConsole = (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        };
        page.on("console", onConsole);

        const url = makeUrl(server.baseUrl, route);
        let status = 0;
        let error = null;

        try {
          const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: navigationTimeoutMs });
          status = response?.status() ?? 0;
          await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
        } catch (navigationError) {
          error = navigationError instanceof Error ? navigationError.message : String(navigationError);
          try {
            const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: navigationTimeoutMs });
            status = response?.status() ?? 0;
            await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
          } catch {
            status = 0;
          }
        }

        await page.waitForTimeout(250);
        const pageResult = status >= 400 || status === 0
          ? { issues: [`status ${status || "navigation failed"}`], h1s: [], unlabeledFields: [], unnamedButtons: 0 }
          : await inspectPage(page, route, scenario, consoleErrors);

        if (!(await hasLogoutAccess(page, route))) {
          pageResult.issues.push("logout missing");
        }

        if (error) pageResult.navigationWarning = error;

        const check = {
          scenario: scenario.name,
          route,
          status,
          ...pageResult,
        };
        checks.push(check);

        if (check.issues.length) failures.push(check);
        page.off("console", onConsole);
      }

      await context.close();
    }
    }
    interactionChecks = await runInteractionChecks(browser, server.baseUrl);
  } finally {
    await browser.close();
    await server.cleanup();
  }

  const report = {
    baseUrl: server.baseUrl,
    checked: checks.length,
    interactionChecks,
    issueCount: failures.length + interactionChecks.filter((check) => !check.passed).length,
    failures,
  };

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(JSON.stringify(report, null, 2));

  if (report.issueCount) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
