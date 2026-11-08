# Mi Bolsillo

Web estática de educación financiera en español, enfocada en ahorro, presupuesto, deudas e inversión básica para público de España.

## Tecnología
- HTML5, CSS3 y JavaScript puro.
- Sin frameworks, servidor ni base de datos.
- Preparada para GitHub Pages y dominio personalizado.
- Diseño adaptable y modo oscuro.

## Estructura
```
/
├── index.html
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   ├── layout.js
    │   ├── main.js
    │   └── search.js
    └── img/
        ├── logo.svg
        └── favicon.svg
```

## Desarrollo local
Abre la carpeta en Visual Studio Code y sirve los archivos con cualquier servidor estático local. También puedes abrir `index.html` directamente, aunque un servidor local reproduce mejor el comportamiento del alojamiento.

## Publicación
En GitHub, entra en **Settings → Pages**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/(root)`. Guarda los cambios.

## Dominio
Por ahora el sitio utiliza la dirección gratuita de GitHub Pages: `https://danield2008.github.io/-mi-bolsillo/`. No se ha configurado un dominio personalizado ni se necesita comprar uno para continuar. Si más adelante se registra `mibolsillo.es`, se actualizarán las URL canónicas, los metadatos y la configuración DNS/CNAME antes de conectar el dominio.

## SEO y contenido
Antes del lanzamiento:
- Completar artículos y categorías enlazados desde la Home.
- Crear sitemap.xml y robots.txt con las URL definitivas.
- Revisar canonical y metadatos en cada página.
- Verificar el sitio en Google Search Console.
- Comprobar enlaces, accesibilidad y Core Web Vitals.

## Publicidad y privacidad
No se ha activado Google AdSense ni se carga publicidad. Antes de usar cookies o publicidad personalizada, implanta un mecanismo de consentimiento adecuado y publica la información legal correspondiente.

## Aviso
El contenido será educativo y no sustituye el asesoramiento financiero personalizado. Las herramientas ofrecen estimaciones y deben explicar sus supuestos.


## Plan editorial
El mapa SEO de 60 artículos está en [docs/plan-editorial-60-articulos.md](docs/plan-editorial-60-articulos.md). Incluye siete clústeres temáticos, palabras clave principales, intención de búsqueda, dificultad cualitativa y las 15 primeras prioridades de cola larga.


## Artículos publicados
En `blog/` están disponibles los tres primeros artículos completos:
- `como-ahorrar-100-euros.html` — ahorro mensual.
- `regla-50-30-20.html` — organización del sueldo.
- `fondo-emergencia.html` — reserva para imprevistos.

El índice del blog está en `blog/index.html`. Se han creado páginas de categoría para ahorro y presupuesto. Las categorías todavía sin artículos propios se muestran temporalmente como secciones en preparación y llevan `noindex` hasta que tengan contenido suficiente.

Los artículos incluyen metadatos SEO, URL canónica, Open Graph, datos estructurados Article, BreadcrumbList y FAQPage, índice automático, tiempo estimado de lectura, controles para compartir y fuentes oficiales enlazadas. Las estimaciones de lectura se calculan en navegador.
