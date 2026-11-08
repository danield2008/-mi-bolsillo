/* MI BOLSILLO · Navegación, animaciones y efectos de interfaz */
(() => {
  "use strict";

  // Menú móvil: se conserva el funcionamiento existente.
  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-nav");

  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    const icon = menuButton.querySelector("span");
    if (icon) icon.textContent = "☰";
  }

  menuButton?.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    const icon = menuButton.querySelector("span");
    if (icon) icon.textContent = isOpen ? "✕" : "☰";
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

  // Respeta las preferencias de accesibilidad del sistema.
  const motionPreference = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
  const reduceMotion = Boolean(motionPreference?.matches);

  // La cabecera gana un fondo algo más profundo cuando se desplaza la página.
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    let scrollScheduled = false;

    const updateHeaderOnScroll = () => {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
      scrollScheduled = false;
    };

    const onScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(updateHeaderOnScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHeaderOnScroll();
  }

  // Sin movimiento reducido o sin Intersection Observer, todo queda visible.
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const hero = document.querySelector(".hero");
  if (hero) {
    const heroSteps = [
      ".hero-content .eyebrow",
      ".hero-content h1",
      ".hero-content .hero-description",
      ".hero-content .hero-actions",
      ".hero-content .hero-trust"
    ];

    heroSteps.forEach((selector, index) => {
      const element = hero.querySelector(selector);
      if (element) element.setAttribute("data-hero-step", String(index));
    });

    const visual = hero.querySelector(".hero-visual");
    if (visual) visual.setAttribute("data-hero-visual", "");
  }

  // Elementos que aparecen al entrar en el área visible.
  const revealSelectors = [
    "main > .section:not(.hero)",
    ".page-hero > .container",
    ".article-header-inner",
    ".article-layout > .article-sidebar",
    ".article-layout > .article-body",
    ".content-shell > .content-narrow",
    ".category-card",
    ".article-card",
    ".tool-card",
    ".tool-directory-card",
    ".related-card",
    ".contact-card",
    ".summary-box",
    ".notice-box",
    ".toc-card",
    ".faq-section details",
    ".article-image",
    "main img",
    ".calculator-panel",
    ".calculator-card",
    ".tool-directory-grid > *",
    ".related-grid > *"
  ];

  const revealElements = new Set();
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (element.closest(".hero")) return;
      revealElements.add(element);
    });
  });

  revealElements.forEach(element => {
    element.setAttribute("data-reveal", "");
  });

  // Pequeño escalonado entre tarjetas que comparten una cuadrícula.
  const revealParents = new Set(
    Array.from(revealElements, element => element.parentElement).filter(Boolean)
  );

  revealParents.forEach(parent => {
    const siblings = Array.from(parent.children).filter(element => revealElements.has(element));
    siblings.forEach((element, index) => {
      const delay = Math.min(index * 65, 260);
      element.style.setProperty("--reveal-delay", delay + "ms");
    });
  });

  // Activamos las reglas de animación solo después de preparar los elementos.
  document.documentElement.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -36px 0px"
  });

  revealElements.forEach(element => revealObserver.observe(element));
})();
