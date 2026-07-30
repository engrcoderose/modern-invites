/**
 * @deprecated Import createSupabaseAdminClient from "@/lib/supabase/admin"
 * for privileged server-only operations. For authenticated dashboard requests,
 * import createSupabaseServerClient from "@/lib/supabase/server".
 */
export {
  createSupabaseAdminClient,
  createSupabaseAdminClient as createSupabaseServerClient,
} from "./supabase/admin";
