export type DemoRole = "student" | "employer" | "admin";

export type DemoSession = {
  role: DemoRole;
  userName: string;
  startedAt: string;
};

export const DEMO_SESSION_STORAGE_KEY = "nexhibit-demo-session";

const demoUserNames: Record<DemoRole, string> = {
  student: "Nattapong Saetang",
  employer: "Alibaba Cloud recruiting team",
  admin: "Career Services Admin",
};

export function getDemoRoleLabel(role: DemoRole) {
  if (role === "student") return "Student demo";
  if (role === "employer") return "Employer demo";
  return "Admin demo";
}

export function getDemoUserName(role: DemoRole) {
  return demoUserNames[role];
}

export function setDemoSession(role: DemoRole) {
  if (typeof window === "undefined") return;

  const session: DemoSession = {
    role,
    userName: getDemoUserName(role),
    startedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(DEMO_SESSION_STORAGE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<DemoSession>;
    if (parsed.role === "student" || parsed.role === "employer" || parsed.role === "admin") {
      return {
        role: parsed.role,
        userName: parsed.userName ?? getDemoUserName(parsed.role),
        startedAt: parsed.startedAt ?? new Date().toISOString(),
      };
    }
  } catch {
    window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
  }

  return null;
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_SESSION_STORAGE_KEY);
}
