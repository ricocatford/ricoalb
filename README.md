# Ricardo Albarenque — Sitio web personal

Sitio web y portfolio personal.

🔗 **En vivo: [ricoalb.com](https://ricoalb.com)**

💻 **Repo: [github.com/ricocatford/ricoalb](https://github.com/ricocatford/ricoalb)**

---

## Secciones principales

- **Inicio** — Presentación con un diseño tipo "bento".
- **Sobre mí** — Biografía, stack de tecnologías y una línea temporal de mi trayectoria.
- **Proyectos** — Selección de trabajos con enlaces a la demo en vivo y al repositorio.
- **Servicios** — Lo que ofrezco como desarrollador.
- **Blog** — Artículos escritos en un editor visual (ver más abajo).
- **Contacto** — Formulario funcional + enlaces a mis redes.

## Comportamientos destacados

- **Bilingüe (Español / Inglés).** Toda la web cambia de idioma con un botón, al instante,
  sin recargar la página. Los textos viven en archivos de traducción separados.
- **Modo claro / oscuro.** El visitante puede cambiar el tema, y la web recuerda su elección.
- **Diseño responsive.** Se adapta a móvil, tablet y ordenador.
- **Animaciones y micro-interacciones** para dar una sensación cuidada y fluida.
- **Terminal interactiva en Contacto.** La caja con aspecto de consola va "escribiendo"
  el nombre y el mensaje del visitante a medida que rellena el formulario.
- **Formulario de contacto real.** Al enviarlo, me llega el mensaje por correo electrónico
  (a través de Resend).

## El blog

Los artículos se escriben desde un **panel de administración visual** (en la ruta
`/keystatic`), se sube una imagen de portada y se publica. Cada artículo puede existir en español
y en inglés. Aún vacío porque tengo que escribir mi primera entrada, pero funciona 😎.

## Tecnologías

- **Next.js / React** — el "motor" que construye y muestra las páginas.
- **Zustand** — para gestionar estados globales que se sincronizan con local-storage (modo oscuro/claro y selección de idioma).
- **TypeScript** — el lenguaje, una versión de JavaScript más segura.
- **CSS Modules** — los estilos, organizados por componente (CSS de toda la vida, sin frameworks).
- **Vercel** — el hosting donde está publicada la web.
- **Keystatic** — el gestor de contenidos del blog.

## Cómo ejecutarlo en local (opcional)

Requiere tener **Node.js** instalado. Lo único que no funcionaría sería el contact por el tema de las variables de entorno.

```bash
npm install      # instala las dependencias
npm run dev      # arranca la web en http://localhost:3000
```

---

Hecho con cuidado por Ricardo Albarenque · [ricoalb.com](https://ricoalb.com)
