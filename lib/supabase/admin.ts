import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Creates a privileged Supabase client for trusted server-side operations.
 *
 * This client bypasses Row Level Security. Use it only after performing the
 * required authorization checks in server-only code. Never import this module
 * into a Client Component.
 */
export function createSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!supabaseSecretKey) {
    throw new Error("SUPABASE_SECRET_KEY is missing.");
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
