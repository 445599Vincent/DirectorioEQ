# Base de datos del Directorio Ecco Qualitá

Este directorio contiene la base segura que usará el inicio de sesión propio del
Directorio. Todavía no cambia la página web ni mueve los enlaces actuales.

## Qué crea `esquema.sql`

- `perfiles`: una ficha por cada usuario de Supabase. Todo usuario nuevo empieza con
  `es_admin = false`.
- `permisos`: las áreas que puede consultar cada usuario.
- `espacios`: las áreas y los clientes. Cada cliente exige el permiso `pmo`.
- `accesos`: los enlaces de cada área o cliente.
- Reglas RLS: la base de datos decide qué filas puede leer o cambiar cada sesión.
- Un esquema privado para las comprobaciones de permisos. No se expone en la API.

El archivo también crea perfiles para usuarios que ya existan cuando se ejecute. Si se
vuelve a ejecutar, no borra datos ni devuelve administradores a `false`.

## Cómo ejecutarlo

1. En Supabase, abre el proyecto **Directorio EQ**.
2. Abre **SQL Editor** y crea una consulta nueva.
3. Copia el archivo `esquema.sql` completo, pégalo y pulsa **Run** una sola vez.
4. Comprueba que aparecen las cuatro tablas en **Table Editor**.
5. Crea el usuario de Vincent desde la administración de usuarios de Supabase, si todavía
   no existe. No compartas su contraseña ni la escribas en este repositorio.
6. Al final de `esquema.sql` hay una instrucción comentada. Sustituye el texto por el
   correo real de Vincent, quita los guiones iniciales y ejecuta únicamente esa instrucción
   para convertirlo en el primer administrador.

La instrucción final solo se ejecuta desde el SQL Editor. Una persona normal no puede usar
la página ni la API para hacerse administradora a sí misma.

## Migraciones (después de `esquema.sql`)

Cada migración se ejecuta **una sola vez y en orden**, igual que `esquema.sql`: SQL Editor →
consulta nueva → pegar el archivo completo → **Run**. Todas se pueden volver a ejecutar sin
dañar nada. Ejecuta cada una **antes** de publicar la versión de la página que la necesita.

### `migracion-002-contrasena-temporal.sql` (T-014)

Para crear cuentas con una contraseña temporal que la persona cambia al entrar.

- Agrega a `perfiles` la columna `debe_cambiar_contrasena`. Las cuentas nuevas empiezan en
  `true`. Al ejecutarla, las cuentas que ya existen quedan en `true` si son usuarios normales
  y en `false` si son administradores.
- Crea la función `contrasena_cambiada()`, que la página llama cuando la persona guarda su
  contraseña nueva. **Solo puede apagar la marca de quien la llama**: no recibe parámetros y
  cambia únicamente la fila con el `id` de la sesión (`auth.uid()`).
- Para comprobarla: en **Table Editor → perfiles** aparece la columna nueva.

Cómo crear una cuenta con contraseña temporal: **Authentication → Users → Add user → Create
new user**, correo y contraseña temporal, con **Auto Confirm User** marcado. Después, en el
directorio, **Administración** → márcale sus áreas → **Guardar cambios**. Al entrar por primera
vez, el directorio le pedirá crear su propia contraseña. Desde el panel también se puede
**pedir el cambio de contraseña** otra vez.

### `migracion-003-areas-visibles.sql` (T-015)

Para que cada persona vea **en gris** las áreas que no tiene, con un botón para pedir acceso.

- Cambia una sola regla: cualquier persona con sesión puede leer las **áreas** de `espacios`
  (nombre, descripción, icono y proceso).
- **No cambia** lo demás: los **clientes** siguen exigiendo el área PMO, y los **enlaces**
  (`accesos`) de un área solo los recibe quien tiene permiso sobre ella. Sin sesión, nada.
- Para comprobarla: entra con un usuario que tenga una sola área. En el inicio deben verse
  todas las áreas, las demás en gris con "Sin acceso", y al abrir una gris no debe aparecer
  ningún enlace, solo el botón **Solicitar acceso**.

## Quién puede hacer qué

| Acción | Sin iniciar sesión | Usuario | Administrador |
|---|---:|---:|---:|
| Leer su propio perfil | No | Sí | Sí |
| Leer perfiles de otras personas | No | No | Sí |
| Cambiar perfiles | No | No | Sí |
| Leer sus propios permisos | No | Sí | Sí |
| Leer permisos de otras personas | No | No | Sí |
| Crear, cambiar o borrar permisos | No | No | Sí |
| Leer nombre y descripción de todas las áreas (desde la migración 003) | No | Sí | Sí |
| Leer clientes | No | Solo con el área PMO | Sí, todos |
| Leer accesos (enlaces) | No | Solo los de sus áreas | Sí, todos |
| Crear, cambiar o borrar áreas, clientes y accesos | No | No | Sí |
| Darse a sí mismo el nivel de administrador | No | No | No |
| Marcar su propia contraseña temporal como cambiada (`contrasena_cambiada()`) | No | Sí, solo la suya | Sí, solo la suya |
| Quitar o poner la marca de contraseña temporal a otra persona | No | No | Sí (panel de administración) |

Las herramientas generales no se guardan todavía en estas tablas: seguirán en el código
y serán visibles para cualquier persona que haya iniciado sesión, como define el proyecto.

## Comprobación pendiente

El archivo se revisa política por política antes de entregarlo. La prueba real con usuarios
de distinto nivel se hará en la Etapa 5 (T-011), usando el proyecto de Supabase y cuentas
creadas por Vincent. Este repositorio no contiene claves secretas ni contraseñas.
