# Shad-Urofy Demo Website

A static HTML/CSS/JavaScript product catalogue with a demo admin panel.

## Run locally

Open `index.html` in a browser.

Admin:
- URL: `admin/login.html`
- Email: `admin@shadurofy.in`
- Password: `admin123`

## Important

This version is intentionally a TEST/DEMO implementation.

- Product data is stored in browser `localStorage`.
- The admin login is only a client-side demo and is NOT secure for production.
- Product images are represented by initials for now.
- No payment, checkout or order system is included.

## Production upgrade

The next version should replace localStorage and the demo login with:
- Supabase PostgreSQL for products
- Supabase Auth for admin authentication
- Supabase Storage for product images
- Row Level Security (RLS) policies
- Cloudflare Pages for free static hosting
- `shadurofy.in` as the custom domain
