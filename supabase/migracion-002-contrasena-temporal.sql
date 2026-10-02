-- Directorio Ecco Qualitá — migración 002: contraseña temporal (T-014)
-- Se ejecuta DESPUÉS de esquema.sql, una vez, desde el SQL Editor de Supabase.
-- Es reejecutable: si la columna ya existe no cambia ninguna marca.
--
-- Qué hace:
-- 1. Agrega perfiles.debe_cambiar_contrasena. Los usuarios nuevos empiezan en true:
--    quien entra con la contraseña temporal que le dio el administrador debe crear una propia.
--    Al agregarla por primera vez, los perfiles que ya existen quedan así: usuarios normales
--    en true (deben cambiarla) y administradores en false.
-- 2. Crea public.contrasena_cambiada(): la página la llama después de que la persona guarda
--    su contraseña nueva. Solo pone en false la fila de quien la llama.
-- El administrador puede volver a poner la marca en true desde el panel: la política
-- perfiles_actualizar_admin de esquema.sql ya se lo permite (y solo a él).

begin;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'perfiles'
      and column_name = 'debe_cambiar_contrasena'
  ) then
    alter table public.perfiles
      add column debe_cambiar_contrasena boolean not null default true;
    -- Los perfiles existentes recibieron true; los administradores no deben cambiarla.
    update public.perfiles
    set debe_cambiar_contrasena = false
    where es_admin;
  end if;
end;
$$;

-- No recibe parámetros: no hay forma de indicarle otra persona. Solo cambia la fila cuyo
-- id es el del usuario con sesión (auth.uid()) y solo esa columna. Sin sesión, auth.uid()
-- es null y no cambia nada. Es security definer porque los usuarios normales no tienen
-- permiso de actualizar perfiles (RLS); el search_path vacío evita sustituciones maliciosas.
create or replace function public.contrasena_cambiada()
returns void
language sql
volatile
security definer
set search_path = ''
as $$
  update public.perfiles
  set debe_cambiar_contrasena = false
  where id = (select auth.uid());
$$;

revoke all on function public.contrasena_cambiada() from public, anon;
grant execute on function public.contrasena_cambiada() to authenticated;

commit;
