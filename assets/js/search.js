/* MI BOLSILLO · Buscador interno */
(() => {
  "use strict";
  const form = document.getElementById("search-form");
  const input = document.getElementById("article-search");
  const grid = document.getElementById("article-grid");
  const status = document.getElementById("search-status");
  const noResults = document.getElementById("no-results");
  if (!form || !input || !grid) return;
  const articles = [...grid.querySelectorAll(".article-card")];
  function normalize(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }
  function searchArticles(query) {
    const term = normalize(query); let visible = 0;
    articles.forEach(article => {
      const searchableText = normalize(`${article.dataset.title || ""} ${article.dataset.category || ""} ${article.dataset.keywords || ""} ${article.textContent || ""}`);
      const matches = !term || searchableText.includes(term);
      article.hidden = !matches; if (matches) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0 || term === "";
    if (status) status.textContent = term ? `${visible} artículo(s) encontrado(s).` : "";
  }
  form.addEventListener("submit", event => { event.preventDefault(); searchArticles(input.value); });
  input.addEventListener("input", () => searchArticles(input.value));
})();