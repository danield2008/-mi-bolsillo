/* MI BOLSILLO · Funciones principales
   El sitio usa tema oscuro permanente. Este script solo gestiona el menú móvil.
*/
(() => {
  "use strict";
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

  navigation?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();
