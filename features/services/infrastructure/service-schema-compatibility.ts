import { ClientServicesSetupError, type ClientServices } from "../domain/client-services.ts";

interface DatabaseError {
  code: string;
  message: string;
}

// Only the new events column may use the legacy schema. Permission, network,
// and unrelated schema failures must retain their normal error handling.
export function isMissingClientServicesColumn(error: DatabaseError | null) {
  if (!error || !["42703", "PGRST204"].includes(error.code)) return false;
  return /\bclient_services\b/i.test(error.message)
    && /does not exist|could not find/i.test(error.message);
}

export async function readWithServiceCompatibility<T extends { error: DatabaseError | null }>(
  read: (includeServices: boolean) => PromiseLike<T>,
): Promise<T & { servicesAvailable: boolean }> {
  const result = await read(true);
  if (!isMissingClientServicesColumn(result.error)) return { ...result, servicesAvailable: true };
  return { ...await read(false), servicesAvailable: false };
}

// Probe before any mutation, so there is never a retry of an ambiguous write.
export async function serviceColumnsForWrite(
  service: ClientServices,
  probe: () => PromiseLike<{ error: DatabaseError | null }>,
) {
  const { error } = await probe();
  if (!error) return { client_services: service };
  if (!isMissingClientServicesColumn(error)) throw new Error("Unable to verify client services.");
  if (service !== "rsvp") throw new ClientServicesSetupError();
  return {};
}

export function isMissingSeatingFunction(error: DatabaseError | null, name: string) {
  return !!error && ["42883", "PGRST202"].includes(error.code)
    && error.message.includes(`public.${name}`)
    && /does not exist|could not find/i.test(error.message);
}
