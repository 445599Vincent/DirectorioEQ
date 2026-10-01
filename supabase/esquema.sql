-- Directorio Ecco Qualitá — esquema y seguridad de Supabase
-- PostgreSQL 15+ / Supabase
-- Este archivo es reejecutable: usa creaciones condicionales y reemplaza sus políticas.

begin;

create schema if not exists privado;
revoke all on schema privado from public, anon, authenticated;
grant usage on schema privado to authenticated;

create table if not exists public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  correo text not null,
  nombre text not null default '',
  es_admin boolean not null default false,
  creado_en timestamptz not null default now()
);

create table if not exists public.permisos (
  usuario_id uuid not null references public.perfiles (id) on delete cascade,
  area_id text not null check (btrim(area_id) <> ''),
  primary key (usuario_id, area_id)
);

create table if not exists public.espacios (
  id text primary key check (btrim(id) <> ''),
  tipo text not null,
  nombre text not null check (btrim(nombre) <> ''),
  descripcion text not null default '',
  icono text not null check (btrim(icono) <> ''),
  proceso text,
  estado text,
  logo text,
  proyectos_de_clientes boolean not null default false,
  orden integer not null default 0 check (orden >= 0),
  rol text not null check (btrim(rol) <> ''),
  constraint espacios_tipo_valido
    check (tipo in ('area', 'cliente')),
  constraint espacios_estado_valido
    check (
      (tipo = 'area' and estado is null)
      or (tipo = 'cliente' and estado in ('activo', 'cerrado'))
    ),
  constraint espacios_proceso_valido
    check (
      (tipo = 'area' and proceso in ('estrategico', 'operativo', 'soporte'))
      or (tipo = 'cliente' and proceso is null)
    ),
  constraint espacios_rol_valido
    check (
      (tipo = 'area' and rol = id)
      or (tipo = 'cliente' and rol = 'pmo')
    ),
  constraint espacios_proyectos_clientes_valido
    check (
      not proyectos_de_clientes
      or (tipo = 'area' and id = 'pmo')
    )
);

create table if not exists public.accesos (
  id uuid primary key default gen_random_uuid(),
  espacio_id text not null references public.espacios (id) on delete cascade,
  grupo text not null check (btrim(grupo) <> ''),
  orden_grupo integer not null default 0 check (orden_grupo >= 0),
  nombre text not null check (btrim(nombre) <> ''),
  descripcion text not null default '',
  url text not null default '',
  icono text not null check (btrim(icono) <> ''),
  orden integer not null default 0 check (orden >= 0)
);

create index if not exists permisos_area_id_idx
  on public.permisos (area_id);
create index if not exists espacios_rol_idx
  on public.espacios (rol);
create index if not exists accesos_espacio_orden_idx
  on public.accesos (espacio_id, orden_grupo, orden);

-- Estas funciones leen las tablas como su propietario para evitar recursión de RLS.
-- El search_path vacío obliga a calificar cada objeto y evita sustituciones maliciosas.
create or replace function privado.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.perfiles
    where id = (select auth.uid())
      and es_admin = true
  );
$$;

create or replace function privado.puede_ver(rol_solicitado text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and (
      (select privado.es_admin())
      or exists (
        select 1
        from public.permisos
        where usuario_id = (select auth.uid())
          and area_id = rol_solicitado
      )
    );
$$;

-- Crea el perfil de cada usuario nuevo siempre como no administrador.
create or replace function privado.crear_perfil_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, correo, nombre, es_admin, creado_en)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'nombre', ''),
    false,
    coalesce(new.created_at, now())
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function privado.crear_perfil_usuario();

-- Si ya había usuarios antes de instalar el esquema, crea sus perfiles sin
-- sobrescribir perfiles existentes ni cambiar el valor de es_admin.
insert into public.perfiles (id, correo, nombre, es_admin, creado_en)
select
  id,
  coalesce(email, ''),
  coalesce(raw_user_meta_data ->> 'nombre', ''),
  false,
  coalesce(created_at, now())
from auth.users
on conflict (id) do nothing;

-- Bloquea el autoascenso incluso si otra política se cambia por error después.
create or replace function privado.impedir_autoascenso()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'No se puede cambiar el identificador del perfil.';
  end if;

  if new.id = (select auth.uid())
     and old.es_admin = false
     and new.es_admin = true then
    raise exception 'Una persona no puede hacerse administradora a sí misma.';
  end if;

  return new;
end;
$$;

drop trigger if exists impedir_autoascenso on public.perfiles;
create trigger impedir_autoascenso
  before update on public.perfiles
  for each row execute function privado.impedir_autoascenso();

revoke all on function privado.es_admin() from public, anon;
revoke all on function privado.puede_ver(text) from public, anon;
revoke all on function privado.crear_perfil_usuario() from public, anon, authenticated;
revoke all on function privado.impedir_autoascenso() from public, anon, authenticated;
grant execute on function privado.es_admin() to authenticated;
grant execute on function privado.puede_ver(text) to authenticated;

alter table public.perfiles enable row level security;
alter table public.permisos enable row level security;
alter table public.espacios enable row level security;
alter table public.accesos enable row level security;

-- Ninguna tabla concede privilegios al rol anónimo. RLS queda como segunda barrera.
revoke all on table public.perfiles, public.permisos, public.espacios, public.accesos
  from public, anon, authenticated;

grant select, update on table public.perfiles to authenticated;
grant select, insert, update, delete on table public.permisos to authenticated;
grant select, insert, update, delete on table public.espacios to authenticated;
grant select, insert, update, delete on table public.accesos to authenticated;

-- Perfiles: cada persona ve el suyo; administradores ven y actualizan todos.
drop policy if exists perfiles_leer on public.perfiles;
create policy perfiles_leer
  on public.perfiles for select
  to authenticated
  using (
    id = (select auth.uid())
    or (select privado.es_admin())
  );

drop policy if exists perfiles_actualizar_admin on public.perfiles;
create policy perfiles_actualizar_admin
  on public.perfiles for update
  to authenticated
  using ((select privado.es_admin()))
  with check ((select privado.es_admin()));

-- Permisos: cada persona ve los suyos; administradores gestionan todos.
drop policy if exists permisos_leer on public.permisos;
create policy permisos_leer
  on public.permisos for select
  to authenticated
  using (
    usuario_id = (select auth.uid())
    or (select privado.es_admin())
  );

drop policy if exists permisos_crear_admin on public.permisos;
create policy permisos_crear_admin
  on public.permisos for insert
  to authenticated
  with check ((select privado.es_admin()));

drop policy if exists permisos_actualizar_admin on public.permisos;
create policy permisos_actualizar_admin
  on public.permisos for update
  to authenticated
  using ((select privado.es_admin()))
  with check ((select privado.es_admin()));

drop policy if exists permisos_borrar_admin on public.permisos;
create policy permisos_borrar_admin
  on public.permisos for delete
  to authenticated
  using ((select privado.es_admin()));

-- Espacios: se leen por rol; solo administradores cambian contenido.
drop policy if exists espacios_leer_por_rol on public.espacios;
create policy espacios_leer_por_rol
  on public.espacios for select
  to authenticated
  using ((select privado.puede_ver(rol)));

drop policy if exists espacios_crear_admin on public.espacios;
create policy espacios_crear_admin
  on public.espacios for insert
  to authenticated
  with check ((select privado.es_admin()));

drop policy if exists espacios_actualizar_admin on public.espacios;
create policy espacios_actualizar_admin
  on public.espacios for update
  to authenticated
  using ((select privado.es_admin()))
  with check ((select privado.es_admin()));

drop policy if exists espacios_borrar_admin on public.espacios;
create policy espacios_borrar_admin
  on public.espacios for delete
  to authenticated
  using ((select privado.es_admin()));

-- Accesos: heredan el rol de su área o cliente; solo administradores escriben.
drop policy if exists accesos_leer_por_rol on public.accesos;
create policy accesos_leer_por_rol
  on public.accesos for select
  to authenticated
  using (
    exists (
      select 1
      from public.espacios
      where espacios.id = accesos.espacio_id
        and (select privado.puede_ver(espacios.rol))
    )
  );

drop policy if exists accesos_crear_admin on public.accesos;
create policy accesos_crear_admin
  on public.accesos for insert
  to authenticated
  with check ((select privado.es_admin()));

drop policy if exists accesos_actualizar_admin on public.accesos;
create policy accesos_actualizar_admin
  on public.accesos for update
  to authenticated
  using ((select privado.es_admin()))
  with check ((select privado.es_admin()));

drop policy if exists accesos_borrar_admin on public.accesos;
create policy accesos_borrar_admin
  on public.accesos for delete
  to authenticated
  using ((select privado.es_admin()));

commit;

-- PASO ÚNICO DESPUÉS DE CREAR EL USUARIO DE VINCENT:
-- Cambia el texto por su correo real, quita los dos guiones de las líneas y ejecuta
-- solamente esta instrucción una vez desde el SQL Editor de Supabase.
-- update public.perfiles
-- set es_admin = true
-- where correo = 'CAMBIAR_POR_EL_CORREO_REAL';
