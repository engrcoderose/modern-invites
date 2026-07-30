import type { AdminAuthRepository } from "../domain/admin-auth-repository";

export async function signOutAdmin(repository: AdminAuthRepository) {
  await repository.signOut();
}
