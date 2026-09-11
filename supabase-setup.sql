-- Shad-Urofy Supabase setup
-- Run this in Supabase Dashboard -> SQL Editor.
-- Change the email below if your real admin email is different.

-- Public catalogue: anyone can read active products and categories.
create policy "Public can read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "Public can read active products"
on public.products for select
to anon, authenticated
using (is_active = true);

-- Admin writes: only the configured admin email can insert/update/delete.
create policy "Admin can insert products"
on public.products for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'admin@shadurofy.in');

create policy "Admin can update products"
on public.products for update
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@shadurofy.in')
with check ((auth.jwt() ->> 'email') = 'admin@shadurofy.in');

create policy "Admin can delete products"
on public.products for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@shadurofy.in');

-- Admin needs to see hidden products in the dashboard.
-- This policy grants SELECT on all products only to the admin.
create policy "Admin can read all products"
on public.products for select
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@shadurofy.in');

-- Recommended database constraints/indexes. Run only if they do not already exist.
create unique index if not exists products_slug_unique on public.products(slug);
create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(is_active);
