# Bitácora del Directorio Ecco Qualitá

Registro compartido de lo que hace cada agente (Codex y Claude). Lo más nuevo va arriba.
El formato de cada entrada está en `AGENTS.md`.

## Pendientes generales

- Avisar al equipo de la nueva dirección (https://445599vincent.github.io/DirectorioEQ/)
  y borrar o desconectar el proyecto viejo en Netlify, que quedó congelado.
- Enlaces de las secciones del PMO: Gobernanza PMO, Metodología MEQ, Portafolio,
  Proyectos Cerrados, Lecciones Aprendidas, Gestión Interna PMO.
- Enlace del SharePoint de los clientes Soluciones Globales y OMP.
- Planner de Recursos Humanos y de Calidad: confirmar si existen y sus enlaces.
- Ocho áreas del mapa de procesos están sin accesos: Planificación, Comunicaciones,
  Académica, Servicios Generales, Mantenimiento de Infraestructura, TIC, Legal y
  Seguridad. Faltan sus enlaces (SharePoint, Planner u otros). Por decisión del usuario,
  las áreas vacías se quedan visibles en el inicio.
- Gestión Administrativa y Financiera solo tiene AdmCloud; faltan su SharePoint y Planner.
- Definir si las demás áreas tendrán secciones internas como el PMO.

---

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
