/* MI BOLSILLO · Buscador local de contenidos publicados */
(() => {
  "use strict";

  // Mantén este índice actualizado cada vez que publiques un artículo nuevo.
  const articles = [
    {
      title: "Primeros pasos para entender los trámites fiscales de una actividad",
      category: "Impuestos y trámites",
      excerpt: "Identifica trámites censales, obligaciones fiscales y fuentes oficiales antes de iniciar una actividad.",
      url: "blog/primeros-pasos-para-entender-los-tramites-fiscales-de-una-actividad.html",
      keywords: "impuestos trámites fiscales actividad económica modelo 036 alta censo AEAT"
    },
    {
      title: "Ingresos extra en España: qué costes y obligaciones revisar",
      category: "Ingresos extra",
      excerpt: "Calcula costes, tiempo y margen real, y revisa las obligaciones que pueden aplicarse.",
      url: "blog/ingresos-extra-en-espana-que-costes-y-obligaciones-revisar.html",
      keywords: "ingresos extra costes beneficio actividad autónomo Seguridad Social Hacienda"
    },
    {
      title: "Cómo comparar cuentas bancarias y tarjetas sin fijarte solo en la oferta",
      category: "Banca y tarjetas",
      excerpt: "Compara comisiones, condiciones, tarjetas, remuneración y modalidades de pago.",
      url: "blog/como-comparar-cuentas-bancarias-y-tarjetas.html",
      keywords: "cuenta bancaria comisiones tarjetas débito crédito comparar TAE bancos"
    },
    {
      title: "Antes de invertir por primera vez: riesgos, costes y plazo",
      category: "Inversión",
      excerpt: "Revisa objetivos, horizonte temporal, riesgo, diversificación y costes antes de invertir.",
      url: "blog/antes-de-invertir-por-primera-vez-riesgos-costes-y-plazo.html",
      keywords: "invertir por primera vez riesgo costes diversificación CNMV productos inversión"
    },
    {
      title: "Cómo organizar el pago de tus deudas sin perder el control",
      category: "Deudas y créditos",
      excerpt: "Ordena préstamos y tarjetas, compara sus costes y prepara un plan de pago realista.",
      url: "blog/como-organizar-el-pago-de-deudas-sin-perder-el-control.html",
      keywords: "organizar pagar deudas préstamos tarjetas intereses TAE revolving crédito"
    },
    {
      title: "Cómo hacer un presupuesto mensual paso a paso",
      category: "Presupuesto",
      excerpt: "Organiza ingresos, gastos fijos, variables y pagos irregulares con un método sencillo.",
      url: "blog/como-hacer-un-presupuesto-mensual-paso-a-paso.html",
      keywords: "presupuesto mensual gastos fijos variables ingresos dinero organizar sueldo"
    },
    {
      title: "Gastos fijos, variables y ocasionales: ejemplos para una casa",
      category: "Presupuesto",
      excerpt: "Distingue cada tipo de gasto y aprende a reservar dinero para pagos que llegan una vez al año.",
      url: "blog/gastos-fijos-variables-y-ocasionales-ejemplos-para-una-casa.html",
      keywords: "gastos fijos variables ocasionales irregulares recibos pagos casa"
    },
    {
      title: "Cómo controlar los gastos diarios sin complicarte",
      category: "Presupuesto",
      excerpt: "Crea una rutina breve para registrar pequeños gastos y revisar tus hábitos sin obsesionarte.",
      url: "blog/como-controlar-los-gastos-diarios-sin-complicarte.html",
      keywords: "gastos diarios gastos hormiga micro spending controlar gastos cafés"
    },
    {
      title: "Cómo fijar un objetivo de ahorro realista y cumplirlo",
      category: "Ahorro",
      excerpt: "Calcula cuánto reservar cada mes y adapta la meta y el plazo a tu presupuesto.",
      url: "blog/como-fijar-un-objetivo-de-ahorro-realista-y-cumplirlo.html",
      keywords: "objetivo ahorro meta realista cuánto ahorrar mensual objetivo ahorro plazo"
    },
    {
      title: "Cómo ahorrar 100 euros al mes sin cambiar toda tu vida",
      category: "Ahorro",
      excerpt: "Un método realista para analizar gastos, ajustar hábitos y automatizar el ahorro.",
      url: "blog/como-ahorrar-100-euros.html",
      keywords: "ahorrar 100 euros sueldo dinero hábitos gasto ahorro mensual"
    },
    {
      title: "La regla 50/30/20: cómo organizar tu sueldo",
      category: "Presupuesto",
      excerpt: "Reparte tus ingresos netos entre necesidades, deseos y objetivos financieros.",
      url: "blog/regla-50-30-20.html",
      keywords: "regla 50 30 20 presupuesto gastos necesidades deseos ahorro sueldo"
    },
    {
      title: "Fondo de emergencia: cuánto dinero necesitas y dónde guardarlo",
      category: "Ahorro",
      excerpt: "Calcula una reserva para imprevistos y aprende a construirla poco a poco.",
      url: "blog/fondo-emergencia.html",
      keywords: "fondo emergencia ahorro imprevistos dinero colchón gastos esenciales"
    }
  ];  const normalize = value => String(value || "")
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const form = document.getElementById("search-form");
  const input = document.getElementById("article-search");
  const homeGrid = document.getElementById("article-grid");
  const searchResults = document.getElementById("search-results");
  const status = document.getElementById("search-status");
  const noResults = document.getElementById("no-results");

  function matches(query) {
    const q = normalize(query);
    if (!q) return [];
    return articles.filter(article =>
      normalize([article.title, article.category, article.excerpt, article.keywords].join(" ")).includes(q)
    );
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    searchResults.replaceChildren();
    const found = matches(query);

    found.forEach(article => {
      const card = document.createElement("article");
      card.className = "article-card";

      const link = document.createElement("a");
      link.className = "article-image image-saving";
      link.href = article.url;
      link.textContent = "↗";
      link.setAttribute("aria-label", "Leer " + article.title);

      const body = document.createElement("div");
      body.className = "article-body";

      const meta = document.createElement("div");
      meta.className = "article-meta";
      meta.textContent = article.category;

      const heading = document.createElement("h2");
      heading.style.fontSize = "1.12rem";
      const titleLink = document.createElement("a");
      titleLink.href = article.url;
      titleLink.textContent = article.title;
      heading.appendChild(titleLink);

      const excerpt = document.createElement("p");
      excerpt.textContent = article.excerpt;

      const read = document.createElement("a");
      read.className = "article-link";
      read.href = article.url;
      read.textContent = "Leer artículo →";

      body.append(meta, heading, excerpt, read);
      card.append(link, body);
      searchResults.appendChild(card);
    });

    if (status) {
      status.textContent = found.length
        ? found.length + (found.length === 1 ? " artículo encontrado." : " artículos encontrados.")
        : "No hemos encontrado coincidencias.";
    }
    if (noResults) noResults.hidden = found.length > 0;
  }

  // En la Home se mantienen los tres artículos destacados visibles.
  // Al enviar el formulario se buscan todos los artículos en buscar.html.
  if (homeGrid && input) {
    input.addEventListener("input", () => {
      const q = normalize(input.value);
      homeGrid.querySelectorAll(".article-card").forEach(card => { card.hidden = false; });
      if (noResults) noResults.hidden = true;
      if (status) {
        status.textContent = q
          ? "Pulsa Enter para buscar entre los " + articles.length + " artículos publicados."
          : "";
      }
    });
  }

  // Al enviar cualquier buscador se abre la página global de resultados.
  if (form && input) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) {
        input.focus();
        return;
      }
      window.location.assign("buscar.html?q=" + encodeURIComponent(query));
    });
  }

  // Página global de resultados.
  if (searchResults && input) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    input.value = query;
    if (query) renderSearchResults(query);
    form?.addEventListener("submit", event => {
      event.preventDefault();
      const next = input.value.trim();
      if (!next) return;
      window.history.replaceState({}, "", "buscar.html?q=" + encodeURIComponent(next));
      renderSearchResults(next);
    });
  }
})();
