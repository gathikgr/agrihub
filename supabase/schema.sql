create extension if not exists "pgcrypto";

create type public.user_role as enum ('farmer', 'buyer', 'transporter', 'storage_provider', 'admin');
create type public.approval_status as enum ('pending', 'approved', 'rejected');
create type public.order_status as enum ('created', 'paid', 'in_transit', 'delivered', 'cancelled');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role public.user_role not null,
  language text default 'en',
  approval_status public.approval_status default 'pending',
  created_at timestamptz default now()
);

create table public.farmer_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  farm_location text not null,
  acres numeric not null,
  soil_type text,
  irrigation_type text,
  created_at timestamptz default now()
);

create table public.buyer_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  company_name text not null,
  city text,
  created_at timestamptz default now()
);

create table public.crops (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  variety text,
  expected_harvest_date date,
  status text,
  area_acres numeric,
  created_at timestamptz default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  crop_id uuid not null references public.crops(id) on delete cascade,
  farmer_id uuid not null references public.users(id) on delete cascade,
  quantity_kg numeric not null,
  base_price numeric not null,
  location text,
  quality_video_url text,
  approval_status public.approval_status default 'pending',
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id),
  buyer_id uuid not null references public.users(id),
  amount numeric not null,
  status public.order_status default 'created',
  payment_ref text,
  escrow_released boolean default false,
  created_at timestamptz default now()
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid not null references public.users(id),
  category text not null,
  amount numeric not null,
  expense_date date not null,
  notes text,
  created_at timestamptz default now()
);

create table public.transporters (
  user_id uuid primary key references public.users(id) on delete cascade,
  vehicle_type text,
  capacity_kg numeric,
  operating_city text,
  active boolean default true
);

create table public.storage_providers (
  user_id uuid primary key references public.users(id) on delete cascade,
  warehouse_name text,
  capacity_kg numeric,
  occupied_kg numeric default 0,
  city text,
  approved boolean default false
);

create table public.price_history (
  id uuid primary key default gen_random_uuid(),
  crop_name text not null,
  mandi_name text not null,
  price numeric not null,
  recorded_on date not null
);

create table public.delivery_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id),
  transporter_id uuid references public.users(id),
  pickup_location text,
  drop_location text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table public.storage_bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id),
  storage_provider_id uuid references public.users(id),
  farmer_id uuid references public.users(id),
  quantity_kg numeric,
  status public.approval_status default 'pending',
  fee numeric,
  created_at timestamptz default now()
);
