# Tareas del Directorio Ecco Qualitá

La sesión **directora** (Claude, sesión **"Organizador"**) planifica el
trabajo, lo asigna aquí y revisa el resultado. Los demás agentes ejecutan **solo las tareas
asignadas a ellos**. Vincent (el usuario) aprueba cada tarea antes de que se asigne.

## Roles y archivos de cada uno

| Rol | Agente | Archivos propios |
|---|---|---|
| Directora | Claude — sesión "Organizador" | `TAREAS.md`, `AGENTS.md`, `CONFIGURAR-INICIO-DE-SESION.md`, `_config.yml`; revisión final de todo |
| Ingeniería | Codex | `index.html`, `tests/` |
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

- **Estado:** En curso
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
- **Notas de entrega:**

### T-002 — Uniformar nombres y descripciones de los accesos

- **Estado:** Asignada
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
