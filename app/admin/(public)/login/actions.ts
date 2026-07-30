"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signInAdmin } from "@/features/auth/application/sign-in-admin";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import type { AdminLoginFormState } from "@/features/auth/presentation/admin-login-form.types";

const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "The email address is too long."),
  password: z
    .string()
    .min(6, "Enter your administrator password.")
    .max(128, "The password is too long."),
});

export async function loginAdminAction(
  _previousState: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let result;

  try {
    const repository = await createSupabaseAdminAuthRepository();
    result = await signInAdmin(repository, {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
    });
  } catch (error) {
    console.error("Administrator sign-in failed unexpectedly:", error);

    return {
      status: "error",
      message: "Sign-in is temporarily unavailable. Please try again.",
    };
  }

  if (result.status === "authorized") {
    redirect("/admin");
  }

  return {
    status: "error",
    message:
      result.status === "forbidden"
        ? "This account is not authorized for administrator access."
        : "The email address or password is incorrect.",
  };
}
