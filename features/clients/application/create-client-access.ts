import type {
  CreateClientAccessCommand,
  ProvisionedClientAccess,
} from "../domain/client";
import type { ClientProvisioningRepository } from "../domain/client-provisioning-repository";

export type AccessCodeGenerator = () => string;

export async function createClientAccess(
  repository: ClientProvisioningRepository,
  generateAccessCode: AccessCodeGenerator,
  command: CreateClientAccessCommand,
): Promise<ProvisionedClientAccess> {
  const accessCode = generateAccessCode();
  let userId: string | null = null;

  try {
    userId = await repository.createClientIdentity({
      displayName: command.displayName,
      email: command.email,
      accessCode,
    });

    await repository.createClientProfile({
      userId,
      displayName: command.displayName,
      accessCodeLastFour: accessCode.slice(-4),
    });

    await repository.assignClientToEvent({
      userId,
      eventId: command.eventId,
      role: command.role,
    });
  } catch (error) {
    if (userId) {
      await repository.deleteClientIdentity(userId).catch(() => undefined);
    }

    throw error;
  }

  return {
    userId,
    displayName: command.displayName,
    email: command.email,
    eventId: command.eventId,
    role: command.role,
    accessCode,
  };
}
