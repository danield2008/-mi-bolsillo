# Mi Bolsillo

Web estática de educación financiera en español, dirigida principalmente a lectores de España. Incluye guías de ahorro y presupuesto, categorías temáticas y calculadoras que funcionan en el navegador.

## Dirección de la web

Actualmente se utiliza GitHub Pages, sin dominio personalizado:

**https://danield2008.github.io/-mi-bolsillo/**

El dominio propio se conectará más adelante. Antes de hacerlo habrá que actualizar canonical, Open Graph, datos estructurados, sitemap, DNS y configuración de GitHub Pages. No se debe crear un archivo `CNAME` hasta tener el dominio registrado y sus DNS preparados.

## Tecnología

- HTML5, CSS3 y JavaScript puro.
- Sin frameworks, base de datos ni servidor propio.
- Diseño responsive y **modo oscuro permanente**.
- Cabecera y pie reutilizables mediante JavaScript.
- Buscador local de los artículos publicados.
- Seis calculadoras con cálculos en el navegador.
- Datos SEO básicos, Open Graph y datos estructurados en páginas de contenido.

## Estructura principal

```
/
├── index.html
├── buscar.html
├── sobre-nosotros.html
├── contacto.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── blog/
│   ├── index.html
│   ├── plantilla-articulo.html
│   ├── como-ahorrar-100-euros.html
│   ├── regla-50-30-20.html
│   └── fondo-emergencia.html
├── categorias/
│   ├── index.html
│   ├── ahorro/
│   ├── presupuesto/
│   ├── deudas/
│   ├── inversion/
│   ├── ingresos-extra/
│   ├── impuestos/
│   └── banca/
├── herramientas/
│   ├── index.html
│   ├── calculadora-ahorro.html
│   ├── interes-compuesto.html
│   ├── regla-50-30-20.html
│   ├── cuota-prestamo.html
│   ├── fondo-emergencia.html
│   └── presupuesto-mensual.html
├── legal/
└── assets/
    ├── css/
    ├── js/
    └── img/
```

## Publicación en GitHub Pages

En el repositorio, abre **Settings → Pages**. En Build and deployment selecciona **Deploy from a branch**, elige la rama `main` y la carpeta `/(root)`. Guarda los cambios y espera a que GitHub termine el despliegue.

## Añadir un artículo nuevo

1. Crea un HTML dentro de `blog/` usando `blog/plantilla-articulo.html` como base.
2. Sustituye el título, descripción, canonical, Open Graph, autoría, fechas y datos estructurados.
3. Añade el contenido original, ejemplos, fuentes y enlaces internos.
4. Incorpora el artículo a `blog/index.html`, a su categoría, a `assets/js/search.js` y a `sitemap.xml`.
5. Comprueba la versión móvil, los enlaces y los metadatos antes de publicarlo.

## Herramientas

Las calculadoras están en `herramientas/` y comparten `assets/js/calculators.js`. Sus resultados son estimaciones educativas y no sustituyen las condiciones contractuales ni el asesoramiento profesional.

## SEO y mantenimiento

- Revisa title, meta description y canonical de cada página indexable.
- Mantén `sitemap.xml` y `robots.txt` actualizados con la URL pública vigente.
- No incluyas páginas de prueba, páginas duplicadas ni documentos legales incompletos en el sitemap.
- Revisa datos, fuentes y fechas de los artículos financieros antes de cada actualización.
- Cuando el dominio propio esté conectado, cambia las URL de forma coordinada y verifica Search Console.

## Privacidad, formularios y publicidad

La versión actual es una web estática. No tiene cuentas de usuario, base de datos ni formulario de newsletter conectado. El canal de correcciones de GitHub es público: no se deben enviar datos personales ni financieros.

No se han activado anuncios ni cookies publicitarias. Antes de incorporar AdSense o analítica, hay que completar los textos legales con los datos reales del responsable, hacer un inventario de tecnologías, implantar una CMP adecuada y cumplir las condiciones del proveedor. El archivo `ads.txt` debe completarse únicamente con el identificador de editor que proporcione Google.

## Contenido y responsabilidad

El contenido es educativo y general, no asesoramiento financiero, fiscal, jurídico ni de inversión personalizado. Los ejemplos numéricos deben identificarse como hipotéticos y las afirmaciones regulatorias deben contrastarse con fuentes oficiales vigentes.

## Estado actual

- Siete páginas de categoría con contenido introductorio y recursos.
- Siete artículos publicados, con cuatro nuevas guías de presupuesto y ahorro.
- Seis calculadoras.
- Blog y ambos buscadores conectados a los siete artículos publicados.
- Páginas legales disponibles, pero pendientes de completar con la identidad y datos reales del responsable.
- Newsletter, dominio propio y publicidad todavía no conectados.
