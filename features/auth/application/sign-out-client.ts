import type { ClientAuthRepository } from "../domain/client-auth-repository";

export async function signOutClient(repository: ClientAuthRepository) {
  await repository.signOut();
}
