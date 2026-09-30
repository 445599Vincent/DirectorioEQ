# Bitácora del Directorio Ecco Qualitá

Registro compartido de lo que hace cada agente (Codex y Claude). Lo más nuevo va arriba.
El formato de cada entrada está en `AGENTS.md`.

## Pendientes generales

- Avisar al equipo de la nueva dirección (https://445599vincent.github.io/DirectorioEQ/)
  y borrar o desconectar el proyecto viejo en Netlify, que quedó congelado.
- Enlaces de las secciones del PMO: Gobernanza PMO, Metodología MEQ, Portafolio,
  Lecciones Aprendidas y Gestión Interna PMO.
- Enlace del SharePoint de los clientes Soluciones Globales y OMP.
- Planner de Recursos Humanos y de Calidad: confirmar si existen y sus enlaces.
- Siete áreas del mapa de procesos están sin accesos: Planificación, Comunicaciones,
  Servicios Generales, Mantenimiento de Infraestructura, TIC, Legal y Seguridad. Faltan
  sus enlaces (SharePoint, Planner u otros). Por decisión del usuario, las áreas vacías se
  quedan visibles en el inicio.
- Gestión Administrativa y Financiera solo tiene AdmCloud; faltan su SharePoint y Planner.
- Definir si las demás áreas tendrán secciones internas como el PMO.

---

## 2026-09-30 — Claude
- **Pedido:** agregar el enlace de la carpeta "Gobernanza PMO" del SharePoint del PMO.
- **Cambios:** la tarjeta "Gobernanza PMO" ya no está pendiente (`enlaces.js`).
- **Pendiente:** enlaces de Metodología MEQ, Portafolio, Lecciones Aprendidas, Gestión
  Interna PMO, y de las tres tarjetas de "Accesos Directos".

## 2026-09-30 — Claude
- **Pedido:** agregar el Listado Maestro de Documentos Internos (MAT-SGC-01) dentro de
  Gestión de la Calidad.
- **Cambios:** tarjeta "Listado Maestro de Documentos" en Gestión de la Calidad, con el
  logo de SharePoint (`enlaces.js`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** agregar los tres "Accesos Directos" que tiene el SharePoint del PMO
  (Reportes de Consultores, Plantillas PMO, Material educativo). También se confirmó el
  dominio propio: Vincent creó el archivo `CNAME` con `directorio.eccoqualita.com` desde
  GitHub y Alfredo (quien administra las zonas DNS de eccoqualita.com) ya agregó el
  registro; el sitio carga en esa dirección con HTTPS.
- **Cambios:** nuevo grupo "Accesos Directos" en Gestión de Proyectos (PMO), con esas tres
  tarjetas pendientes y logo de SharePoint (`enlaces.js`).
- **Pendiente:** enlaces de esas tres tarjetas. Avisar al equipo que el directorio ya
  también se puede abrir en https://directorio.eccoqualita.com (además de la dirección de
  github.io, que sigue funcionando igual).

## 2026-09-30 — Codex
- **Pedido:** registrar el SharePoint de Banco Central como proyecto cerrado y separar los
  proyectos finalizados de los proyectos activos.
- **Cambios:** se creó la página interna "Proyectos Cerrados", Banco Central se registró
  allí con su SharePoint y los clientes activos siguen separados en el PMO. También se
  actualizaron la navegación, el buscador, la guía del proyecto y las pruebas
  (`enlaces.js`, `index.html`, `AGENTS.md`, `_config.yml`, `tests/directorio.test.mjs`).
- **Pendiente:** Nada.

## 2026-09-30 — Codex
- **Pedido:** registrar el sitio de SharePoint del área Académica.
- **Cambios:** se agregó la tarjeta "SharePoint Académica" en Gestión Académica
  (`enlaces.js`) y se actualizó la lista de áreas sin accesos (`BITACORA.md`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de SharePoint a las seis secciones del PMO; el usuario querría
  usar más adelante las ilustraciones que tienen esas secciones en el SharePoint del PMO.
- **Cambios:** las seis tarjetas de "Contenido del PMO" usan el icono `sharepoint`
  (`enlaces.js`). Siguen sin enlace.
- **Pendiente:** recibir del usuario los archivos de las ilustraciones del SharePoint para
  usarlas en esas tarjetas. El SharePoint del PMO tiene además tres "Accesos Directos"
  (Reportes de Consultores, Plantillas PMO, Material educativo) que no están en el hub.

## 2026-09-30 — Codex
- **Pedido:** revisar los cambios recientes después de migrar la publicación de Netlify a
  GitHub Pages.
- **Cambios:** se comprobó la configuración de GitHub Pages, la carga del sitio y sus
  accesos, la navegación a Gestión Comercial, los logos y la ausencia de errores del
  navegador. También se verificó que `AGENTS.md`, `BITACORA.md` y `_config.yml` no están
  publicados. No fue necesario corregir el sitio (`BITACORA.md`).
- **Pendiente:** avisar al equipo de la nueva dirección y desconectar o borrar el proyecto
  anterior de Netlify.

## 2026-09-30 — Claude
- **Pedido:** agregar el acceso a HubSpot, que Comercial usa para la gestión de clientes.
- **Cambios:** tarjeta "HubSpot" en el área Gestión Comercial (`enlaces.js`), con el logo
  oficial de HubSpot (`LOGOS` e `iconoDeEnlace` en `index.html`). El enlace es la entrada
  general de HubSpot (`app.hubspot.com`); el usuario no dio uno específico.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** que todo acceso a Planner tenga el logo de Planner y todo acceso a
  SharePoint el de SharePoint.
- **Cambios:** el logo ahora se decide también por la URL del enlace (`iconoDeEnlace` en
  `index.html`). Los enlaces existentes ya lo tenían; la regla lo garantiza para los nuevos.
- **Pendiente:** confirmar con el usuario si las seis secciones del PMO (sin enlace) son
  de SharePoint, para ponerles el logo desde ya.

## 2026-09-30 — Claude
- **Pedido:** mudar el sitio de Netlify a GitHub Pages (Netlify dejó de publicar,
  probablemente por falta de créditos).
- **Cambios:** se agregó `_config.yml` para que Pages no publique los archivos de trabajo;
  `AGENTS.md` apunta a la nueva dirección.
- **Pendiente:** Nada. El usuario activó Pages y el sitio nuevo quedó comprobado.

## 2026-09-30 — Claude
- **Pedido:** que las herramientas tengan el logo oficial de Microsoft.
- **Cambios:** las tarjetas de SharePoint, Planner, Outlook, Teams y OneDrive muestran el
  logo oficial (`LOGOS` en `index.html`), con el icono de trazo como respaldo si no carga.
  AdmCloud, el sitio web y las tarjetas de áreas conservan sus iconos.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** mover AdmCloud dentro de Gestión Administrativa y Financiera.
- **Cambios:** AdmCloud salió de `GENERALES` y ahora está en el área
  `administrativa-financiera` (`enlaces.js`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** organizar el hub según el mapa de procesos (MAP-SGI-01), con Gestión de
  Proyectos y PMO fusionados en una sola área.
- **Cambios:** el inicio agrupa las áreas en Procesos Estratégicos, Operativos y Soporte
  (`PROCESOS` en `enlaces.js`). Se crearon nueve áreas nuevas sin accesos y se renombraron
  las cuatro existentes con los nombres del mapa. Iconos nuevos y aviso de "área sin
  accesos" en `index.html`.
- **Pendiente:** enlaces de las nueve áreas nuevas.

## 2026-09-30 — Claude
- **Pedido:** preparar el proyecto para trabajar junto con Codex y dejar registro de tareas.
- **Cambios:** se crearon `AGENTS.md` (guía común), `CLAUDE.md` (apunta a `AGENTS.md`),
  `BITACORA.md` (este archivo) y `netlify.toml` (oculta estos archivos del sitio público).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** evitar redundancia: los proyectos de clientes deben estar dentro del PMO.
- **Cambios:** los clientes ya no aparecen en el inicio; se muestran en la página del PMO en
  la sección "Proyectos Activos". Se quitó la tarjeta pendiente "Proyectos Activos". Desde
  un cliente se vuelve al PMO (`index.html`, `enlaces.js`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** dividir el hub por áreas según el mapa de procesos, separando lo interno de
  lo de clientes, con secciones dentro de cada área (ejemplo: PMO).
- **Cambios:** nueva estructura de `AREAS`, `CLIENTES` y `GENERALES` en `enlaces.js`;
  páginas por área y por cliente y búsqueda global en `index.html`. Se agregaron las
  secciones del PMO como enlaces pendientes.
- **Pendiente:** ver "Pendientes generales".

## 2026-09-30 — Claude
- **Pedido:** publicar el directorio para compartirlo con el equipo.
- **Cambios:** repositorio en GitHub (`445599Vincent/DirectorioEQ`) conectado a Netlify
  (`directorioeq.netlify.app`), con publicación automática al hacer `git push`.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** crear un hub con accesos a AdmCloud, SharePoint y Planner con el diseño de
  eccoqualita.com.
- **Cambios:** se crearon `index.html` y `enlaces.js`; se cargaron los enlaces de AdmCloud,
  los SharePoint de PMO, Comercial, Recursos Humanos y Calidad, y los Planner de Comercial,
  PMO, Soluciones Globales y OMP; iconos propios por área.
- **Pendiente:** Nada.
