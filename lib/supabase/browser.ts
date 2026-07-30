import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates the browser Supabase client.
 *
 * The publishable key is safe to expose to the browser. Database access must
 * still be protected by Row Level Security policies.
 */
export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  if (!supabasePublishableKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing.",
    );
  }

  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
