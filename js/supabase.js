const SUPABASE_URL = "https://hssoevqeuxchsnxeitda.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RU_HyJVu-wskhLdfOGU0Ow_XKK2OOPq";

// The publishable/anon key is safe to use in browser code when RLS policies
// are configured correctly in Supabase. Never put a service_role key here.
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
