"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getClientAccess } from "@/features/auth/application/get-client-access";
import { signOutClient } from "@/features/auth/application/sign-out-client";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import {
  createDashboardGuest,
  deleteDashboardGuest,
  updateDashboardGuest,
} from "@/features/dashboard/application/manage-dashboard-guests";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import type { GuestMutationState } from "@/features/dashboard/presentation/guest-mutation.types";

export async function logoutClientAction(): Promise<void> {
  const repository = await createSupabaseClientAuthRepository();
  await signOutClient(repository);
  redirect("/client-login");
}

const eventIdSchema = z.coerce.number().int().positive();
const guestIdSchema = z.coerce.number().int().positive();
const guestTypeSchema = z.enum(["adult", "child"]);
const attendanceStatusSchema = z.enum([
  "pending",
  "attending",
  "declined",
]);

const optionalNotesSchema = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() !== ""
      ? value.trim()
      : null,
  z.string().max(500, "Dietary notes are too long.").nullable(),
);

const createGuestSchema = z.object({
  eventId: eventIdSchema,
  invitationId: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() !== ""
        ? value
        : null,
    z.coerce.number().int().positive().nullable(),
  ),
  householdName: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() !== ""
        ? value.trim()
        : null,
    z
      .string()
      .max(120, "The household name is too long.")
      .nullable(),
  ),
  fullName: z
    .string()
    .trim()
    .min(1, "Enter the guest's name.")
    .max(120, "The guest name is too long."),
  guestType: guestTypeSchema,
  dietaryRestrictions: optionalNotesSchema,
}).superRefine((value, context) => {
  if (!value.invitationId && !value.householdName) {
    context.addIssue({
      code: "custom",
      path: ["householdName"],
      message: "Enter a name for the new household.",
    });
  }
});

const updateGuestSchema = z.object({
  eventId: eventIdSchema,
  guestId: guestIdSchema,
  fullName: z
    .string()
    .trim()
    .min(1, "Enter the guest's name.")
    .max(120, "The guest name is too long."),
  guestType: guestTypeSchema,
  attendanceStatus: attendanceStatusSchema,
  dietaryRestrictions: optionalNotesSchema,
});

const deleteGuestSchema = z.object({
  eventId: eventIdSchema,
  guestId: guestIdSchema,
});

async function getAuthorizedClientContext() {
  const authRepository = await createSupabaseClientAuthRepository();
  const access = await getClientAccess(authRepository);

  if (access.status !== "authorized") {
    return null;
  }

  return {
    userId: access.principal.userId,
    dashboardRepository:
      await createSupabaseClientDashboardRepository(),
  };
}

function invalidFormState(message: string): GuestMutationState {
  return {
    status: "error",
    message,
  };
}

export async function createGuestAction(
  _previousState: GuestMutationState,
  formData: FormData,
): Promise<GuestMutationState> {
  const parsed = createGuestSchema.safeParse({
    eventId: formData.get("eventId"),
    invitationId: formData.get("invitationId"),
    householdName: formData.get("householdName"),
    fullName: formData.get("fullName"),
    guestType: formData.get("guestType"),
    dietaryRestrictions: formData.get("dietaryRestrictions"),
  });

  if (!parsed.success) {
    return invalidFormState(
      parsed.error.issues[0]?.message ??
        "Review the guest information and try again.",
    );
  }

  try {
    const context = await getAuthorizedClientContext();

    if (!context) {
      return invalidFormState("Your session has expired. Sign in again.");
    }

    await createDashboardGuest(
      context.dashboardRepository,
      context.userId,
      parsed.data,
    );
    revalidatePath(`/dashboard/events/${parsed.data.eventId}`);

    return {
      status: "success",
      message: "Guest added successfully.",
    };
  } catch (error) {
    console.error("Dashboard guest creation failed:", error);
    return invalidFormState(
      "The guest could not be added. Check your permission and try again.",
    );
  }
}

export async function updateGuestAction(
  _previousState: GuestMutationState,
  formData: FormData,
): Promise<GuestMutationState> {
  const parsed = updateGuestSchema.safeParse({
    eventId: formData.get("eventId"),
    guestId: formData.get("guestId"),
    fullName: formData.get("fullName"),
    guestType: formData.get("guestType"),
    attendanceStatus: formData.get("attendanceStatus"),
    dietaryRestrictions: formData.get("dietaryRestrictions"),
  });

  if (!parsed.success) {
    return invalidFormState(
      parsed.error.issues[0]?.message ??
        "Review the guest information and try again.",
    );
  }

  try {
    const context = await getAuthorizedClientContext();

    if (!context) {
      return invalidFormState("Your session has expired. Sign in again.");
    }

    await updateDashboardGuest(
      context.dashboardRepository,
      context.userId,
      parsed.data,
    );
    revalidatePath(`/dashboard/events/${parsed.data.eventId}`);

    return {
      status: "success",
      message: "Guest updated successfully.",
    };
  } catch (error) {
    console.error("Dashboard guest update failed:", error);
    return invalidFormState(
      "The guest could not be updated. Check your permission and try again.",
    );
  }
}

export async function deleteGuestAction(
  _previousState: GuestMutationState,
  formData: FormData,
): Promise<GuestMutationState> {
  const parsed = deleteGuestSchema.safeParse({
    eventId: formData.get("eventId"),
    guestId: formData.get("guestId"),
  });

  if (!parsed.success) {
    return invalidFormState("The guest information is invalid.");
  }

  try {
    const context = await getAuthorizedClientContext();

    if (!context) {
      return invalidFormState("Your session has expired. Sign in again.");
    }

    await deleteDashboardGuest(
      context.dashboardRepository,
      context.userId,
      parsed.data.eventId,
      parsed.data.guestId,
    );
    revalidatePath(`/dashboard/events/${parsed.data.eventId}`);

    return {
      status: "success",
      message: "Guest removed successfully.",
    };
  } catch (error) {
    console.error("Dashboard guest deletion failed:", error);
    return invalidFormState(
      "The guest could not be removed. Check your permission and try again.",
    );
  }
}
