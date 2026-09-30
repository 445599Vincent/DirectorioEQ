# Directorio Ecco Qualitá — guía para agentes

Este archivo lo leen los agentes de IA que trabajan en el proyecto (Codex y Claude Code).
Responde siempre al usuario en español y en lenguaje sencillo: no es programador.

## Qué es

Un hub interno con accesos directos a las herramientas de Ecco Qualitá (AdmCloud,
SharePoint, Planner, Microsoft 365), organizado por áreas según el mapa de procesos.
Es un sitio estático sin compilación ni dependencias.

- Sitio publicado: https://445599vincent.github.io/DirectorioEQ/ (GitHub Pages)
- Repositorio: https://github.com/445599Vincent/DirectorioEQ (rama `main`, público)
- GitHub Pages publica solo cada vez que se hace `git push` a `main`; tarda uno o dos minutos.
- El sitio anterior en Netlify (https://directorioeq.netlify.app) dejó de actualizarse:
  no usarlo como referencia.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `enlaces.js` | **Todos los datos**: áreas, clientes, herramientas y sus enlaces. Casi todos los cambios se hacen aquí. |
| `index.html` | Diseño (CSS) y lógica (JS) de la página. Solo se toca para cambiar apariencia o comportamiento. |
| `BITACORA.md` | Registro compartido de lo que hace cada agente. Ver "Bitácora" abajo. |
| `_config.yml` | Configuración de GitHub Pages: evita que los archivos internos (`.md`) se publiquen en el sitio. |
| `netlify.toml` | Hacía lo mismo en Netlify, el alojamiento anterior. |

## Cómo está organizado el hub

- **Inicio:** tarjetas de las `AREAS` internas, agrupadas por tipo de proceso (`PROCESOS`:
  estratégicos, operativos y soporte), + las herramientas `GENERALES`.
- **Áreas:** siguen el Mapa de Procesos MAP-SGI-01 (versión 01, emisión 20/08/2026), con un
  cambio pedido por el usuario: "Gestión de Proyectos" y "Gestión de Seguimiento (PMO)" son
  una sola área (`pmo`). Un área sin accesos se deja con `grupos: []`.
- **Página de cada área** (`#/id-del-area`): sus grupos de accesos (SharePoint, Planner, contenido).
- **Clientes:** están en `CLIENTES`, pero NO aparecen en el inicio. Se muestran dentro del
  área marcada con `proyectosDeClientes: true` (el PMO), en la sección "Proyectos Activos".
  Cada cliente tiene su propia página (`#/id-del-cliente`).
- **Buscador:** recorre todo el hub desde cualquier página.
- Un acceso con `url: ""` se muestra como "Enlace pendiente" y no se puede abrir.

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
   repositorio. Además, cualquier enlace cuya URL sea de Planner o de SharePoint muestra el
   logo de ese producto automáticamente, aunque en `enlaces.js` tenga otro icono.
5. **Nombres en español** para variables, clases y textos, como el código existente.
6. **Sin dependencias ni paso de compilación.** Nada de frameworks ni npm.
7. El sitio es público: no poner contraseñas, datos personales ni información sensible.

## Flujo de trabajo (obligatorio para ambos agentes)

1. **Antes de empezar:** `git pull` y leer `BITACORA.md` para saber qué hizo el otro agente.
2. Hacer el cambio y probarlo abriendo la página (p. ej. `python -m http.server 5500`).
3. **Registrar el cambio en `BITACORA.md`** (ver formato abajo), en el mismo commit.
4. `git add`, `git commit` con mensaje en español, y `git push`.
5. Comprobar en https://445599vincent.github.io/DirectorioEQ/ que el cambio se publicó.

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
