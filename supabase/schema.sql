-- Enums
create type city as enum ('TUNIS','ARIANA','BEN_AROUS');
create type surface_type as enum ('GRASS','ARTIFICIAL_TURF','CONCRETE','INDOOR');
create type reservation_status as enum ('PENDING','CONFIRMED','CANCELLED','COMPLETED');
create type user_role as enum ('USER','ADMIN');

-- Tables
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  role user_role not null default 'USER',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fields (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  city city not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  price_per_hour integer not null,
  capacity integer not null,
  surface_type surface_type not null,
  facilities text[] not null default '{}',
  images text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.fields (city);
create index on public.fields (price_per_hour);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  field_id uuid not null references public.fields(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  date date not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  total_price integer not null,
  status reservation_status not null default 'PENDING',
  weather_data jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.reservations (field_id, date);
create index on public.reservations (user_id, date);

create table if not exists public.field_availability (
  id uuid primary key default gen_random_uuid(),
  field_id uuid not null references public.fields(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  open_time text not null,
  close_time text not null
);
create index on public.field_availability (field_id, day_of_week);

create table if not exists public.weather_cache (
  id uuid primary key default gen_random_uuid(),
  city city not null,
  date date not null,
  weather_data jsonb not null,
  expires_at timestamptz not null,
  unique (city, date)
);
create index on public.weather_cache (expires_at);

-- RLS Policies
alter table public.users enable row level security;
alter table public.fields enable row level security;
alter table public.reservations enable row level security;
alter table public.field_availability enable row level security;
alter table public.weather_cache enable row level security;

-- Public reads for fields and availability
create policy "Public read fields" on public.fields
  for select using (true);
create policy "Public read availability" on public.field_availability
  for select using (true);

-- Users: self read/update
create policy "Users can read self" on public.users
  for select using (auth.uid() = id);
create policy "Users can update self" on public.users
  for update using (auth.uid() = id);

-- Reservations: users can read own and create for self
create policy "Users read own reservations" on public.reservations
  for select using (auth.uid() = user_id);
create policy "Users create own reservations" on public.reservations
  for insert with check (auth.uid() = user_id);
create policy "Users update/cancel own reservations" on public.reservations
  for update using (auth.uid() = user_id);

-- Admin helper (optional): create a role claim check
-- You can set a JWT claim "role" via Supabase auth hooks to 'ADMIN'.
create or replace function is_admin() returns boolean language sql stable as $$
  select coalesce((auth.jwt() ->> 'role') = 'ADMIN', false);
$$;

create policy "Admins can manage fields" on public.fields
  for all using (is_admin());
create policy "Admins can manage availability" on public.field_availability
  for all using (is_admin());
create policy "Admins can read reservations" on public.reservations
  for select using (is_admin());

-- Triggers to update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_users_updated on public.users;
create trigger trg_users_updated before update on public.users
for each row execute function set_updated_at();

drop trigger if exists trg_fields_updated on public.fields;
create trigger trg_fields_updated before update on public.fields
for each row execute function set_updated_at();

drop trigger if exists trg_reservations_updated on public.reservations;
create trigger trg_reservations_updated before update on public.reservations
for each row execute function set_updated_at();


