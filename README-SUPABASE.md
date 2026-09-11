# Shad-Urofy + Supabase

## 1. Create the admin account
In Supabase: Authentication -> Users -> Add user. Create the admin email/password you want to use.

The included SQL currently allows `admin@shadurofy.in` to write product data. If you use another email, change that email in `supabase-setup.sql` before running it.

## 2. Configure RLS
Open SQL Editor and run `supabase-setup.sql`. This is important because the browser uses the publishable/anon key. Do not put a service_role key in the website.

## 3. Tables expected
`categories`: id, created_at, name, slug, description

`products`: id, created_at, updated_at, category_id, name, slug, description, image_url, brand, model, specifications (jsonb), is_featured (bool), is_active (bool)

`products.category_id` should reference `categories.id`.

## 4. Frontend
The public Home and Products pages read directly from Supabase. The Admin Login uses Supabase Auth. The Admin Dashboard performs product CRUD against Supabase. No product data is stored in localStorage.

## 5. Deploy
Push the corrected files to the GitHub repository connected to Cloudflare Pages, or replace the files in your existing repository and push. Cloudflare Pages will deploy the new commit.
