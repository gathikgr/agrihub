alter table public.users enable row level security;
alter table public.farmer_profiles enable row level security;
alter table public.buyer_profiles enable row level security;
alter table public.crops enable row level security;
alter table public.listings enable row level security;
alter table public.orders enable row level security;
alter table public.expenses enable row level security;
alter table public.transporters enable row level security;
alter table public.storage_providers enable row level security;
alter table public.price_history enable row level security;
alter table public.delivery_requests enable row level security;
alter table public.storage_bookings enable row level security;

create function public.current_role() returns public.user_role language sql stable as $$
  select role from public.users where id = auth.uid()
$$;

create policy "users self read" on public.users for select using (id = auth.uid() or public.current_role() = 'admin');
create policy "users self update" on public.users for update using (id = auth.uid() or public.current_role() = 'admin');

create policy "farmers own profile" on public.farmer_profiles for all using (user_id = auth.uid() or public.current_role() = 'admin');
create policy "buyers own profile" on public.buyer_profiles for all using (user_id = auth.uid() or public.current_role() = 'admin');
create policy "crops farmer access" on public.crops for all using (farmer_id = auth.uid() or public.current_role() = 'admin');
create policy "expenses farmer access" on public.expenses for all using (farmer_id = auth.uid() or public.current_role() = 'admin');

create policy "approved listings visible" on public.listings for select using (approval_status = 'approved' or farmer_id = auth.uid() or public.current_role() = 'admin');
create policy "farmers manage listings" on public.listings for all using (farmer_id = auth.uid() or public.current_role() = 'admin');

create policy "buyers and admin view orders" on public.orders for select using (buyer_id = auth.uid() or public.current_role() = 'admin');
create policy "buyers create orders" on public.orders for insert with check (buyer_id = auth.uid() and public.current_role() = 'buyer');
create policy "admin manage orders" on public.orders for update using (public.current_role() = 'admin');

create policy "transporter self" on public.transporters for all using (user_id = auth.uid() or public.current_role() = 'admin');
create policy "storage self" on public.storage_providers for all using (user_id = auth.uid() or public.current_role() = 'admin');

create policy "price history read all" on public.price_history for select using (true);
create policy "admin write price history" on public.price_history for all using (public.current_role() = 'admin');

create policy "delivery access" on public.delivery_requests for all using (
  transporter_id = auth.uid() or public.current_role() = 'admin'
);

create policy "storage booking access" on public.storage_bookings for all using (
  farmer_id = auth.uid() or storage_provider_id = auth.uid() or public.current_role() = 'admin'
);
