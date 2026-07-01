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

const configuredBaseUrl = (process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const headed = process.env.SCREENSHOT_HEADED === "1";
const autoStartPort = process.env.SCREENSHOT_START_PORT ?? "3100";
const requestedTheme = process.env.SCREENSHOT_THEME ?? "system";
const screenshotTheme = ["light", "dark", "system"].includes(requestedTheme) ? requestedTheme : "system";
const requestedSystemScheme = process.env.SCREENSHOT_SYSTEM_SCHEME ?? "light";
const systemColorScheme = requestedSystemScheme === "dark" ? "dark" : "light";
const resolvedColorScheme = screenshotTheme === "system" ? systemColorScheme : screenshotTheme;

const screenshotRoot = path.join(projectRoot, "screenshots", screenshotTheme);
const filteredCapture = Boolean(process.env.SCREENSHOT_ROUTES || process.env.SCREENSHOT_VIEWPORTS);
const reportPath = path.join(
  screenshotRoot,
  filteredCapture ? "screenshot-report-filtered.json" : "screenshot-report.json",
);

const navigationTimeoutMs = 30_000;
const networkIdleTimeoutMs = 10_000;
const settleDelayMs = 700;
const startupTimeoutMs = 120_000;
const scrollPrimeDelayMs = 80;
const availableViewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 900 },
];
const requestedViewports = (process.env.SCREENSHOT_VIEWPORTS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const viewports = requestedViewports.length
  ? availableViewports.filter((viewport) => requestedViewports.includes(viewport.name))
  : availableViewports;

const routes = [
  "/",
  "/about",
  "/success-stories",
  "/login",
  "/signup",
  "/student/dashboard",
  "/student/onboarding",
  "/student/profile",
  "/student/settings",
  "/student/events",
  "/student/events/spring-2026",
  "/student/event-day",
  "/student/messages",
  "/student/companies/emp-001",
  "/employer/dashboard",
  "/employer/browse",
  "/employer/student/stu-001",
  "/employer/messages",
  "/employer/scanner",
  "/employer/shortlist",
  "/admin",
  "/admin/events",
  "/admin/employers",
];
const requestedRoutes = (process.env.SCREENSHOT_ROUTES ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const captureRoutes = requestedRoutes.length
  ? routes.filter((route) => requestedRoutes.includes(route))
  : routes;

function log(message) {
  console.log(`[screenshots] ${message}`);
}

function makeFileBasename(route) {
  if (route === "/") {
    return "home";
  }

  return route
    .replace(/^\/+|\/+$/g, "")
    .replaceAll("/", "_")
    .replace(/[^\w.-]+/g, "_");
}

function makeRouteUrl(baseUrl, route) {
  return new URL(route, `${baseUrl}/`).toString();
}

function isLocalBaseUrl(urlString) {
  const { hostname } = new URL(urlString);
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
}

async function isHealthyApp(urlString) {
  try {
    const response = await fetch(urlString, {
      signal: AbortSignal.timeout(5_000),
      redirect: "follow",
    });

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return true;
    }

    const html = await response.text();
    return !/<h1[^>]*>\s*Page not found\s*<\/h1>/i.test(html);
  } catch {
    return false;
  }
}

async function stopChildProcess(child) {
  if (!child || child.exitCode !== null) {
    return;
  }

  child.kill("SIGINT");

  const deadline = Date.now() + 10_000;
  while (child.exitCode === null && Date.now() < deadline) {
    await delay(250);
  }

  if (child.exitCode === null) {
    child.kill("SIGKILL");
  }
}

async function ensureLocalApp() {
  const externalBaseUrl = Boolean(process.env.SCREENSHOT_BASE_URL);
  const localBaseUrl = isLocalBaseUrl(configuredBaseUrl);

  if (!localBaseUrl || externalBaseUrl) {
    log(`Using remote/base URL: ${configuredBaseUrl}`);
    return {
      startedServer: false,
      resolvedBaseUrl: configuredBaseUrl,
      cleanup: async () => {},
    };
  }

  if (await isHealthyApp(configuredBaseUrl)) {
    log(`Using existing local app at ${configuredBaseUrl}`);
    return {
      startedServer: false,
      resolvedBaseUrl: configuredBaseUrl,
      cleanup: async () => {},
    };
  }

  log(`No healthy app responded at ${configuredBaseUrl}. Starting local dev server on port ${autoStartPort}...`);

  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  let resolvedBaseUrl = new URL(configuredBaseUrl);
  resolvedBaseUrl.port = autoStartPort;
  let activeBaseUrl = resolvedBaseUrl.toString().replace(/\/$/, "");

  const child = spawn(npmCommand, ["run", "dev", "--", "--port", autoStartPort], {
    cwd: projectRoot,
    env: {
      ...process.env,
      BROWSER: "none",
    },
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });

  child.stdout.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text) {
      console.log(`[app] ${text}`);
      const localUrlMatch = text.match(/https?:\/\/localhost:\d+/);
      if (localUrlMatch) {
        activeBaseUrl = localUrlMatch[0];
      }
    }
  });

  child.stderr.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text) {
      console.error(`[app] ${text}`);
      const localUrlMatch = text.match(/https?:\/\/localhost:\d+/);
      if (localUrlMatch) {
        activeBaseUrl = localUrlMatch[0];
      }
    }
  });

  const deadline = Date.now() + startupTimeoutMs;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Local dev server exited early with code ${child.exitCode}`);
    }

    if (await isHealthyApp(activeBaseUrl)) {
      log(`Local dev server is ready at ${activeBaseUrl}`);
      await delay(1_000);
      return {
        startedServer: true,
        resolvedBaseUrl: activeBaseUrl,
        cleanup: async () => stopChildProcess(child),
      };
    }

    await delay(1_000);
  }

  await stopChildProcess(child);
  throw new Error(`Timed out after ${startupTimeoutMs / 1000}s waiting for ${activeBaseUrl}`);
}

async function navigateWithFallback(page, url) {
  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: navigationTimeoutMs,
    });
    return "networkidle";
  } catch (error) {
    log(`networkidle fallback for ${url}: ${error instanceof Error ? error.message : String(error)}`);
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: navigationTimeoutMs,
    });
    return "domcontentloaded";
  }
}

async function applyScreenshotStability(page) {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: resolvedColorScheme });

  await page.evaluate(() => {
    const styleId = "nexhibit-screenshot-style";
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
      }

      html {
        scroll-behavior: auto !important;
      }

      html:focus-within {
        scroll-behavior: auto !important;
      }

      [data-motion-control="true"],
      .custom-cursor-dot,
      .custom-cursor-ring,
      nextjs-portal,
      [data-nextjs-dialog-overlay],
      [data-nextjs-toast],
      [data-nextjs-build-indicator],
      [data-nextjs-dev-overlay] {
        display: none !important;
      }
    `;

    document.head.append(style);
  });

  try {
    await page.waitForLoadState("networkidle", { timeout: networkIdleTimeoutMs });
  } catch {
    // Some routes keep background activity alive; fall through gracefully.
  }

  try {
    await page.waitForFunction(
      () => {
        if (!("fonts" in document)) {
          return true;
        }
        return document.fonts.status === "loaded";
      },
      { timeout: 5_000 },
    );
  } catch {
    // Fonts help with stability, but should not block captures forever.
  }

  try {
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => image.complete),
      { timeout: 5_000 },
    );
  } catch {
    // Continue even if an image stays pending.
  }

  await page.waitForTimeout(settleDelayMs);
}

async function primeViewportReveals(page) {
  const metrics = await page.evaluate(() => ({
    height: window.innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
  }));

  if (metrics.scrollHeight <= metrics.height * 1.2) {
    return;
  }

  const step = Math.max(320, Math.floor(metrics.height * 0.82));
  for (let y = 0; y < metrics.scrollHeight; y += step) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(scrollPrimeDelayMs);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(settleDelayMs);
}

async function assertRouteResolved(page, route) {
  const isNotFound = await page.evaluate(() => {
    const heading = document.querySelector("h1")?.textContent?.trim() ?? "";
    return heading === "Page not found";
  });

  if (isNotFound) {
    throw new Error(`Route rendered the not-found page: ${route}`);
  }
}

async function captureFailureScreenshot(page, targetPath) {
  try {
    await page.screenshot({
      path: targetPath,
      fullPage: true,
    });
    return true;
  } catch {
    return false;
  }
}

async function ensureOutputFolders() {
  await mkdir(screenshotRoot, { recursive: true });

  for (const viewport of viewports) {
    await mkdir(path.join(screenshotRoot, viewport.name), { recursive: true });
  }
}

async function launchBrowser() {
  try {
    return {
      browser: await chromium.launch({
        headless: !headed,
      }),
      browserTarget: "playwright-chromium",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const missingExecutable = message.includes("Executable doesn't exist");

    if (!missingExecutable) {
      throw error;
    }

    log("Playwright Chromium executable is not installed locally. Falling back to the installed Google Chrome app.");

    return {
      browser: await chromium.launch({
        channel: "chrome",
        headless: !headed,
      }),
      browserTarget: "google-chrome-fallback",
    };
  }
}

async function main() {
  if (viewports.length === 0) {
    throw new Error("SCREENSHOT_VIEWPORTS must include desktop, tablet, or mobile.");
  }
  if (captureRoutes.length === 0) {
    throw new Error("SCREENSHOT_ROUTES did not match a configured screenshot route.");
  }

  await ensureOutputFolders();
  log(`Using ${screenshotTheme} theme (resolved color scheme: ${resolvedColorScheme})`);

  const runtime = await ensureLocalApp();
  const activeBaseUrl = runtime.resolvedBaseUrl;
  const totalCaptures = viewports.length * captureRoutes.length;
  const results = [];
  let browser;
  let browserTarget = "playwright-chromium";

  try {
    const launchResult = await launchBrowser();
    browser = launchResult.browser;
    browserTarget = launchResult.browserTarget;

    let captureIndex = 0;

    for (const viewport of viewports) {
      log(`Starting ${viewport.name} captures at ${viewport.width}x${viewport.height}`);

      const context = await browser.newContext({
        viewport: {
          width: viewport.width,
          height: viewport.height,
        },
        deviceScaleFactor: 1,
        colorScheme: resolvedColorScheme,
      });
      await context.addInitScript((theme) => {
        window.localStorage.setItem("nexhibit-theme", theme);
      }, screenshotTheme);

      const page = await context.newPage();
      page.setDefaultTimeout(navigationTimeoutMs);
      page.setDefaultNavigationTimeout(navigationTimeoutMs);

      for (const route of captureRoutes) {
        captureIndex += 1;

        const basename = makeFileBasename(route);
        const screenshotPath = path.join(screenshotRoot, viewport.name, `${basename}.png`);
        const failedScreenshotPath = path.join(screenshotRoot, viewport.name, `${basename}__failed.png`);
        const targetUrl = makeRouteUrl(activeBaseUrl, route);

        log(`[${captureIndex}/${totalCaptures}] ${viewport.name} ${route}`);

        const result = {
          timestamp: new Date().toISOString(),
          baseUrl: activeBaseUrl,
          viewport: viewport.name,
          route,
          status: "success",
          screenshotPath: path.relative(projectRoot, screenshotPath),
          errorMessage: null,
        };

        try {
          await navigateWithFallback(page, targetUrl);
          await applyScreenshotStability(page);
          await assertRouteResolved(page, route);
          await primeViewportReveals(page);
          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
          });

          log(`Saved ${path.relative(projectRoot, screenshotPath)}`);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const savedFailureShot = await captureFailureScreenshot(page, failedScreenshotPath);

          result.status = "failed";
          result.screenshotPath = savedFailureShot
            ? path.relative(projectRoot, failedScreenshotPath)
            : null;
          result.errorMessage = message;

          log(`Failed ${viewport.name} ${route}: ${message}`);
        }

        results.push(result);
      }

      await context.close();
    }
  } finally {
    if (browser) {
      await browser.close();
    }

    await runtime.cleanup();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: activeBaseUrl,
    theme: screenshotTheme,
    resolvedColorScheme,
    headed,
    browserTarget,
    results,
  };

  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const successCount = results.filter((item) => item.status === "success").length;
  const failureCount = results.length - successCount;

  log(`Wrote report to ${path.relative(projectRoot, reportPath)}`);
  log(`Finished with ${successCount} success(es) and ${failureCount} failure(s).`);

  if (failureCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[screenshots] Fatal error: ${message}`);
  process.exitCode = 1;
});
