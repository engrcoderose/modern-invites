import type { ClientProvisioningRepository } from "../domain/client-provisioning-repository";

export async function listActiveClientEvents(
  repository: ClientProvisioningRepository,
) {
  return repository.listActiveEvents();
}
