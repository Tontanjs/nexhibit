export const themeScript = `
(function () {
  try {
    var storageKey = "nexhibit-theme";
    var storedTheme = window.localStorage.getItem(storageKey);
    var theme = storedTheme === "light" || storedTheme === "dark" || storedTheme === "system" ? storedTheme : "system";
    window.localStorage.setItem(storageKey, theme);
    var resolvedTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    var root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = theme;
    root.style.colorScheme = resolvedTheme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.themePreference = "system";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;
