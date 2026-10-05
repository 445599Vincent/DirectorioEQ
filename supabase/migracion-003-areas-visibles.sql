-- Directorio Ecco Qualitá — migración 003: áreas visibles para todos (T-015)
-- Se ejecuta DESPUÉS de esquema.sql y de la migración 002, una vez, desde el SQL Editor.
-- Es reejecutable: reemplaza una sola política.
--
-- Qué cambia: cualquier persona con sesión puede leer las filas de "espacios" que son
-- ÁREAS (nombre, descripción, icono, proceso), para que el directorio le muestre en gris
-- las áreas que no tiene, con la opción de pedir acceso.
--
-- Qué NO cambia:
-- - CLIENTES: siguen exigiendo el permiso del área PMO (privado.puede_ver(rol), y el rol de
--   todo cliente es 'pmo' por la restricción espacios_rol_valido de esquema.sql).
-- - ACCESOS (los enlaces): su política accesos_leer_por_rol no se toca. Sigue pidiendo
--   privado.puede_ver(espacios.rol) del área o cliente al que pertenece cada enlace, así que
--   los enlaces de un área solo los recibe quien tiene permiso sobre ella (o un administrador).
-- - Sin sesión: nada. La tabla no le da ningún privilegio al rol anon, la política es solo
--   "to authenticated" y además exige auth.uid() (igual que privado.puede_ver).
-- - Escribir sigue siendo solo de administradores.

begin;

drop policy if exists espacios_leer_por_rol on public.espacios;
create policy espacios_leer_por_rol
  on public.espacios for select
  to authenticated
  using (
    ((select auth.uid()) is not null and tipo = 'area')
    or (select privado.puede_ver(rol))
  );

commit;
