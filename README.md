# INUE Universidad — Sitio Web (Recreación Frontend)

Recreación estática del sitio web de INUE Universidad, construida como ejercicio de front-end. El proyecto **no tiene backend**: no existe ninguna API propia, base de datos ni envío real de datos a servidores externos. Todo el comportamiento, ocurre en el navegador del usuario, con datos ubicados dentro del propio repositorio.

El formulario de contacto, por ejemplo, valida y "envía" el mensaje de forma simulada (ver [`scripts/contact-form.ts`](#srcscriptscontact-formts)); no existe un endpoint real detrás. Todos los enlaces de navegación, redes sociales apuntan a `#` de forma intencional, ya que el alcance de este ejercicio es únicamente la página de inicio (`/`).

## Tecnologías y herramientas

| Tecnología | Uso en el proyecto |
|---|---|
| **[Astro](https://astro.build)** | Framework principal. El sitio original es prácticamente estático (landing informativa, sin dashboards ni estado de usuario), así que no tenía sentido cargar un framework SPA completo (React/Vue) solo para maquetar. Astro permite componentizar la página sin enviar JavaScript al cliente salvo donde realmente se necesita (menús, formulario, scroll).|
| **TypeScript** | Se utilizó para los scripts de interacción (src/scripts/) y las estructuras de datos (src/data/), con el fin de tener tipado en los datos de navegación, FAQs, partners, etc., y evitar errores menores al mapear esos datos en los componentes .astro. |
| **[Tailwind CSS v4](https://tailwindcss.com)** | Utilidades de estilo directamente en el markup, con @theme en global.css para centralizar tokens del diseño (color amarillo de marca, tipografías, alto del header). Se prefirió sobre CSS "a mano" por velocidad de iteración y consistencia entre componentes. |
| **Google Fonts** | (Bebas Neue para títulos, Manrope para texto) cargadas con preconnect + media="print" onload="this.media='all'" para no bloquear el render inicial. |

## Arquitectura y decisión de carpetas

**Cada carpeta agrupa archivos por su razón de cambio**.

```
src/
├── assets/images/     → imágenes fuente, antes de optimizar
├── components/
│   ├── blog/           → piezas reutilizables del blog
│   ├── form/            → campos de formulario genéricos
│   ├── home/           → secciones específicas de la home
│   └── layout/          → estructura presente en todo el sitio
├── data/                → contenido y configuración (texto, listas, links)
├── layouts/              → el esqueleto HTML compartido
├── pages/                → rutas (Astro genera una ruta por archivo)
├── scripts/              → comportamiento en el cliente (JS/TS)
└── styles/               → CSS global y configuración de Tailwind
```

**`components/` se subdivide en cuatro carpetas según el alcance de reutilización:**

- **`form/`** — `Field`, `SelectField` y `FieldError` son piezas genéricas que arma el formulario de contacto, en vez de un formulario con inputs repetidos y estilos duplicados. `fieldStyles.ts` centraliza las clases de Tailwind compartidas entre inputs para que se vean consistentes sin copiar/pegar strings de clases.
- **`blog/`** — `BlogCard.astro` dibuja **una** tarjeta de post y no sabe cuántas hay ni dónde se muestran. Al vivir fuera de `home/`, se puede reutilizar el día que exista una página `/blog` sin tocarla.
- **`home/`** — Secciones que solo tienen sentido en la página de inicio (`Hero`, `Reasons`, `RVOE`, `Partners`, `FAQs`, `BlogSection`, `ContactForm`, `Institutional`). `index.astro` las importa y las ordena; ellas no saben nada del resto de la página.
- **`layout/`** — Piezas de estructura presentes en todas las páginas del sitio (`Header`, `Footer`, `MobileMenu`, `ProgramsPanel`, `Banner`), independientes del contenido de cada página.

**`data/` está separado de `components/` a propósito.** Cada archivo (`navigation.ts`, `contact.ts`, `faqs.ts`, `reasons.ts`, `blog.ts`, `partners.ts`, `links.ts`) contiene texto, listas de opciones o rutas de imágenes, sin una sola línea de HTML. Como fuente de verdad del contenido: textos de FAQs, links de navegación, partners, razones y datos del formulario de contacto viven en archivos `.ts` tipados (no hardcodeados en el `.astro`). La idea es que actualizar un texto, agregar un partner o cambiar una opción del formulario sea editar un array, no buscar el markup correspondiente. También deja los componentes enfocados solo en cómo se ve algo, no en qué dice.

**`scripts/`.** en vanilla TypeScript, sin framework de JS en el cliente: como Astro no envía JS por defecto, cada script se importa explícitamente donde se necesita (`Layout.astro` importa `scroll.ts`, el formulario importa `contact-form.ts` y `form-validation.ts`, etc.). Esto mantiene el bundle de cliente mínimo: solo se paga el costo de JS en las partes interactivas reales.

## Optimización y rendimiento

- **Astro renderiza todo a HTML estático.** No hay ninguna "isla" de frameworks externos (React, Vue, etc.) en el proyecto: todo el comportamiento interactivo (menús, formulario, scroll) se resuelve con `<script>` de TypeScript plano, que Astro empaqueta y sirve como módulos con hash de caché. No hay runtime de framework que descargar.
- **Imágenes optimizadas con `<Image />` de `astro:assets`.** Todas las imágenes en `data/blog.ts` y `data/partners.ts` se importan como archivos (no como rutas de texto), lo que permite a Astro:
  - Generar salidas en `.webp`.
  - Calcular `width`/`height` automáticamente y evitar saltos de layout (CLS).
  - Servir el tamaño adecuado según el contenedor (`widths`/`sizes` en las tarjetas del blog).
  - Aplicar `loading="lazy"` por defecto en todo lo que no está en el primer scroll (logos de partners, tarjetas de blog), reservando `loading="eager"` solo para imágenes críticas del primer pantallazo.
- **Fuentes no bloqueantes.** En `Layout.astro`, el `<link>` de Google Fonts se carga con `media="print" onload="this.media='all'"`: el navegador no espera la fuente para pintar la página, y el texto usa la tipografía de sistema hasta que la fuente llega (evita bloquear el *First Contentful Paint*).
- **`preconnect` a los dominios de fuentes** (`fonts.googleapis.com`, `fonts.gstatic.com`), para adelantar la conexión DNS/TLS antes de que se solicite el CSS de la fuente.
- **Componentes reutilizables en vez de HTML repetido.** `Field.astro`, `SelectField.astro` y `BlogCard.astro` evitan que Tailwind tenga que generar clases duplicadas dispersas en varios lugares, y mantienen el HTML final compacto y consistente.
- **Un solo cálculo por fotograma en scroll.** `footer-reveal.ts` usa `requestAnimationFrame` para agrupar los eventos de `scroll` (que se disparan decenas de veces por segundo) en un único cálculo por fotograma, evitando saturar el hilo principal.
- **Respeta las preferencias de accesibilidad del sistema.** Tanto el scroll suavizado (Lenis) como las animaciones de desplazamiento del footer se desactivan si el usuario activó "reducir movimiento" (`prefers-reduced-motion: reduce`) en su sistema operativo.

## Cómo ejecutar el proyecto localmente

**Requisitos:** Node.js 18 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo (con recarga en caliente)
npm run dev
```

El sitio queda disponible en `http://localhost:4321`.

```bash
# 3. Generar la build de producción (salida estática en dist/)
npm run build

# 4. Previsualizar la build de producción localmente
npm run preview
```

## Despliegue

El sitio está desplegado en [Railway](https://railway.app/) como sitio estático, generado a partir de `npm run build`. No requiere variables de entorno ni servicios adicionales, ya que no hay backend ni conexiones externas.

🔗 **Sitio desplegado:** [prueba-astro-inue-production.up.railway.app](https://prueba-astro-inue-production.up.railway.app)

