"use server";

import { redirect } from "next/navigation";

import { signOutAdmin } from "@/features/auth/application/sign-out-admin";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";

export async function logoutAdminAction(): Promise<void> {
  const repository = await createSupabaseAdminAuthRepository();
  await signOutAdmin(repository);
  redirect("/admin/login");
}
