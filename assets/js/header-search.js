/* MI BOLSILLO · Buscador desplegable de cabecera */
(() => {
  "use strict";

  const header = document.getElementById("site-header");
  const toggle = document.getElementById("search-toggle");
  const panel = document.getElementById("header-search-panel");
  const input = document.getElementById("header-search-input");
  const closeButton = document.getElementById("header-search-close");
  const status = document.getElementById("header-search-status");
  const results = document.getElementById("header-search-results");

  if (!header || !toggle || !panel || !input || !results || !status) return;

  const articles = [
    {
      title: "Cómo ahorrar 100 euros al mes sin cambiar toda tu vida",
      category: "Ahorro",
      description: "Un método realista para revisar gastos, elegir ajustes sostenibles y automatizar el ahorro.",
      url: "blog/como-ahorrar-100-euros.html",
      keywords: "ahorrar 100 euros sueldo dinero hábitos gasto ahorro mensual"
    },
    {
      title: "La regla 50/30/20: cómo organizar tu sueldo",
      category: "Presupuesto y gastos",
      description: "Reparte tus ingresos netos entre necesidades, deseos y objetivos financieros.",
      url: "blog/regla-50-30-20.html",
      keywords: "regla 50 30 20 presupuesto gastos necesidades deseos ahorro sueldo"
    },
    {
      title: "Fondo de emergencia: cuánto dinero necesitas y dónde guardarlo",
      category: "Ahorro",
      description: "Calcula una reserva para imprevistos y aprende a construirla poco a poco.",
      url: "blog/fondo-emergencia.html",
      keywords: "fondo emergencia ahorro imprevistos dinero colchón gastos esenciales"
    }
  ];

  const root = (document.querySelector("script[data-root]")?.dataset.root) || "./";
  const normalize = value => String(value || "")
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const closeSearch = (restoreFocus = false) => {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir buscador");
    if (restoreFocus) toggle.focus();
  };

  const renderResults = query => {
    results.replaceChildren();
    const normalized = normalize(query);

    if (!normalized) {
      status.textContent = "Busca artículos sobre ahorro, presupuesto y finanzas.";
      return;
    }

    const terms = normalized.split(/\s+/).filter(Boolean);
    const matches = articles.filter(article => {
      const searchable = normalize([
        article.title, article.category, article.description, article.keywords
      ].join(" "));
      return terms.every(term => searchable.includes(term));
    });

    status.textContent = matches.length
      ? matches.length + (matches.length === 1 ? " resultado encontrado" : " resultados encontrados")
      : "No encontramos resultados. Prueba con otras palabras.";

    matches.forEach(article => {
      const link = document.createElement("a");
      link.className = "header-search-result";
      link.href = root + article.url;

      const title = document.createElement("strong");
      title.textContent = article.title;

      const detail = document.createElement("span");
      detail.textContent = article.category + " · " + article.description;

      link.append(title, detail);
      link.addEventListener("click", () => closeSearch());
      results.appendChild(link);
    });
  };

  toggle.addEventListener("click", () => {
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar buscador" : "Abrir buscador");
    if (open) {
      renderResults(input.value);
      input.focus();
    }
  });

  input.addEventListener("input", () => renderResults(input.value));

  document.getElementById("header-search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    renderResults(input.value);
    results.querySelector("a")?.focus();
  });

  closeButton?.addEventListener("click", () => closeSearch(true));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) closeSearch(true);
  });

  document.addEventListener("click", event => {
    if (!panel.hidden && !header.contains(event.target)) closeSearch();
  });
})();
