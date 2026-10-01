# Bitácora del Directorio Ecco Qualitá

Registro compartido de lo que hace cada agente (Codex y Claude). Lo más nuevo va arriba.
El formato de cada entrada está en `AGENTS.md`.

## Pendientes generales

- El Organizador debe revisar T-003: contadores reales y etiquetas de estado entregados por
  Codex.
- Avisar al equipo de la dirección oficial (https://directorio.eccoqualita.com) y borrar o
  desconectar el proyecto viejo en Netlify, que quedó congelado.
- Enlaces del PMO que faltan: Gestión Interna PMO y las tres tarjetas de "Accesos Directos".
- Enlace del SharePoint de los clientes Soluciones Globales y OMP.
- Enlace del Planner del cliente Soluciones Globales.
- Enlace del SharePoint del cliente Urban Empresa Constructora.
- Enlaces pendientes de Agroplast: Planner de cada uno de sus tres servicios. AgilTech
  Solutions y Atómica Publicidad (cerrados) siguen sin SharePoint; Atómica tampoco tiene
  logo.
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

## 2026-10-01 — Claude
- **Pedido:** revisar la T-003 de Codex; destrabar al Ejecutador, cuya carga de Agroplast
  fallaba en una prueba de la T-003.
- **Cambios:** T-003 aprobada. En `tests/directorio.test.mjs`, `fijarUrls()` ya no depende
  de cuántos accesos tenga cada cliente en `enlaces.js`. `AGENTS.md` exige hacer commit
  nombrando los archivos (`git commit -m "…" -- archivos`), porque la zona de preparación
  de Git es compartida.
- **Pendiente:** Nada.

## 2026-10-01 — Claude (Contenido)
- **Pedido:** que Agroplast tenga un solo Planner para sus tres servicios (pedido directo).
- **Cambios:** Agroplast ahora tiene una sección "Planner de Agroplast" con el enlace único y,
  debajo, el SharePoint de cada servicio; se quitaron los tres Planner por servicio, incluido
  el de Planificación Estratégica cargado antes (`enlaces.js`).
- **Pendiente:** la prueba de Codex que fijaba 6 accesos para Agroplast (en el repositorio)
  falla hasta que él suba su corrección; su copia local ya pasa 19 de 19. Quedan 10 datos por
  recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el Planner de Soluciones Globales (pedido directo).
- **Cambios:** la tarjeta "Planner del proyecto" de Soluciones Globales ya tiene su enlace
  (`enlaces.js`); había quedado pendiente al mover el enlace anterior a Fintax. Soluciones
  Globales queda completo. Pruebas: 19 de 19 pasan.
- **Pendiente:** quedan 10 datos por recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el SharePoint de Soluciones Globales (pedido directo).
- **Cambios:** la tarjeta "SharePoint del proyecto" de Soluciones Globales ya tiene su enlace
  (`enlaces.js`). Pruebas: 19 de 19 pasan.
- **Pendiente:** quedan 11 datos por recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el Planner del área de Calidad de Ecco Qualitá (pedido directo).
- **Cambios:** la tarjeta "Planner Calidad" ya tiene su enlace (`enlaces.js`). Con esto queda
  resuelta la pregunta de si ese Planner existe. Pruebas: 19 de 19 pasan.
- **Pendiente:** quedan 12 datos por recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el Planner de Planificación Estratégica de Agroplast (pedido directo).
- **Cambios:** la tarjeta "Planner de Planificación Estratégica" ya tiene su enlace
  (`enlaces.js`). Pruebas: 19 de 19 pasan.
- **Pendiente:** quedan 13 datos por recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el Planner de Fintax; el enlace que dio Vincent ya estaba en Soluciones
  Globales y él indicó que corresponde a Fintax y que se quite del otro cliente.
- **Cambios:** el Planner de Fintax Consulting ya tiene su enlace y el Planner de Soluciones
  Globales quedó pendiente (`enlaces.js`). Pruebas: 19 de 19 pasan.
- **Pendiente:** enlace del Planner de Soluciones Globales (quedan 14 datos por recibir, ver T-004).

## 2026-10-01 — Codex
- **Pedido:** ejecutar T-003: mostrar contadores reales y etiquetas de estado en las
  tarjetas de áreas y clientes.
- **Cambios:** `index.html` ahora separa accesos disponibles y pendientes, muestra
  "Activo" o "Cerrado" en las tarjetas de clientes y refleja el estado en la portada de
  cada cliente. `tests/directorio.test.mjs` añadió cinco pruebas de comportamiento, con
  casos fijos y comparación dinámica de todas las tarjetas. Pasan 19 pruebas. Se comprobó
  en escritorio y móvil a 375 px, sin desbordes ni errores. Los contrastes son 10,09:1
  para "Activo" y 5,42:1 para "Cerrado".
- **Pendiente:** revisión del Organizador para marcar T-003 como completada.

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar los SharePoint de Agroplast para Programa EHS y Gerencia de Calidad
  (pedido directo, dos enlaces).
- **Cambios:** ambas tarjetas ya tienen su enlace (`enlaces.js`). Agroplast queda con 3 de sus
  6 accesos disponibles.
- **Pendiente:** quedan 15 datos por recibir (ver T-004). Aviso: la prueba nueva de Codex en
  `tests/` (T-003, sin subir) fija "6 pendientes" para Agroplast y fallará al cargar enlaces
  reales; debe contar desde los datos, no un número fijo.

## 2026-10-01 — Claude (Contenido)
- **Pedido:** cargar el SharePoint de Planificación Estratégica de Agroplast (pedido directo).
- **Cambios:** la tarjeta "SharePoint de Planificación Estratégica" de Agroplast ya tiene su
  enlace (`enlaces.js`). Pruebas: 14 de 14 pasan.
- **Pendiente:** quedan 17 datos por recibir (ver T-004).

## 2026-10-01 — Claude (Contenido)
- **Pedido:** tarea T-004 (parte 1): renombrar "Sitio web" → "Sitio Web" en Herramientas generales.
- **Cambios:** solo ese nombre en `enlaces.js`. Pruebas: 14 de 14 pasan. La parte 2 (lista de
  datos que faltan) se presentó a Vincent en el chat.
- **Pendiente:** cargar los datos que Vincent entregue (18 enlaces, logo de Atómica Publicidad).

## 2026-09-30 — Codex
- **Pedido:** ejecutar T-001, aprobada por Vincent: ampliar las pruebas automáticas de los
  datos del directorio.
- **Cambios:** `tests/directorio.test.mjs` ahora comprueba identificadores únicos, campos
  obligatorios, URLs sin duplicados, procesos y estados válidos, separación de proyectos
  cerrados, existencia de logos y rutas internas, y uso de HTTPS. Cada regla incluye una
  mutación controlada para demostrar que detecta el error. Pasan las 14 pruebas; la página
  se revisó en escritorio y móvil sin errores del navegador. No se cambiaron `index.html`
  ni `enlaces.js`.
- **Pendiente:** revisión de la directora para marcar T-001 como completada.

## 2026-09-30 — Claude (Contenido)
- **Pedido:** tarea T-002, uniformar nombres y descripciones de los accesos (asignada por la
  directora).
- **Cambios:** solo textos de `nombre` y `descripcion` en `enlaces.js` (8 líneas; la lista
  antes → después está en las notas de entrega de T-002 en `TAREAS.md`). "SharePoint SGC"
  pasó a "SharePoint Calidad" y su descripción conserva "Sistema de Gestión de Calidad
  (SGC)", por lo que el buscador sigue encontrándolo por "SGC". Pruebas: pasan.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** que esta sesión dirija a las demás (Codex y otras sesiones de Claude).
- **Cambios:** nuevo `TAREAS.md` con roles y archivos propios de cada agente (Directora:
  documentos de coordinación; Ingeniería/Codex: `index.html` y `tests/`; Contenido/Claude:
  `enlaces.js` y `logos/`), el flujo de asignación y revisión, la hoja de ruta y la
  primera tarea propuesta (T-001). `AGENTS.md` lo exige; `_config.yml` lo excluye del sitio.
- **Pendiente:** que Vincent apruebe T-001.

## 2026-09-30 — Claude
- **Pedido:** un documento donde cada agente anote en qué está trabajando, para que los
  demás lo consulten y no choquen al editar los mismos archivos.
- **Cambios:** nuevo `EN-CURSO.md` con una tabla de reservas (agente, sesión, hora,
  archivos, tarea) y sus reglas. `AGENTS.md` ahora exige consultarlo y reservar antes de
  editar, subir solo los archivos propios (nunca `git add .`) y no reescribir archivos
  completos. `_config.yml` lo excluye del sitio publicado.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** quitar el aviso de pausa sobre `enlaces.js` e `index.html`.
- **Cambios:** se eliminó el aviso del inicio de `BITACORA.md`; los agentes pueden volver a
  editar esos archivos siguiendo el flujo normal de `AGENTS.md`.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de Ecco Qualitá en la tarjeta "Sitio web" de Herramientas
  generales (pedido directo de Vincent en el chat).
- **Cambios:** nuevo logo `eccoqualita` en `LOGOS` (`index.html`), enlazado desde
  eccoqualita.com: es el icono cuadrado "EQ" del sitio. La tarjeta "Sitio web" lo usa
  (`enlaces.js`) y se documentó en la regla de iconos (`AGENTS.md`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de Agitech; Vincent pasó su web, https://agiltech.com.do/
  (pedido directo en el chat).
- **Cambios:** el nombre correcto, según su web, es "AgilTech Solutions": se corrigió el
  nombre y el `id` (`agitech` → `agiltech`, así que su página ahora es `#/agiltech`). Su
  tarjeta usa el icono cuadrado "AT" del sitio (`enlaces.js`, `logos/agiltech.png`). La
  pausa sigue vigente.
- **Pendiente:** enlace del SharePoint de AgilTech.

## 2026-09-30 — Claude
- **Pedido:** separar Agroplast en sus tres servicios contratados: Planificación
  Estratégica, Gerencia de Calidad y Programa de Salud Ocupacional EHS (pedido directo de
  Vincent en el chat).
- **Cambios:** la página de Agroplast tiene una sección por servicio, cada una con su
  SharePoint y su Planner pendientes; los nombres incluyen el servicio para distinguirlos
  en el buscador (`enlaces.js`). La pausa sigue vigente.
- **Pendiente:** los seis enlaces.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de Agroplast (pedido directo de Vincent en el chat).
- **Cambios:** su logo es solo texto, así que la tarjeta muestra las letras "Ag" del
  logotipo (`enlaces.js`, `logos/agroplast.png`). La pausa sigue vigente.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** crear los clientes cerrados Agitech y Atómica Publicidad, y el cliente activo
  Agroplast (Vincent lo pidió directamente en el chat, lo que cuenta como confirmación para
  tocar `enlaces.js` pese a la pausa).
- **Cambios:** tres clientes nuevos en `enlaces.js`: `agroplast` (activo, SharePoint y
  Planner pendientes), `agitech` y `atomica-publicidad` (cerrados, SharePoint pendiente).
  La pausa sigue vigente.
- **Pendiente:** sus enlaces y logos.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de Soluciones Globales (Vincent confirmó en el chat tocar
  `enlaces.js` pese a la pausa, solo para este cambio).
- **Cambios:** la tarjeta de Soluciones Globales muestra su emblema de burbujas, sin el
  texto (`enlaces.js`, `logos/soluciones-globales.png`). La pausa sigue vigente.
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** poner el logo de Fintax Consulting.
- **Cambios:** la tarjeta de Fintax muestra su emblema, recortado sin el texto
  (`enlaces.js`, `logos/fintax.png`).
- **Pendiente:** Nada.

## 2026-09-30 — Claude
- **Pedido:** OMP es un proyecto cerrado.
- **Cambios:** OMP pasó de "Proyectos Activos" a "Proyectos Cerrados" (`enlaces.js`); se
  ajustaron las pruebas que lo daban por activo (`tests/directorio.test.mjs`).
- **Pendiente:** enlace del SharePoint de OMP (ya estaba en pendientes generales).

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
