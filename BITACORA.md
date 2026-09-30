# Bitácora del Directorio Ecco Qualitá

Registro compartido de lo que hace cada agente (Codex y Claude). Lo más nuevo va arriba.
El formato de cada entrada está en `AGENTS.md`.

## Pendientes generales

- Avisar al equipo de la dirección oficial (https://directorio.eccoqualita.com) y borrar o
  desconectar el proyecto viejo en Netlify, que quedó congelado.
- Enlaces del PMO que faltan: Gestión Interna PMO y las tres tarjetas de "Accesos Directos".
- Enlace del SharePoint de los clientes Soluciones Globales y OMP.
- Enlace del Planner del cliente Fintax Consulting.
- Enlace del SharePoint del cliente Urban Empresa Constructora.
- Planner de Recursos Humanos y de Calidad: confirmar si existen y sus enlaces.
- Siete áreas del mapa de procesos están sin accesos: Planificación, Comunicaciones,
  Servicios Generales, Mantenimiento de Infraestructura, TIC, Legal y Seguridad. Faltan
  sus enlaces (SharePoint, Planner u otros). Por decisión del usuario, las áreas vacías se
  quedan visibles en el inicio.
- Gestión Administrativa y Financiera solo tiene AdmCloud; faltan su SharePoint y Planner.
- Definir si las demás áreas tendrán secciones internas como el PMO.
- **Inicio de sesión por rol:** el código ya está listo pero apagado (`AUTH.activo = false`
  en `index.html`). Falta que un administrador del Microsoft 365 de Ecco Qualitá siga
  `CONFIGURAR-INICIO-DE-SESION.md` y envíe el `clientId` y el `tenantId`; con esos dos
  datos se enciende. El usuario dijo que quien administra eso es otra persona del equipo o
  el proveedor de TI, no Vincent directamente — falta coordinar con esa persona.

---

## 2026-09-30 — Claude
- **Pedido:** usar https://directorio.eccoqualita.com como dirección oficial del sitio.
- **Cambios:** se actualizaron el pendiente de avisar al equipo (`BITACORA.md`) y la guía
  de inicio de sesión, que ya no pide registrar la dirección antigua porque redirige sola
  (`CONFIGURAR-INICIO-DE-SESION.md`). `AGENTS.md` ya usaba la dirección nueva.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** logo de OMP Industrial y nuevo cliente Urban Empresa Constructora en
  Proyectos Cerrados.
- **Cambios:** OMP muestra su logo; nuevo cliente cerrado "Urban Empresa Constructora"
  (`urban`) con su logo y el SharePoint pendiente (`enlaces.js`, `logos/omp.png`,
  `logos/urban.png`).
- **Pendiente:** enlace del SharePoint de Urban.

## 2026-09-30 — Claude
- **Pedido:** crear inicio de sesión con Microsoft 365 para que cada persona solo vea las
  áreas que le corresponden, con roles administrados desde un "usuario administrador".
- **Cambios:** se agregó a `index.html` una pantalla de inicio de sesión con Microsoft
  (librería MSAL, sin backend propio) y filtrado de áreas por rol (`AUTH`, `puedeVer`,
  `rolDe`); el rol de cada área es su propio `id`. Se agregó `CONFIGURAR-INICIO-DE-SESION.md`
  con los pasos exactos para que el administrador de TI registre la app en Microsoft Entra
  ID, cree un "App role" por área y asigne a cada persona su rol — ahí también se explica
  qué es "el administrador" en este diseño: el propio panel de Microsoft Entra ID
  (Enterprise applications → Users and groups), no una pantalla nueva dentro del hub, para
  no tener que construir ni asegurar una base de datos propia de usuarios.
  **Queda apagado a propósito** (`AUTH.activo = false`): encenderlo sin los datos reales
  dejaría a todo el equipo sin poder entrar. No cambiar ese valor sin que el usuario lo
  pida.
- **Importante para cualquier agente:** esto NO oculta los datos del archivo `enlaces.js`
  en sí (es un sitio estático, sin servidor, así que ese archivo siempre es descargable
  completo); solo controla qué se *muestra* en pantalla y exige una cuenta real de
  Microsoft 365 asignada para entrar. Se lo expliqué así al usuario antes de construirlo.
- **Pendiente:** ver "Pendientes generales" (falta la configuración del lado de Microsoft).

## 2026-09-30 — Claude
- **Pedido:** poner el logo del Banco Central en su tarjeta.
- **Cambios:** nuevo campo opcional `logo` para los clientes: su tarjeta muestra esa imagen
  en lugar del icono (`index.html`, explicado en `enlaces.js`). El emblema del Banco
  Central se guardó recortado en `logos/banco-central.png`.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** agregar el SharePoint de Fintax, un cliente nuevo.
- **Cambios:** nuevo cliente "Fintax Consulting" (`fintax`) como proyecto activo, con su
  SharePoint y el Planner pendiente (`enlaces.js`). Se actualizaron los pendientes del PMO.
- **Pendiente:** enlace del Planner de Fintax; confirmar que el proyecto está activo.

## 2026-09-30 — Claude
- **Pedido:** agregar el enlace de "Lecciones Aprendidas" del SharePoint del PMO.
- **Cambios:** la tarjeta "Lecciones Aprendidas" ya no está pendiente (`enlaces.js`).
- **Pendiente:** enlace de Gestión Interna PMO, y de las tres tarjetas de
  "Accesos Directos".

## 2026-09-30 — Claude
- **Pedido:** agregar el enlace de "Portafolio" del SharePoint del PMO.
- **Cambios:** la tarjeta "Portafolio" ya no está pendiente (`enlaces.js`).
- **Pendiente:** enlaces de Lecciones Aprendidas, Gestión Interna PMO, y de las tres
  tarjetas de "Accesos Directos".

## 2026-09-30 — Claude
- **Pedido:** agregar el enlace de "Metodología MEQ" del SharePoint del PMO.
- **Cambios:** la tarjeta "Metodología MEQ" ya no está pendiente (`enlaces.js`).
- **Pendiente:** enlaces de Portafolio, Lecciones Aprendidas, Gestión Interna PMO, y de las
  tres tarjetas de "Accesos Directos".

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
