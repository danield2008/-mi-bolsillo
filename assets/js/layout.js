/* MI BOLSILLO · Cabecera y pie reutilizables */
(() => {
  "use strict";
  const script = document.currentScript;
  const root = script?.dataset.root || "./";
  const headerTarget = document.getElementById("site-header");
  const footerTarget = document.getElementById("site-footer");
  const logo = `
    <span class="brand-logo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5h16a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M16 13h5"/><path d="M17 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg></span>
    <span class="brand-name">Mi <span>Bolsillo</span></span>`;
  if (headerTarget) {
    headerTarget.innerHTML = `
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      <header class="site-header"><div class="header-inner">
        <a href="${root}index.html" class="brand" aria-label="Mi Bolsillo - Inicio">${logo}</a>
        <nav class="main-nav" id="main-nav" aria-label="Navegación principal">
          <a href="${root}index.html">Inicio</a>
          <a href="${root}categorias/ahorro/index.html">Ahorro</a>
          <a href="${root}categorias/presupuesto/index.html">Presupuesto</a>
          <a href="${root}categorias/deudas/index.html">Deudas</a>
          <a href="${root}categorias/inversion/index.html">Inversión</a>
          <a href="${root}herramientas/index.html">Calculadoras</a>
          <a href="${root}blog/index.html">Blog</a>
        </nav>
        <div class="header-actions">
          <button class="icon-button" id="theme-toggle" type="button" aria-label="Activar modo oscuro" title="Cambiar tema"><span id="theme-icon" aria-hidden="true">☾</span></button>
          <button class="icon-button menu-toggle" id="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-nav"><span aria-hidden="true">☰</span></button>
        </div>
      </div></header>`;
  }
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer"><div class="container"><div class="footer-grid">
        <div class="footer-brand"><a href="${root}index.html" class="brand" aria-label="Mi Bolsillo - Inicio">${logo}</a><p class="footer-description">Educación financiera para todos. Aprende a ahorrar, organizar tu dinero y tomar mejores decisiones.</p></div>
        <div class="footer-column"><h3>Aprende</h3><ul>
          <li><a href="${root}categorias/ahorro/index.html">Ahorro</a></li><li><a href="${root}categorias/presupuesto/index.html">Presupuesto</a></li><li><a href="${root}categorias/deudas/index.html">Deudas</a></li><li><a href="${root}categorias/inversion/index.html">Inversión</a></li><li><a href="${root}blog/index.html">Blog</a></li>
        </ul></div>
        <div class="footer-column"><h3>Herramientas</h3><ul>
          <li><a href="${root}herramientas/calculadora-ahorro.html">Calculadora de ahorro</a></li><li><a href="${root}herramientas/interes-compuesto.html">Interés compuesto</a></li><li><a href="${root}herramientas/regla-50-30-20.html">Regla 50/30/20</a></li><li><a href="${root}herramientas/cuota-prestamo.html">Cuota de préstamo</a></li>
        </ul></div>
        <div class="footer-column"><h3>Información</h3><ul>
          <li><a href="${root}sobre-nosotros.html">Sobre nosotros</a></li><li><a href="${root}contacto.html">Contacto</a></li><li><a href="${root}legal/privacidad.html">Privacidad</a></li><li><a href="${root}legal/cookies.html">Cookies</a></li><li><a href="${root}legal/aviso-legal.html">Aviso legal</a></li><li><a href="${root}legal/descargo-financiero.html">Aviso financiero</a></li>
        </ul></div>
      </div><div class="footer-bottom"><p>© ${new Date().getFullYear()} Mi Bolsillo. Todos los derechos reservados.</p><p>Educación financiera independiente. No constituye asesoramiento financiero personalizado.</p></div></div></footer>`;
  }
  if (headerTarget) {
    const currentPath = window.location.pathname;
    headerTarget.querySelectorAll(".main-nav a").forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || (linkPath !== "/" && currentPath.startsWith(linkPath))) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }
})();