# Directorio Ecco Qualitá — guía para agentes

Este archivo lo leen los agentes de IA que trabajan en el proyecto (Codex y Claude Code).
Responde siempre al usuario en español y en lenguaje sencillo: no es programador.

**Organización del trabajo:** una sesión de Claude llamada **"Organizador"** es
la **directora**: planifica, asigna tareas en `TAREAS.md` y revisa. Cada agente tiene un
rol y unos archivos propios (tabla en `TAREAS.md`) y solo ejecuta las tareas asignadas a
él. Lee `TAREAS.md` al empezar cualquier sesión.

**Antes de editar cualquier archivo, consulta y usa `EN-CURSO.md`**: ahí cada agente
reserva los archivos que está editando en ese momento, para que dos sesiones no guarden
el mismo archivo a la vez. Ya hubo cambios perdidos por no hacerlo.

## Qué es

Un hub interno con accesos directos a las herramientas de Ecco Qualitá (AdmCloud,
SharePoint, Planner, Microsoft 365), organizado por áreas según el mapa de procesos.
Es un sitio estático sin compilación ni dependencias.

- Sitio publicado: https://directorio.eccoqualita.com (dominio propio; GitHub Pages sigue
  siendo el alojamiento). https://445599vincent.github.io/DirectorioEQ/ redirige sola ahí.
- Repositorio: https://github.com/445599Vincent/DirectorioEQ (rama `main`, público)
- GitHub Pages publica solo cada vez que se hace `git push` a `main`; tarda uno o dos
  minutos en construirse, y el navegador puede tardar hasta 10 minutos más en dejar de usar
  una copia en caché de `enlaces.js`/`index.html` (encabezado `Cache-Control: max-age=600`).
  Para comprobar un cambio recién publicado, no confiar en una recarga normal: hacer
  `fetch('/enlaces.js?x='+Date.now(), {cache:'no-store'})` y revisar el contenido.
- El sitio anterior en Netlify (https://directorioeq.netlify.app) dejó de actualizarse:
  no usarlo como referencia.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `enlaces.js` | **Todos los datos**: áreas, clientes, herramientas y sus enlaces. Casi todos los cambios se hacen aquí. |
| `index.html` | Diseño (CSS) y lógica (JS) de la página. Solo se toca para cambiar apariencia o comportamiento. |
| `BITACORA.md` | Registro compartido de lo que hace cada agente. Ver "Bitácora" abajo. |
| `TAREAS.md` | Roles de cada agente, sus archivos propios, la hoja de ruta y las tareas asignadas por la directora con su estado. |
| `EN-CURSO.md` | Tablero de reservas: qué archivos está editando cada agente **ahora mismo**. Se consulta antes de editar y se actualiza al empezar y al terminar. |
| `_config.yml` | Configuración de GitHub Pages: evita que los archivos internos (`.md`) se publiquen en el sitio. |
| `netlify.toml` | Hacía lo mismo en Netlify, el alojamiento anterior. |
| `CONFIGURAR-INICIO-DE-SESION.md` | Instrucciones para el administrador de TI: cómo registrar la app en Microsoft Entra ID. No se publica en el sitio. |
| `tests/directorio.test.mjs` | Pruebas automáticas de la navegación del hub (Codex las creó). Correr con `node --test tests/directorio.test.mjs` antes de cada `git push`. |

## Cómo está organizado el hub

- **Inicio:** tarjetas de las `AREAS` internas, agrupadas por tipo de proceso (`PROCESOS`:
  estratégicos, operativos y soporte), + las herramientas `GENERALES`.
- **Áreas:** siguen el Mapa de Procesos MAP-SGI-01 (versión 01, emisión 20/08/2026), con un
  cambio pedido por el usuario: "Gestión de Proyectos" y "Gestión de Seguimiento (PMO)" son
  una sola área (`pmo`). Un área sin accesos se deja con `grupos: []`.
- **Página de cada área** (`#/id-del-area`): sus grupos de accesos (SharePoint, Planner, contenido).
- **Clientes:** están en `CLIENTES`, pero NO aparecen en el inicio. Cada uno tiene un
  `estado`: los activos se muestran dentro del PMO en "Proyectos Activos" y los cerrados
  en la página `#/proyectos-cerrados`. Cada cliente tiene su propia página
  (`#/id-del-cliente`).
- **Buscador:** recorre todo el hub desde cualquier página.
- Un acceso con `url: ""` se muestra como "Enlace pendiente" y no se puede abrir.

## Inicio de sesión y accesos por rol

El hub puede pedir inicio de sesión con Microsoft 365 y mostrar solo las áreas del rol de
cada persona. Todo vive en la constante `AUTH` al inicio del script de `index.html`:

- **Mientras `AUTH.activo` sea `false`** (el valor por defecto), el sitio funciona igual
  que siempre, sin inicio de sesión, visible para cualquiera. No tocar este valor sin que
  el usuario lo pida explícitamente: encenderlo sin `clientId`/`tenantId` reales deja a
  todo el equipo sin poder entrar al sitio.
- El rol de cada área es su propio `id` (por ejemplo `pmo`, `comercial`). El rol `admin`
  (`AUTH.rolAdmin`) ve todas las áreas. Los clientes (`CLIENTES`) siguen el rol `pmo`.
  Si se agrega una área nueva a `enlaces.js`, avisar al usuario para que pida a su
  administrador de TI crear el "App role" correspondiente (mismo `id`), siguiendo
  `CONFIGURAR-INICIO-DE-SESION.md`.
- Activarlo requiere que un administrador del Microsoft 365 de Ecco Qualitá registre una
  aplicación en Entra ID y entregue dos datos (`clientId`, `tenantId`); los pasos exactos
  están en `CONFIGURAR-INICIO-DE-SESION.md`. Solo el usuario decide cuándo pedir ese
  registro y cuándo encender `AUTH.activo`.
- **Límite importante, y hay que decírselo siempre al usuario si pregunta:** esto es un
  sitio estático sin servidor, así que el inicio de sesión solo controla qué se *muestra*
  en la página. No puede impedir que alguien descargue `enlaces.js` directamente y lea ahí
  todas las direcciones. El riesgo real es bajo porque cada herramienta enlazada
  (SharePoint, Planner, HubSpot, AdmCloud) exige su propio inicio de sesión real, que esto
  no reemplaza.

## Reglas

1. **No inventar enlaces.** Si el usuario no dio la URL, se deja `url: ""`.
2. **Evitar redundancia:** cada acceso vive en un solo lugar del hub.
3. **Diseño:** seguir el de https://eccoqualita.com — verde azulado `#107782`, títulos
   `#0b3130`, dorado `#fec565`, fondo `#f6f5ef`, fuentes DM Sans (títulos) y Ubuntu (texto).
   Usar las variables CSS ya definidas en `index.html`, no colores sueltos.
4. **Iconos:** son SVG de trazo definidos en `ICONOS` dentro de `index.html`. Para un icono
   nuevo, agregarlo ahí y a la lista del comentario inicial de `enlaces.js`. Las herramientas
   de Microsoft (iconos `sharepoint`, `planner`, `correo`, `teams`, `nube`) muestran su logo
   oficial, enlazado desde los servidores de Microsoft en `LOGOS`; no copiar los logos al
   repositorio. Lo mismo `hubspot` y `eccoqualita` (el icono "EQ" de eccoqualita.com, que
   usa la tarjeta "Sitio web"). Los logos de clientes, en cambio, sí se guardan en `logos/`. Además, cualquier enlace cuya URL sea de Planner o de SharePoint muestra el
   logo de ese producto automáticamente, aunque en `enlaces.js` tenga otro icono.
5. **Nombres en español** para variables, clases y textos, como el código existente.
6. **Sin dependencias ni paso de compilación.** Nada de frameworks ni npm.
7. El sitio es público: no poner contraseñas, datos personales ni información sensible.
8. **Editar con cambios puntuales, nunca reescribiendo un archivo completo** con una versión
   que leíste antes: otro agente pudo haberlo cambiado mientras tanto y su trabajo se
   perdería. Vuelve a leer el archivo justo antes de editarlo.

## Flujo de trabajo (obligatorio para ambos agentes)

1. **Antes de empezar:** `git pull`, leer `BITACORA.md` (qué se hizo) y `EN-CURSO.md`
   (qué se está haciendo). Si tus archivos están libres, resérvalos en `EN-CURSO.md` y haz
   commit y push de esa reserva antes de editar; si están ocupados, avisa al usuario y espera.
2. Hacer el cambio y probarlo abriendo la página (p. ej. `python -m http.server 5500`;
   si el puerto está ocupado por el otro agente, usar otro puerto).
3. Correr `node --test tests/directorio.test.mjs` y que pasen las cuatro pruebas.
4. **Registrar el cambio en `BITACORA.md`** (ver formato abajo) y **borrar tu reserva de
   `EN-CURSO.md`**, en el mismo commit.
5. `git add` **solo de los archivos que reservaste** más `BITACORA.md` y `EN-CURSO.md`
   (nunca `git add .` ni `git add -A`: las sesiones comparten la misma carpeta y así se
   suben cambios a medias de otro agente), `git commit` con mensaje en español,
   `git pull --rebase` y `git push`.
   Si `git pull --rebase` se niega porque hay cambios sin guardar de **otro** agente en la
   carpeta (compartimos la misma), no uses `--autostash` ni `git stash`: haz `git fetch` y
   `git rev-list --left-right --count origin/main...HEAD`. Si el primer número es 0, nadie
   subió nada y puedes hacer `git push` directo; si no, espera a que ese agente termine.
6. Comprobar en https://directorio.eccoqualita.com que el cambio se publicó, usando
   `fetch` con `cache: "no-store"` como se explica arriba (no alcanza con recargar).

## Bitácora

Cada tarea terminada se registra en `BITACORA.md`, **arriba de todo** (lo más nuevo primero):

```
## AAAA-MM-DD — Agente (Codex o Claude)
- **Pedido:** qué pidió el usuario, en una línea.
- **Cambios:** qué se hizo y en qué archivos.
- **Pendiente:** lo que quedó sin resolver o necesita datos del usuario (o "Nada").
```

La sección "Pendientes generales" al inicio de la bitácora se mantiene al día: se quita lo
resuelto y se agrega lo nuevo.
