const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
  document.documentElement.setAttribute("data-theme", "dark");
  updateThemeIcons("dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
  updateThemeIcons("light");
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll(".theme-icon");
  icons.forEach((icon) => {
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  });

  const buttons = document.querySelectorAll(
    ".theme-toggle, .theme-toggle-mobile",
  );
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", theme === "dark");
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcons(newTheme);

  document.body.style.transition = "background-color 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

setTimeout(() => {
  const themeToggles = document.querySelectorAll(
    "button.theme-toggle, button.theme-toggle-mobile",
  );

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
  });
});
