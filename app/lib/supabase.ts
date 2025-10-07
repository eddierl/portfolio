import { createClient } from "@supabase/supabase-js";

export const supabase = (() => {
  if (
    !(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  ) {
    throw new Error("Can't connect to db");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );
})();
