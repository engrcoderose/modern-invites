"use server";

import { z } from "zod";

import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { createClientAccess } from "@/features/clients/application/create-client-access";
import {
  ClientProvisioningError,
  type ClientEventRole,
} from "@/features/clients/domain/client";
import { generateClientAccessCode } from "@/features/clients/infrastructure/access-code-generator";
import { createSupabaseClientProvisioningRepository } from "@/features/clients/infrastructure/supabase-client-provisioning-repository";
import type { CreateClientFormState } from "@/features/clients/presentation/create-client-form.types";

const createClientSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Enter the client or couple name.")
    .max(150, "The client name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "The email address is too long."),
  eventId: z.coerce
    .number()
    .int()
    .positive("Select an event."),
  role: z.enum(["owner", "editor", "viewer"]),
});

export async function createClientAction(
  _previousState: CreateClientFormState,
  formData: FormData,
): Promise<CreateClientFormState> {
  const parsed = createClientSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    eventId: formData.get("eventId"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const authRepository =
      await createSupabaseAdminAuthRepository();
    const access = await getAdminAccess(authRepository);

    if (access.status !== "authorized") {
      return {
        status: "error",
        message:
          "Your administrator session has expired. Sign in again.",
      };
    }

    const repository =
      createSupabaseClientProvisioningRepository();
    const createdAccess = await createClientAccess(
      repository,
      generateClientAccessCode,
      {
        displayName: parsed.data.displayName,
        email: parsed.data.email.toLowerCase(),
        eventId: parsed.data.eventId,
        role: parsed.data.role as ClientEventRole,
      },
    );

    return {
      status: "success",
      message: "Client access was created successfully.",
      createdAccess: {
        displayName: createdAccess.displayName,
        email: createdAccess.email,
        eventId: createdAccess.eventId,
        role: createdAccess.role,
        accessCode: createdAccess.accessCode,
      },
    };
  } catch (error) {
    if (error instanceof ClientProvisioningError) {
      return {
        status: "error",
        message:
          error.code === "email_already_registered"
            ? "That email address is already registered."
            : error.code === "event_not_found"
              ? "The selected event no longer exists."
              : "Client access could not be created. Please try again.",
      };
    }

    console.error("Unexpected client provisioning failure:", error);

    return {
      status: "error",
      message: "Client access could not be created. Please try again.",
    };
  }
}
