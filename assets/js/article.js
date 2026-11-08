/* MI BOLSILLO · Funciones de lectura del artículo */
(() => {
  "use strict";
  const article = document.getElementById("article-body");
  const toc = document.getElementById("toc-list");
  const readingTime = document.getElementById("reading-time");
  const shareButton = document.getElementById("share-article");
  const copyButton = document.getElementById("copy-article-link");
  const shareStatus = document.getElementById("share-status");
  if (!article) return;

  // Crear índice a partir de los encabezados del contenido.
  if (toc) {
    const headings = [...article.querySelectorAll("h2, h3")];
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = "seccion-" + (index + 1);
      const li = document.createElement("li");
      if (heading.tagName === "H3") li.style.marginLeft = "12px";
      const link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent.trim();
      li.appendChild(link);
      toc.appendChild(li);
    });
    if (!headings.length) {
      const li = document.createElement("li");
      li.textContent = "El índice aparecerá al añadir los apartados.";
      toc.appendChild(li);
    }
  }

  // Estimar lectura con 200 palabras por minuto.
  if (readingTime) {
    const text = article.innerText || article.textContent || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    readingTime.textContent = minutes + " min de lectura";
  }

  const pageUrl = window.location.href;
  const pageTitle = document.title;

  shareButton?.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: pageTitle, url: pageUrl });
        if (shareStatus) shareStatus.textContent = "Gracias por compartir.";
      } catch (error) {
        if (error?.name !== "AbortError" && shareStatus) {
          shareStatus.textContent = "No se pudo abrir el menú para compartir.";
        }
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(pageUrl);
      if (shareStatus) shareStatus.textContent = "Enlace copiado para compartir.";
    } catch {
      if (shareStatus) shareStatus.textContent = "Copia la dirección desde la barra del navegador.";
    }
  });

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      if (shareStatus) shareStatus.textContent = "Enlace copiado.";
    } catch {
      if (shareStatus) shareStatus.textContent = "No se pudo copiar automáticamente. Copia la URL del navegador.";
    }
  });
})();
