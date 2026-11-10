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
      title: "Primeros pasos para entender los trámites fiscales de una actividad",
      category: "Impuestos y trámites",
      description: "Identifica trámites censales, obligaciones fiscales y fuentes oficiales antes de iniciar una actividad.",
      url: "blog/primeros-pasos-para-entender-los-tramites-fiscales-de-una-actividad.html",
      keywords: "impuestos trámites fiscales actividad económica modelo 036 alta censo AEAT"
    },
    {
      title: "Ingresos extra en España: qué costes y obligaciones revisar",
      category: "Ingresos extra",
      description: "Calcula costes, tiempo y margen real, y revisa las obligaciones que pueden aplicarse.",
      url: "blog/ingresos-extra-en-espana-que-costes-y-obligaciones-revisar.html",
      keywords: "ingresos extra costes beneficio actividad autónomo Seguridad Social Hacienda"
    },
    {
      title: "Cómo comparar cuentas bancarias y tarjetas sin fijarte solo en la oferta",
      category: "Banca y tarjetas",
      description: "Compara comisiones, condiciones, tarjetas, remuneración y modalidades de pago.",
      url: "blog/como-comparar-cuentas-bancarias-y-tarjetas.html",
      keywords: "cuenta bancaria comisiones tarjetas débito crédito comparar TAE bancos"
    },
    {
      title: "Antes de invertir por primera vez: riesgos, costes y plazo",
      category: "Inversión",
      description: "Revisa objetivos, horizonte temporal, riesgo, diversificación y costes antes de invertir.",
      url: "blog/antes-de-invertir-por-primera-vez-riesgos-costes-y-plazo.html",
      keywords: "invertir por primera vez riesgo costes diversificación CNMV productos inversión"
    },
    {
      title: "Cómo organizar el pago de tus deudas sin perder el control",
      category: "Deudas y créditos",
      description: "Ordena préstamos y tarjetas, compara sus costes y prepara un plan de pago realista.",
      url: "blog/como-organizar-el-pago-de-deudas-sin-perder-el-control.html",
      keywords: "organizar pagar deudas préstamos tarjetas intereses TAE revolving crédito"
    },
    {
      title: "Cómo hacer un presupuesto mensual paso a paso",
      category: "Presupuesto",
      description: "Organiza ingresos, gastos fijos, variables y pagos irregulares con un método sencillo.",
      url: "blog/como-hacer-un-presupuesto-mensual-paso-a-paso.html",
      keywords: "presupuesto mensual gastos fijos variables ingresos dinero organizar sueldo"
    },
    {
      title: "Gastos fijos, variables y ocasionales: ejemplos para una casa",
      category: "Presupuesto",
      description: "Distingue cada tipo de gasto y aprende a reservar dinero para pagos que llegan una vez al año.",
      url: "blog/gastos-fijos-variables-y-ocasionales-ejemplos-para-una-casa.html",
      keywords: "gastos fijos variables ocasionales irregulares recibos pagos casa"
    },
    {
      title: "Cómo controlar los gastos diarios sin complicarte",
      category: "Presupuesto",
      description: "Crea una rutina breve para registrar pequeños gastos y revisar tus hábitos sin obsesionarte.",
      url: "blog/como-controlar-los-gastos-diarios-sin-complicarte.html",
      keywords: "gastos diarios gastos hormiga micro spending controlar gastos cafés"
    },
    {
      title: "Cómo fijar un objetivo de ahorro realista y cumplirlo",
      category: "Ahorro",
      description: "Calcula cuánto reservar cada mes y adapta la meta y el plazo a tu presupuesto.",
      url: "blog/como-fijar-un-objetivo-de-ahorro-realista-y-cumplirlo.html",
      keywords: "objetivo ahorro meta realista cuánto ahorrar mensual objetivo ahorro plazo"
    },
    {
      title: "Cómo ahorrar 100 euros al mes sin cambiar toda tu vida",
      category: "Ahorro",
      description: "Un método realista para analizar gastos, ajustar hábitos y automatizar el ahorro.",
      url: "blog/como-ahorrar-100-euros.html",
      keywords: "ahorrar 100 euros sueldo dinero hábitos gasto ahorro mensual"
    },
    {
      title: "La regla 50/30/20: cómo organizar tu sueldo",
      category: "Presupuesto",
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
  ];  const root = (document.querySelector("script[data-root]")?.dataset.root) || "./";
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
