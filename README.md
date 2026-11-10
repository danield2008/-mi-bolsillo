# Mi Bolsillo

Proyecto estático de educación financiera en español, dirigido principalmente a lectores de España. Incluye guías de ahorro, presupuesto, banca, deuda e inversión básica, además de calculadoras gratuitas que se ejecutan en el navegador.

## Dominio y publicación

Dominio configurado en el repositorio mediante el archivo `CNAME`:

**https://mibolsillo.eu/**

El repositorio utiliza GitHub Pages desde `main` y la carpeta `/(root)`. Antes de considerar el dominio plenamente operativo, hay que comprobar en Namecheap los registros DNS requeridos por GitHub Pages, el estado del dominio en **Settings → Pages**, la emisión del certificado HTTPS y la redirección entre las variantes con y sin `www`.

No volver a utilizar `danield2008.github.io/-mi-bolsillo/` como canonical o URL pública principal una vez que el dominio personalizado esté operativo.

## Tecnología y funciones

- HTML5, CSS3 y JavaScript puro.
- Diseño responsive y modo oscuro permanente.
- Cabecera y pie reutilizables.
- Buscador desplegable en la cabecera y página de resultados.
- Seis calculadoras que realizan sus operaciones en el navegador.
- Animaciones progresivas con Intersection Observer y respeto a `prefers-reduced-motion`.
- Metadatos SEO, Open Graph, canonicals y datos estructurados en las páginas de contenido.

## Estructura principal

```
/
├── index.html
├── buscar.html
├── sobre-nosotros.html
├── contacto.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── blog/
│   ├── index.html
│   ├── plantilla-articulo.html
│   └── [7 artículos publicados]
├── categorias/
│   ├── index.html
│   └── [7 categorías]
├── herramientas/
│   ├── index.html
│   └── [6 calculadoras]
├── legal/
└── assets/
    ├── css/
    ├── js/
    └── img/
```

## Publicar un artículo nuevo

1. Crea el archivo dentro de `blog/` usando `blog/plantilla-articulo.html` como base.
2. Escribe contenido original, útil y revisado; utiliza fuentes primarias y ejemplos hipotéticos claramente identificados.
3. Sustituye título, descripción, canonical, Open Graph, fechas, autoría y datos estructurados.
4. Añade enlaces internos desde la categoría correspondiente, el índice del blog y los artículos relacionados.
5. Actualiza los dos índices de búsqueda: `assets/js/header-search.js` y `assets/js/search.js`.
6. Actualiza `sitemap.xml` solo con las páginas indexables y verifica los enlaces.

## Calculadoras

Las seis calculadoras comparten `assets/js/calculators.js`. Los resultados son estimaciones educativas. No sustituyen las condiciones contractuales, la TAE ni el asesoramiento profesional.

## SEO y mantenimiento

- Utiliza `https://mibolsillo.eu/` como dominio canónico cuando DNS y HTTPS estén verificados.
- Mantén `robots.txt` y `sitemap.xml` sincronizados con el dominio real.
- No incluyas en el sitemap las páginas `noindex`, la plantilla, la página de búsqueda ni el error 404.
- Revisa enlaces, metadatos, fuentes y fechas en cada publicación.
- Verifica el dominio en Search Console y envía `https://mibolsillo.eu/sitemap.xml` cuando el dominio responda correctamente.

## Privacidad, contacto y publicidad

El sitio es estático y no tiene cuentas, base de datos ni newsletter conectada. El enlace de incidencias de GitHub lleva a una plataforma externa y pública; no se deben publicar datos personales ni financieros. El correo de contacto indicado debe verificarse antes de dar por operativo el canal.

El código actual no instala etiquetas de analítica o publicidad ni utiliza almacenamiento local para preferencias. Antes de añadir AdSense hay que completar la identidad legal y domicilio del responsable, revisar las políticas de privacidad y cookies, integrar una CMP certificada adecuada para el EEE y añadir el identificador real de editor a `ads.txt`. No se debe inventar ni publicar un ID de editor de ejemplo.

## Estado del proyecto

- Siete artículos publicados.
- Siete páginas de categoría.
- Seis calculadoras.
- Buscadores conectados a los siete artículos.
- Página de contacto actualizada con el correo facilitado por el propietario; debe comprobarse que el buzón existe y recibe mensajes.
- Documentación legal todavía pendiente de los datos reales del titular y revisión final.
- AdSense y publicidad todavía no instalados.
