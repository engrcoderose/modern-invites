"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signInClient } from "@/features/auth/application/sign-in-client";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import type { ClientLoginFormState } from "@/features/auth/presentation/client-login-form.types";

const clientLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "The email address is too long."),
  accessCode: z
    .string()
    .trim()
    .min(6, "Enter the access code provided to you.")
    .max(128, "The access code is too long."),
});

export async function loginClientAction(
  _previousState: ClientLoginFormState,
  formData: FormData,
): Promise<ClientLoginFormState> {
  const parsed = clientLoginSchema.safeParse({
    email: formData.get("email"),
    accessCode: formData.get("accessCode"),
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
    const repository = await createSupabaseClientAuthRepository();
    result = await signInClient(repository, {
      email: parsed.data.email.toLowerCase(),
      accessCode: parsed.data.accessCode,
    });
  } catch (error) {
    console.error("Client sign-in failed unexpectedly:", error);

    return {
      status: "error",
      message: "Sign-in is temporarily unavailable. Please try again.",
    };
  }

  if (result.status === "authorized") {
    redirect("/dashboard");
  }

  return {
    status: "error",
    message:
      "The email address or access code is incorrect, or access is no longer active.",
  };
}
