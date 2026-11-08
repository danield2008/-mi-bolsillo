/* MI BOLSILLO · Funciones principales */
(() => {
  "use strict";
  const html = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  function getSavedTheme() { try { return localStorage.getItem("mi-bolsillo-theme"); } catch { return null; } }
  function saveTheme(theme) { try { localStorage.setItem("mi-bolsillo-theme", theme); } catch {} }
  function updateTheme(theme) {
    html.dataset.theme = theme;
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    if (themeButton) themeButton.setAttribute("aria-label", theme === "dark" ? "Activar modo claro" : "Activar modo oscuro");
  }
  const savedTheme = getSavedTheme();
  const preferredTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  updateTheme(savedTheme || preferredTheme);
  themeButton?.addEventListener("click", () => {
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
    updateTheme(nextTheme); saveTheme(nextTheme);
  });
  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-nav");
  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    menuButton.querySelector("span").textContent = "☰";
  }
  menuButton?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuButton.querySelector("span").textContent = isOpen ? "✕" : "☰";
  });
  navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
})();