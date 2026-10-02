# Trabajo en curso

Tablero para que los agentes (Codex, Claude y cualquier otra sesión) no editen los mismos
archivos al mismo tiempo. `BITACORA.md` registra lo **terminado**; este archivo registra lo
que se está haciendo **ahora mismo**.

## Cómo se usa

1. **Antes de editar:** `git pull` y leer la tabla "Reservas activas".
2. **Si alguno de tus archivos ya aparece reservado:** no lo toques. Dile al usuario qué
   agente lo tiene ocupado y con qué tarea, y espera a que se libere (o trabaja en otro
   archivo que esté libre).
3. **Si están libres:** agrega tu fila a la tabla *antes* de tocar nada más, y haz commit y
   push solo de este archivo (`git add EN-CURSO.md`, mensaje "Reservar …"), para que también
   lo vean los agentes que trabajan desde otra computadora.
4. **Vuelve a leer la tabla** después del push. Si otro agente reservó los mismos archivos
   a la vez, se queda con la reserva la fila que está más arriba; el otro borra la suya y
   espera.
5. **Al terminar:** borra tu fila en el mismo commit en que registras el cambio en
   `BITACORA.md`.
6. **Reservas viejas:** si una fila tiene más de 30 minutos, no la borres por tu cuenta:
   pregunta al usuario si esa sesión sigue trabajando.

Reserva solo los archivos que vas a editar, no "todo el proyecto". `BITACORA.md` y este
archivo no se reservan: todos los agentes los editan, pero siempre con cambios pequeños
(agregar o quitar una entrada), releyéndolos justo antes, y nunca reescribiéndolos
completos.

Formato de la hora: `AAAA-MM-DD HH:MM` (hora local de República Dominicana).

## Reservas activas

| Agente | Sesión | Desde | Archivos | Tarea |
|---|---|---|---|---|
| Ecco (web) | Ingeniería — reserva hecha por la directora | 2026-10-02 | `index.html`, `tests/directorio.test.mjs` | T-012 — Modo de prueba con Supabase |
