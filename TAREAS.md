# Tareas del Directorio Ecco Qualitá

La sesión **directora** (Claude, sesión **"Organizador"**) planifica el
trabajo, lo asigna aquí y revisa el resultado. Los demás agentes ejecutan **solo las tareas
asignadas a ellos**. Vincent (el usuario) aprueba cada tarea antes de que se asigne.

## Roles y archivos de cada uno

| Rol | Agente | Archivos propios |
|---|---|---|
| Directora | Claude — sesión "Organizador" | `TAREAS.md`, `AGENTS.md`, `CONFIGURAR-INICIO-DE-SESION.md`, `_config.yml`; revisión final de todo |
| Ingeniería | Codex | `index.html`, `tests/`, `supabase/` |
| Contenido | Claude — sesión "Ejecutador" | `enlaces.js`, `logos/` |

`BITACORA.md` y `EN-CURSO.md` los editan todos, siempre con cambios puntuales.

Un agente solo toca archivos de otro rol si su tarea lo dice expresamente. Así dos agentes
nunca editan el mismo archivo a la vez.

## Cómo funciona

1. **La directora asigna:** crea la tarea abajo con número, agente, archivos, qué hacer y
   criterios de aceptación, en estado **Asignada**.
2. **El agente empieza:** `git pull`, lee su tarea, reserva los archivos en `EN-CURSO.md` y
   cambia el estado a **En curso**.
3. **El agente entrega:** corre las pruebas, prueba la página, registra en `BITACORA.md`,
   libera su reserva, cambia el estado a **Para revisión** y escribe sus "Notas de entrega"
   (qué hizo y qué debe revisar la directora). Commit en español, `git pull --rebase`,
   `git push`. Las sesiones de Claude avisan además a la directora con `SendMessage`
   (destinatario: `Organizador`); Codex avisa al usuario en su chat.
4. **La directora revisa:** pruebas, prueba visual y publicación en
   https://directorio.eccoqualita.com sin caché. Marca **Completada** o **Devuelta** (con
   observaciones para corregir).
5. **Pedidos directos del usuario a un agente:** si solo tocan sus propios archivos, puede
   hacerlos y los registra abajo como tarea **Directa**, para que la directora lo sepa. Si
   tocan archivos de otro rol, no los hace: los anota como **Propuesta** y avisa.

Estados: Propuesta · Asignada · En curso · Para revisión · Completada · Devuelta ·
Bloqueada (falta un dato del usuario).

No inventar URLs. No activar `AUTH.activo`. Sin frameworks ni dependencias. Conservar los
colores, fuentes y estilo de Ecco Qualitá.

## Hoja de ruta (orden de prioridad)

1. Confiabilidad del contenido · 2. Navegación · 3. Buscador · 4. Accesibilidad y móvil ·
5. Calidad y pruebas · 6. Inicio de sesión por roles (sin activarlo) · 7. Pulido visual ·
8. Funciones opcionales (favoritos, recientes, reportar enlaces, app instalable, modo
oscuro, estadísticas).

## Tareas

### T-001 — Pruebas automáticas de los datos

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Tipo:** Directa (aprobada por Vincent el 2026-09-30)
- **Asignada a:** Codex (Ingeniería)
- **Archivos:** `tests/directorio.test.mjs`
- **Qué hacer:** agregar pruebas que revisen `enlaces.js` sin cambiar el sitio:
  identificadores de áreas y clientes únicos; URLs no repetidas; campos obligatorios
  presentes (`id`, `nombre`, `descripcion`, `grupos`; en cada acceso `nombre`,
  `descripcion`, `url`, `icono`); cada área con un `proceso` existente en `PROCESOS`; cada
  cliente con `estado` "activo" o "cerrado"; los clientes cerrados no aparecen en
  "Proyectos Activos" del PMO; cada `logo` existe en `logos/`; cada ruta interna (`#/…`)
  lleva a una página que existe; las URLs externas empiezan con `https://`.
- **Criterios de aceptación:** todas las pruebas pasan con los datos actuales; cada prueba
  falla si se introduce a propósito el error que vigila (comprobarlo y revertirlo);
  `index.html` y `enlaces.js` sin cambios.
- **Notas de entrega:** se agregaron diez validaciones de datos con sus comprobaciones de
  mutación: identificadores, campos obligatorios, URLs duplicadas, procesos, estados de
  clientes, proyectos cerrados fuera del PMO, logos, rutas internas y HTTPS. La suite
  completa pasa con 14 pruebas. `index.html` y `enlaces.js` no cambiaron. La directora debe
  ejecutar `node --test tests/directorio.test.mjs` y revisar que el alcance coincida con
  los criterios de aceptación.
- **Revisión de la directora:** aprobada. Las 14 pruebas pasan; `index.html` y `enlaces.js`
  no cambiaron. Comprobé en una copia aparte que cada validación falla cuando se introduce
  su error: identificador repetido, estado inválido, logo inexistente, ruta interna rota,
  URL sin HTTPS y URL repetida. `AGENTS.md` ya pide correr todas las pruebas, no cuatro.

### T-002 — Uniformar nombres y descripciones de los accesos

- **Estado:** Completada (revisada por la directora el 2026-09-30)
- **Asignada a:** Ejecutador (Contenido)
- **Archivos:** `enlaces.js`
- **Qué hacer:** solo textos (`nombre` y `descripcion`); nada de `id`, `url`, `logo`,
  `estado`, `icono` ni estructura.
  1. Nombres de accesos con mayúscula en cada palabra importante, como el resto:
     "Material educativo" → "Material Educativo".
  2. Accesos principales de cada área con el patrón "Herramienta + Área":
     "SharePoint SGC" → "SharePoint Calidad", y su descripción debe seguir mencionando
     "Sistema de Gestión de Calidad (SGC)" para que el buscador lo encuentre por "SGC".
  3. Descripción de clientes activos: "Proyecto en curso con el cliente X." (hoy dice
     "Proyecto con el cliente X."), en paralelo a los cerrados ("Proyecto finalizado con
     el cliente X."). Agroplast conserva la suya, que describe sus tres servicios.
  4. Descripciones de accesos: una frase corta terminada en punto, que diga qué se
     encuentra ahí. Si dos descripciones genéricas se repiten, déjalas así salvo que
     tengas información real para diferenciarlas: no inventes contenido.
  5. No cambies "SharePoint del proyecto", "Planner del proyecto", "Banco Central",
     "Soluciones Globales" ni "OMP": las pruebas los usan.
- **Criterios de aceptación:** `node --test tests/directorio.test.mjs` pasa; `git diff`
  de `enlaces.js` solo muestra cambios en `nombre` y `descripcion`; las "Notas de entrega"
  listan cada texto cambiado (antes → después).
- **Notas de entrega:**
  Solo cambiaron `nombre` y `descripcion` en `enlaces.js` (8 líneas). `git diff` no muestra
  cambios en `id`, `url`, `logo`, `estado`, `icono` ni estructura. Pruebas: 5 de 5 pasan.
  Comprobado en la página: el buscador encuentra "SharePoint Calidad" por "SGC".

  Cambios (antes → después):
  1. Mayúsculas: "Material educativo" → "Material Educativo"; "Mis planes" → "Mis Planes".
  2. Patrón Herramienta + Área: "SharePoint SGC" → "SharePoint Calidad". Su descripción:
     "Gerencia de Calidad: procesos y documentación del SGC." → "Sistema de Gestión de
     Calidad (SGC): procesos y documentación del área."
  3. Clientes activos: "Proyecto con el cliente Soluciones Globales." → "Proyecto en curso con
     el cliente Soluciones Globales."; ídem Fintax Consulting. Agroplast conserva la suya.
  4. Descripciones repetidas que sí tenían información real para diferenciarse:
     Planner Calidad: "Tareas internas del área." → "Tareas internas del área de Calidad."
     Planner Recursos Humanos: "Tareas internas del área." → "Tareas internas del área de
     Recursos Humanos."
     Sitio web (Herramientas generales): "eccoqualita.com" → "Sitio web de Ecco Qualitá
     (eccoqualita.com)." (antes no era una frase ni terminaba en punto).
  5. Sin cambios a propósito: "SharePoint del proyecto", "Planner del proyecto", "Banco
     Central", "Soluciones Globales", "OMP" y "AdmCloud"; las descripciones genéricas de los
     accesos de Agroplast ("Documentos y entregables del servicio." y "Tareas y seguimiento
     del servicio."), que se repiten entre sus tres servicios: no hay información real para
     diferenciarlas y los nombres ya dicen el servicio.

  Para revisar: que "Mis Planes" en mayúscula sea lo que se quiere (no lo nombraba la tarea,
  lo apliqué por la regla 1) y que el texto nuevo de "Sitio web" sea aceptable.

- **Revisión de la directora:** aprobada. `git diff` confirma que solo cambiaron
  `nombre` y `descripcion` (8 líneas); las pruebas pasan; publicada y comprobada sin caché
  en https://directorio.eccoqualita.com (la página de Calidad muestra los textos nuevos y
  el buscador encuentra "SharePoint Calidad" por "SGC"). Decisiones: "Mis Planes" en
  mayúscula se acepta, y el texto nuevo de "Sitio web" también. Para ser coherentes con la
  regla 1, el nombre "Sitio web" debe pasar a "Sitio Web": queda como ajuste menor para la
  próxima tarea de Contenido.

### T-003 — Contadores reales y etiquetas de estado en las tarjetas

- **Estado:** Completada (revisada por la directora el 2026-10-01, con un ajuste)
- **Asignada a:** Codex (Ingeniería) — modelo GPT-6 Sol, esfuerzo medio
- **Archivos:** `index.html`, `tests/directorio.test.mjs`
- **Problema:** las tarjetas de áreas y clientes cuentan los enlaces pendientes como si
  fueran accesos ("Agroplast · 6 accesos" no tiene ninguno disponible) y las tarjetas de
  clientes no dicen si el proyecto está activo o cerrado.
- **Qué hacer:**
  1. En `tarjetaEspacio()`, reemplazar "N accesos →" por el conteo real. Un acceso está
     *disponible* si su `url` no está vacía (las rutas internas `#/…` cuentan como
     disponibles) y *pendiente* si `url` es `""`. Textos, con singular y plural correctos:
     - disponibles y pendientes: "2 disponibles · 1 pendiente →"
     - solo disponibles: "1 disponible →"
     - solo pendientes: "6 pendientes →"
     - sin accesos: "Sin accesos todavía →" (como hoy)
  2. En las tarjetas de clientes, una etiqueta visible con el texto **"Activo"** o
     **"Cerrado"** según `estado`. Debe verse en "Proyectos Activos" del PMO, en la página
     "Proyectos Cerrados" y en los resultados del buscador. Las tarjetas de áreas no la
     llevan.
  3. En la página de cada cliente, la etiqueta de la portada pasa de "Cliente" a
     "Cliente activo" o "Cliente cerrado".
  4. Estilo: etiqueta pequeña tipo píldora, con las variables CSS existentes (verde
     azulado para "Activo"; gris de texto sobre fondo gris claro para "Cerrado"). El
     estado debe leerse por el texto, no solo por el color, y el contraste del texto de
     las etiquetas debe ser al menos 4,5:1.
  5. Pruebas nuevas en `tests/directorio.test.mjs`. **Corrección de la directora
     (2026-10-01):** no fijar números de los datos reales, porque el Ejecutador sigue
     cargando enlaces (Agroplast ya tiene 3 disponibles y 3 pendientes). En su lugar:
     a) probar el texto del contador con casos fijos (2/1, 1/0, 0/6, 1/1, 0/0 →
        "2 disponibles · 1 pendiente", "1 disponible", "6 pendientes",
        "1 disponible · 1 pendiente", "Sin accesos todavía"), y
     b) comprobar que cada tarjeta de área y cliente muestra el conteo que corresponde a
        sus accesos de `enlaces.js`, calculado en la prueba contando las `url` vacías y
        no vacías.
     Además: las tarjetas de clientes cerrados dicen "Cerrado", las de activos "Activo" y
     las de áreas no llevan etiqueta.
- **No hacer:** no tocar `enlaces.js`, `AUTH` ni el buscador más allá de que muestre la
  etiqueta; sin dependencias nuevas.
- **Criterios de aceptación:** todas las pruebas pasan; `enlaces.js` sin cambios; probado
  en escritorio y móvil (375 px) sin desbordes; contraste de las etiquetas ≥ 4,5:1
  indicado en las "Notas de entrega".
- **Notas de entrega:** `index.html` muestra el conteo real de disponibles y pendientes,
  añade las píldoras "Activo"/"Cerrado" solo a clientes y cambia la etiqueta de la portada
  a "Cliente activo" o "Cliente cerrado". `tests/directorio.test.mjs` cubre los cinco casos
  fijos pedidos, compara todas las tarjetas con los datos actuales y verifica estados en
  PMO, cerrados y búsqueda; pasan 19 pruebas. Probado en escritorio (1280 px) y móvil
  (375 px), sin desborde horizontal ni de tarjetas y sin errores del navegador. Contraste:
  "Activo", blanco `#ffffff` sobre `#0a4950`, 10,09:1; "Cerrado", gris `#646464` sobre
  `#f6f5ef`, 5,42:1. `enlaces.js` y `AUTH` no cambiaron. El Organizador debe revisar los
  textos de conteo, las etiquetas en los tres contextos y la presentación a 375 px.
- **Revisión de la directora:** aprobada. El código de `index.html` cumple los cuatro
  puntos; publicado y comprobado sin caché: "Activo"/"Cerrado" en PMO, Proyectos Cerrados y
  buscador, portada "Cliente cerrado", conteos reales y sin desborde a 375 px. **Ajuste
  hecho por la directora:** la prueba de casos fijos sobrescribía las URLs de los accesos
  reales y exigía que Agroplast tuviera exactamente 6, lo que bloqueaba al Ejecutador
  (Vincent pidió unificar sus Planner). `fijarUrls()` ahora reemplaza los accesos por
  accesos de prueba; pasan las 19 pruebas con los datos subidos y con los del Ejecutador.
  **Incidente:** el código de esta tarea quedó dentro del commit `addb5a3` del Ejecutador
  ("Reservar enlaces.js…") porque el índice de Git es compartido; ver la regla nueva en
  `AGENTS.md`.

### T-004 — Ajuste "Sitio Web" y recolección de datos pendientes

- **Estado:** En curso (2026-10-01)
- **Asignada a:** Ejecutador (Contenido) — Claude Sonnet 5.5, esfuerzo medio
- **Archivos:** `enlaces.js`, `logos/`
- **Qué hacer:**
  1. En `GENERALES`, cambiar el nombre "Sitio web" → "Sitio Web" (pendiente de la revisión
     de T-002). Nada más en esa tarjeta.
  2. Preparar para Vincent, en el chat del Ejecutador, una lista de **todos los datos que
     faltan**, agrupada por área y por cliente, para que él la complete: cada acceso con
     `url: ""` (nombre del acceso y dónde aparece), el logo de Atómica Publicidad, y la
     pregunta de si existen los Planner de Recursos Humanos y de Calidad. Debe ser fácil de
     responder (una línea por dato).
  3. Cuando Vincent entregue datos, cargarlos en `enlaces.js` (enlaces) o `logos/`
     (imágenes cuadradas, como las demás), cada lote como tarea **Directa** en este archivo,
     con su propio commit. Si Vincent dice que un acceso no existe, no lo borres por tu
     cuenta: anótalo en las "Notas de entrega" y la directora decide.
- **No hacer:** no inventar URLs; no cambiar `id`, `estado` ni estructura salvo que Vincent
  lo pida; no tocar `index.html` ni `tests/` (Codex está trabajando ahí en la T-003).
- **Criterios de aceptación:** todas las pruebas pasan; `git diff` del punto 1 solo cambia
  ese nombre; la lista del punto 2 cubre los 18 accesos pendientes, el logo y los dos
  Planner.
- **Notas de entrega:**
  Parte 1 hecha: "Sitio web" → "Sitio Web" (único cambio en `enlaces.js`; pruebas 14 de 14).
  Parte 2 hecha: lista de los 18 accesos con `url` vacía, el logo de Atómica Publicidad y la
  pregunta por los Planner de RR. HH. y Calidad presentada a Vincent en el chat. La tarea sigue
  abierta para la parte 3 (cargar lo que él entregue como tareas Directas).
- **Revisión de la directora (partes 1 y 2):** aprobadas. El diff solo cambia el nombre;
  pruebas en verde; publicado y comprobado sin caché. La tarea sigue En curso por la parte 3.

### T-005 — Que el equipo vea siempre la versión más reciente de los enlaces

- **Estado:** En pausa (2026-10-01): probablemente innecesaria, porque con Supabase los
  enlaces se leerán directo de la base de datos y no de `enlaces.js`.
- **Asignada a:** Codex (Ingeniería) — GPT-6 Sol, esfuerzo medio
- **Archivos:** `index.html`, `tests/directorio.test.mjs`
- **Origen:** propuesta del Ejecutador. Tras cada carga de contenido, el navegador sigue
  usando hasta 10 minutos una copia vieja de `enlaces.js` (GitHub Pages envía
  `Cache-Control: max-age=600`); Vincent no veía el Planner único de Agroplast.
- **Qué hacer:** que `index.html` pida siempre la versión vigente de `enlaces.js`, **sin
  que nadie tenga que cambiar un número de versión a mano** (el Ejecutador no toca
  `index.html`). Por ejemplo, cargar `enlaces.js` con una marca de tiempo en la dirección,
  manteniendo que los datos estén cargados antes de que corra el script principal. Si
  `enlaces.js` no carga, mostrar un mensaje claro en lugar de una página vacía.
- **No hacer:** sin dependencias; no tocar `enlaces.js` ni `AUTH`; no cambiar el orden en
  que se ejecutan los datos y la página sin adaptar las pruebas.
- **Criterios de aceptación:** todas las pruebas pasan; en el navegador, `enlaces.js` se
  pide con la marca y responde desde el servidor (no desde la caché); probado en escritorio
  y móvil; sin errores en la consola.
- **Notas de entrega:**

### T-006 — Ruta de navegación y botón de volver

- **Estado:** En pausa (2026-10-01): se hará después del inicio de sesión, para no editar
  `index.html` dos veces.
- **Asignada a:** Codex (Ingeniería) — GPT-6 Sol, esfuerzo alto
- **Archivos:** `index.html`, `tests/directorio.test.mjs`
- **Qué hacer:** línea de ruta visible en cada página interna ("Inicio › Gestión de
  Proyectos (PMO) › Proyectos Cerrados › Banco Central"), con cada tramo enlazado salvo el
  último; botón de volver de al menos 44 px de alto; y una página "No encontramos esa
  página" con enlace al inicio cuando la dirección (`#/…`) no existe, en lugar de mostrar
  el inicio sin aviso. Detalle se completa al asignarla.
- **Notas de entrega:**

## Proyecto: inicio de sesión con usuarios propios (Supabase)

Aprobado por Vincent el 2026-10-01. Cada persona entra con correo y contraseña; Vincent
crea los usuarios y les asigna áreas desde un panel de administración. Los enlaces salen de
`enlaces.js` y se guardan en Supabase, que solo entrega a cada usuario los de sus áreas
(reglas de seguridad de la base de datos, "RLS"). Los clientes dependen del permiso del
área `pmo`. Las herramientas `GENERALES` siguen en el código, visibles para cualquier
usuario que haya iniciado sesión. El código de Microsoft (`AUTH`, MSAL) queda sin uso.

**Reglas de este proyecto:** en el sitio y en el repositorio solo pueden aparecer la URL
del proyecto de Supabase y la clave **pública** (`sb_publishable_…`). La clave secreta
(`sb_secret_…` / `service_role`) y la contraseña de la base de datos **nunca** se escriben
en el repositorio, en `BITACORA.md` ni en mensajes entre agentes. Los agentes no crean
cuentas ni inician sesión con contraseñas: eso lo hace Vincent.

**Proyecto de Supabase:** "Directorio EQ", región East US (North Virginia),
URL `https://yvhractjxuvfjaldhgdo.supabase.co` (pública, se puede usar en el código). Clave
pública (se puede usar en el código): `sb_publishable_1QVuwl_e3IWZtdUCJwLvSQ_RnUIOI02`.
Comprobado el 2026-10-01: la clave funciona y el único método de acceso activo es correo y
contraseña. **Etapa 0 completada:** Vincent desactivó el registro público (comprobado desde
fuera: `disable_signup: true`) y puso `https://directorio.eccoqualita.com` como Site URL.

Etapas: **0** Vincent crea el proyecto (pasos en el chat del Organizador) · **1** T-007 ·
**2** T-008 · **3** T-009 · **4** T-010 · **5** T-011.

### T-007 — Base de datos y reglas de seguridad (Etapa 1)

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Codex (Ingeniería) — **GPT-6 Astra, esfuerzo alto** (es la pieza de
  seguridad; un error expone enlaces)
- **Archivos:** `supabase/esquema.sql` (nuevo), `supabase/LEEME.md` (nuevo)
- **Qué hacer:** un solo archivo SQL que Vincent pegará una vez en el "SQL Editor" de
  Supabase, que se pueda volver a ejecutar sin romper nada, con:
  1. Tablas en el esquema `public`:
     - `perfiles` (`id` uuid = `auth.users.id`, `correo`, `nombre`, `es_admin` boolean
       por defecto `false`, fecha de creación). Se crea sola para cada usuario nuevo con un
       disparador sobre `auth.users`, siempre con `es_admin = false`.
     - `permisos` (`usuario_id` → `perfiles`, `area_id` texto; clave primaria de ambos).
     - `espacios` (áreas y clientes con los mismos campos que hoy tiene `enlaces.js`:
       `id`, `tipo` 'area' o 'cliente', `nombre`, `descripcion`, `icono`, `proceso`,
       `estado`, `logo`, `proyectos_de_clientes`, `orden`) más `rol`: el área cuyo permiso
       se exige para verlo (su propio `id` en las áreas; `pmo` en los clientes). Restricciones
       `check` equivalentes a las pruebas actuales (tipo, estado de clientes, proceso).
     - `accesos` (`id`, `espacio_id` → `espacios`, `grupo`, `orden_grupo`, `nombre`,
       `descripcion`, `url` —vacía = pendiente—, `icono`, `orden`).
  2. RLS activado en las cuatro tablas, sin ninguna política para el rol `anon` (quien no
     inició sesión no ve nada). Funciones auxiliares `security definer` con `search_path`
     fijo: `es_admin()` y `puede_ver(rol)` (admin, o tiene ese `area_id` en `permisos`).
     - `espacios` y `accesos`: leer solo si `puede_ver(rol)` (en `accesos`, el `rol` de su
       espacio); crear, modificar y borrar solo administradores.
     - `perfiles`: cada usuario lee el suyo; los administradores leen y modifican todos.
       **Nadie puede darse `es_admin` a sí mismo.**
     - `permisos`: cada usuario lee los suyos; solo administradores escriben.
  3. Al final, comentada, la instrucción para que Vincent se haga administrador a sí mismo
     una sola vez (cambiando el correo).
  4. `supabase/LEEME.md`: en lenguaje sencillo, qué crea el archivo, cómo ejecutarlo y una
     tabla de quién puede hacer qué.
- **No hacer:** no tocar `index.html` ni `enlaces.js` todavía; no poner URLs de enlaces
  reales, claves ni contraseñas en estos archivos.
- **Criterios de aceptación:** el SQL es válido para PostgreSQL 15+ de Supabase; ninguna
  tabla queda sin RLS; las "Notas de entrega" incluyen la tabla de permisos y cómo se
  comprobó (si no hay base de datos de prueba disponible, decirlo; la prueba real se hace
  en la Etapa 5). La directora revisa política por política antes de pasárselo a Vincent.
- **Notas de entrega:** `supabase/esquema.sql` crea las cuatro tablas, índices, perfil
  automático para usuarios nuevos y existentes, funciones auxiliares en el esquema privado
  `privado`, RLS y 14 políticas reejecutables. También revoca todos los privilegios de
  `anon` y agrega un disparador independiente que impide cambiar el propio `es_admin` de
  `false` a `true`. La instrucción inicial para hacer administrador a Vincent queda
  comentada y exige sustituir su correo.

  Matriz comprobada: sin sesión no se lee ni escribe ninguna tabla; un usuario lee solo su
  perfil, sus permisos y los espacios/accesos cuyo `rol` tiene asignado; un administrador
  lee y actualiza todos los perfiles, gestiona permisos y crea, cambia o borra espacios y
  accesos. Ninguna sesión autenticada puede darse a sí misma el nivel de administrador.

  `supabase/LEEME.md` explica la instalación y contiene la tabla completa de permisos.
  Comprobación local: validación estructural de 4 tablas con RLS, 14 pares de políticas
  `drop/create`, 4 funciones `security definer` con `search_path = ''`, ninguna política
  para `anon`, ningún secreto ni URL; `git diff --check` limpio; 19 de 19 pruebas del
  directorio pasan; sitio publicado sin errores de consola. No hay PostgreSQL/Supabase de
  prueba disponible en esta sesión, por lo que el SQL no se ejecutó contra una base real;
  la prueba con usuarios y consultas reales corresponde a la Etapa 5 (T-011). El
  Organizador debe revisar las restricciones, privilegios, disparadores y cada política
  antes de entregarle el archivo a Vincent.
- **Revisión de la directora:** aprobada, política por política. Sin sesión no hay ningún
  privilegio (se revoca todo a `anon` y no hay políticas para ese rol); RLS activo en las
  cuatro tablas; funciones `security definer` con `search_path` vacío, en un esquema
  `privado` que la API no expone; nadie puede insertar perfiles (los crea el disparador,
  siempre sin administrador); solo administradores escriben permisos, espacios y accesos;
  los accesos heredan el permiso de su espacio; las restricciones obligan a que un cliente
  dependa siempre de `pmo` y un área de sí misma; el disparador impide el autoascenso aunque
  una política cambie por error. Observaciones menores, sin riesgo: el `correo` del perfil
  no se actualiza si se cambia el correo en Supabase, y el `nombre` lo pone el administrador.
  Falta la prueba con una base real (T-011).

### T-008 — Pantalla de inicio de sesión y carga desde Supabase (Etapa 2)

- **Estado:** Asignada (2026-10-01)
- **Asignada a:** Codex (Ingeniería) — GPT-6 Sol, esfuerzo alto
- **Archivos:** `index.html`, `tests/directorio.test.mjs`
- **Qué hacer:**
  1. Interruptor `SUPABASE = { activo: false, url, clavePublica }` al inicio del script,
     con la URL y la clave pública registradas arriba. **Con `activo: false` el sitio debe
     funcionar exactamente como hoy** (datos de `enlaces.js`, sin inicio de sesión): así el
     sitio publicado no cambia mientras se desarrolla. Se enciende en la T-011.
  2. Con `activo: true`: cargar la librería oficial `@supabase/supabase-js` versión 2 desde
     jsDelivr solo en ese caso (excepción aprobada a la regla de dependencias, como antes con
     MSAL) y mostrar la pantalla de inicio de sesión (reutilizar la existente) con correo,
     contraseña, "¿Olvidaste tu contraseña?" (envía el correo de recuperación con
     `redirectTo` = la dirección del sitio) y "Cerrar sesión" en el encabezado.
  3. Cuando la persona llega desde un correo de invitación o de recuperación, pedirle una
     contraseña nueva (dos veces) y guardarla antes de mostrar el directorio.
  4. Tras iniciar sesión, leer `espacios` y `accesos` (ordenados por `orden`,
     `orden_grupo`, `orden`) y convertirlos a las mismas estructuras `AREAS` y `CLIENTES`
     que usa hoy la página, para reutilizar el dibujo, el buscador, los contadores y las
     etiquetas. `PROCESOS` y `GENERALES` siguen viniendo de `enlaces.js`. No usar las
     `AREAS`/`CLIENTES` de `enlaces.js` cuando `activo` es `true`.
  5. Mensajes claros: usuario sin áreas asignadas; Supabase no responde o el proyecto está
     en pausa; correo o contraseña incorrectos. Nunca mostrar una página vacía.
  6. Quitar el código de Microsoft (`AUTH`, MSAL, `puedeVer`/`rolDe` basados en roles de
     Microsoft): la base de datos ya decide qué ve cada uno.
  7. Pruebas: con `activo: false` todo sigue igual (las 19 actuales pasan); la conversión
     de filas de Supabase a `AREAS`/`CLIENTES` con datos de ejemplo; y la página dibujada con
     un cliente de Supabase simulado (sin red), incluido el caso sin áreas.
- **No hacer:** no encender `activo`; no escribir correos, contraseñas ni la clave secreta;
  no tocar `enlaces.js` ni `supabase/`.
- **Límite conocido:** los agentes no pueden iniciar sesión con contraseñas reales, así que
  la prueba de punta a punta la hará Vincent en la T-011. Indicarlo en las notas.
- **Criterios de aceptación:** todas las pruebas pasan; con `activo: false` el sitio
  publicado se ve y funciona igual que antes; sin errores en la consola.
- **Notas de entrega:**

### T-009 — Panel de administración (Etapa 3)

- **Estado:** Pendiente
- **Asignada a:** Codex — GPT-6 Sol, esfuerzo alto
- **Qué hacer (resumen):** para administradores, ver usuarios, asignarles áreas o hacerlos
  administradores, y crear, editar o quitar áreas, clientes y accesos.

### T-010 — Pasar los enlaces a Supabase y quitarlos del archivo público (Etapa 4)

- **Estado:** Parte 1 para revisión (2026-10-01); la parte 2 espera la T-011
- **Asignada a:** Ejecutador (Contenido) — Claude Sonnet 5.5, esfuerzo medio
- **Archivos:** `no-subir/datos-supabase.sql` (fuera de Git: la carpeta `no-subir/` está en
  `.gitignore`); en la parte 2, `enlaces.js`.
- **Parte 1 — archivo de carga:** generar desde `enlaces.js`, con un script y no a mano,
  un SQL que inserte todas las áreas y clientes en `public.espacios` y todos sus accesos en
  `public.accesos`, siguiendo exactamente las columnas y restricciones de
  `supabase/esquema.sql`: `tipo` 'area'/'cliente'; `rol` = el `id` en áreas y `pmo` en
  clientes; `proceso` solo en áreas; `estado` solo en clientes; `proyectos_de_clientes`
  solo en `pmo`; `orden` según el orden actual; en cada acceso, `grupo` = título del grupo,
  `orden_grupo` y `orden` según su posición; `url` vacía para los pendientes. Debe poder
  ejecutarse más de una vez sin duplicar (borrar y volver a insertar dentro de una
  transacción, o `on conflict`). Las herramientas `GENERALES` no se cargan.
  Entregar en las notas: cuántos espacios y accesos inserta y cómo se comprobó que
  coinciden con `enlaces.js`. **No subir ese archivo a GitHub.**
- **Parte 2 (después de la T-011):** dejar en `enlaces.js` solo `PROCESOS` y `GENERALES`.
- **Notas de entrega:**
  Parte 1 hecha. Archivos (fuera de Git, en `no-subir/`): `datos-supabase.sql` (82 líneas) y el
  script que lo genera, `generar-datos-supabase.mjs`; para rehacerlo tras cambiar `enlaces.js`:
  `node no-subir/generar-datos-supabase.mjs`. No se subió nada a GitHub (`git check-ignore` lo
  confirma).

  Inserta **21 espacios** (13 áreas + 8 clientes) y **42 accesos** (6 de ellos con `url` vacía),
  según `enlaces.js` de hoy. Las herramientas `GENERALES` no se cargan. 7 áreas no tienen accesos
  (siguen como en el sitio). Todo el SQL es una sola transacción: borra los espacios que va a
  cargar (los accesos se borran en cascada) y los vuelve a insertar, así que se puede ejecutar
  varias veces sin duplicar.

  Reglas aplicadas: `tipo` área/cliente; `rol` = `id` en áreas y `pmo` en clientes; `proceso` solo
  en áreas; `estado` solo en clientes; `proyectos_de_clientes` solo en `pmo`; `orden` según la
  posición (áreas primero, luego clientes); en los accesos, `grupo` = título del grupo,
  `orden_grupo` y `orden` según posición; los clientes llevan el icono `cliente` (como hace
  `index.html`) y su `logo`.

  Cómo se comprobó (no hay Supabase de prueba): recreé las dos tablas con las mismas columnas y
  restricciones de `esquema.sql` (checks de tipo/estado/proceso/rol, clave foránea con borrado
  en cascada) en una base SQLite de prueba, ejecuté el SQL **dos veces** y comparé cada campo de
  cada espacio y de cada acceso con los datos leídos de `enlaces.js`: 21/21 espacios y 42/42
  accesos iguales, 0 diferencias, sin duplicados tras la segunda ejecución. Lo que no se pudo
  probar: la sintaxis exacta de PostgreSQL (`begin`/`commit`, `delete … where id in`) y las
  políticas RLS; conviene ejecutarlo en Supabase en la T-011.

  Atención para la parte 2: el SQL refleja `enlaces.js` de hoy; si se cargan más enlaces antes
  de la T-011, hay que regenerarlo con el script.

### T-011 — Prueba controlada (Etapa 5)

- **Estado:** Pendiente
- **Asignada a:** Organizador y Vincent
- **Qué hacer (resumen):** con dos usuarios (Vincent administrador y uno con una sola área)
  comprobar en la página **y consultando Supabase directamente** que cada uno solo obtiene
  lo suyo; recién entonces se avisa al equipo.

### D-001 — Directa: SharePoint de Agroplast, Planificación Estratégica

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (dato 9 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "SharePoint de Planificación Estratégica" (Agroplast): "" →
  enlace dado por Vincent. Es el único cambio. Pruebas 14 de 14.
- **Revisión de la directora:** aprobada. El diff solo cambia las `url` indicadas, las
  pruebas pasan (14 de 14 en la versión subida) y el sitio publicado ya las muestra.


### D-002 — Directa: SharePoint de Agroplast, Programa EHS y Gerencia de Calidad

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (datos 13 y 11 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "SharePoint del Programa EHS" y de "SharePoint de Gerencia de
  Calidad" (Agroplast): "" → enlaces dados por Vincent. Son los únicos cambios. Con los datos
  actuales, la prueba nueva de Codex (T-003, sin subir) falla porque fija "6 pendientes" para
  Agroplast (ahora son 3 disponibles y 3 pendientes): hay que contar desde `enlaces.js`.
- **Revisión de la directora:** aprobada. El diff solo cambia las `url` indicadas, las
  pruebas pasan (14 de 14 en la versión subida) y el sitio publicado ya las muestra.

### D-003 — Directa: Planner de Fintax (movido desde Soluciones Globales)

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (dato 8 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** el enlace de Planner dado para Fintax ya estaba cargado en Soluciones
  Globales. Vincent confirmó que es de Fintax y pidió quitarlo del otro cliente. Cambios:
  Planner de Soluciones Globales: enlace → "" (queda pendiente); Planner de Fintax: "" →
  ese enlace. Pruebas 19 de 19. Para la directora: Soluciones Globales queda con su Planner
  pendiente, que antes parecía cargado.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.

### D-004 — Directa: Planner de Agroplast, Planificación Estratégica

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (dato 10 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Planner de Planificación Estratégica" (Agroplast): "" →
  enlace dado por Vincent (no repetido en otro acceso). Único cambio. Pruebas 19 de 19.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.

### D-005 — Directa: Planner de Calidad

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (dato 1 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Planner Calidad": "" → enlace dado por Vincent (no repetido
  en otro acceso). Único cambio. Pruebas 19 de 19.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.

### D-006 — Directa: SharePoint de Soluciones Globales

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent (dato 7 de T-004)
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "SharePoint del proyecto" (Soluciones Globales): "" → enlace
  dado por Vincent (no repetido en otro acceso). Único cambio. Pruebas 19 de 19.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.

### D-007 — Directa: Planner de Soluciones Globales

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Planner del proyecto" (Soluciones Globales): "" → enlace dado
  por Vincent (no repetido en otro acceso). Único cambio. Pruebas 19 de 19.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.

### D-008 — Directa: Agroplast con un solo Planner

- **Estado:** Completada (revisada por la directora el 2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** se quitaron los 3 Planner por servicio de Agroplast (el de Planificación
  Estratégica tenía el enlace de D-004) y se agregó un solo "Planner de Agroplast" con el enlace
  que dio Vincent, en su propia sección arriba de los servicios. Agroplast pasa de 6 a 4
  accesos. Vincent pidió subirlo de inmediato. Aviso: hasta que Codex suba su corrección, la
  prueba "el contador cubre combinaciones fijas…" falla en el repositorio (fijaba 6 URLs para
  agroplast); con su copia local pasa 19 de 19.
- **Revisión de la directora:** aprobada. El diff solo toca los accesos indicados, no hay
  URLs repetidas, las 19 pruebas pasan y el sitio publicado ya lo muestra.
  Cambio de estructura pedido por Vincent: el enlace del Planner de Planificación
  Estratégica (D-004) quedó reemplazado por el Planner único que él indicó.

### D-009 — Directa: Expedientes de clientes en Gestión Comercial

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** acceso nuevo "Expedientes de Clientes" en el grupo "Accesos principales"
  de Gestión Comercial (después de Planner Comercial), con el enlace de la carpeta dado por
  Vincent, icono `sharepoint` y la descripción "Carpeta con los expedientes de los clientes."
  (redacción mía; la tarea no la dio). Único cambio: una línea agregada. Pruebas 19 de 19.

### D-010 — Directa: Reportes de Consultores (PMO)

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Reportes de Consultores" (Accesos Directos del PMO): "" →
  enlace dado por Vincent (no repetido en otro acceso). Único cambio. Pruebas 19 de 19.

### D-011 — Directa: carpetas principales de Recursos Humanos

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** grupo nuevo "Carpetas de Recursos Humanos" con 6 tarjetas sin enlace
  (`url: ""`), con icono `sharepoint`. Nombres tomados de la captura de Vincent, sin el número
  de orden. Descripciones cortas redactadas por mí; la de "Documentos Legales y Registros" es
  genérica porque la captura la mostraba cortada. Las subcarpetas no se registraron, por
  indicación de Vincent. Pruebas 19 de 19. Suma 6 accesos pendientes a la lista.

### D-012 — Directa: Reclutamiento y Selección (Recursos Humanos)

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Reclutamiento y Selección": "" → enlace dado por Vincent (no
  repetido en otro acceso). Único cambio. Pruebas 19 de 19.

### D-013 — Directa: tres carpetas de Recursos Humanos

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Plantillas de Contratación", "Expedientes de Personal Activo" y
  "Expedientes de Personal Inactivo": "" → enlaces dados por Vincent (ninguno repetido en otro
  acceso). Vincent escribió "Expediente del Personal Inactivo"; se conservó el nombre de la
  tarjeta ya creada. Único cambio: tres `url`. Pruebas 19 de 19.

### D-014 — Directa: últimas dos carpetas de Recursos Humanos

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Políticas y Reglamentos" y "Documentos Legales y Registros":
  "" → enlaces dados por Vincent (ninguno repetido en otro acceso). Con D-012 y D-013, las 6
  carpetas del grupo "Carpetas de Recursos Humanos" tienen enlace. Único cambio: dos `url`.
  Pruebas 19 de 19.

### D-015 — Directa: Gestión Interna PMO

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Gestión Interna PMO": "" → enlace dado por Vincent (no
  repetido en otro acceso). Único cambio. Pruebas 19 de 19.

### D-016 — Directa: Material Educativo (PMO)

- **Estado:** Para revisión (2026-10-01)
- **Asignada a:** Ejecutador (Contenido), pedido directo de Vincent
- **Archivos:** `enlaces.js`
- **Notas de entrega:** `url` de "Material Educativo" (Accesos Directos del PMO): "" → enlace
  dado por Vincent (no repetido en otro acceso). Único cambio. Pruebas 19 de 19.
