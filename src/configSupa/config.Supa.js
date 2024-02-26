import { createClient } from "@supabase/supabase-js";

const supabase_Urls = "https://bzfwiihhxzlkzczmzkec.supabase.co";

const supabase_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZndpaWhoeHpsa3pjem16a2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMjU4NzUsImV4cCI6MjAyMTcwMTg3NX0.3T_pZQrVDrJZ_-E7w5cFSimABK7d0jCEjA_N0QLGBO4";

const supabase = createClient(supabase_Urls, supabase_KEY);

export { supabase };
