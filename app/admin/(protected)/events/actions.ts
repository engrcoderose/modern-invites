"use server";

import { revalidatePath } from "next/cache";
import { getAdminAccess } from "@/features/auth/application/get-admin-access";
import { createSupabaseAdminAuthRepository } from "@/features/auth/infrastructure/supabase-admin-auth-repository";
import { updateAdminEvent } from "@/features/clients/application/update-admin-event";
import { createSupabaseEventManagementRepository } from "@/features/clients/infrastructure/supabase-event-management-repository";
import type { EventSettingsState } from "@/features/clients/domain/event-management";

export async function updateEventSettingsAction(_previous: EventSettingsState, formData: FormData): Promise<EventSettingsState> {
  const result = await updateAdminEvent({
    async isAdministrator() {
      return (await getAdminAccess(await createSupabaseAdminAuthRepository())).status === "authorized";
    },
    updateEvent: input => createSupabaseEventManagementRepository().updateEvent(input),
  }, formData);
  if (result.status === "success" && result.updatedEvent) {
    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${result.updatedEvent.id}`);
    revalidatePath("/admin/clients");
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/events/${result.updatedEvent.id}`);
  }
  return result;
}
