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
El dominio previsto es `mibolsillo.es`. No se ha configurado todavía. Cuando se conecte, configura los registros DNS solicitados por GitHub Pages, añade un archivo `CNAME` con el dominio elegido y activa HTTPS desde Pages cuando esté disponible.

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
