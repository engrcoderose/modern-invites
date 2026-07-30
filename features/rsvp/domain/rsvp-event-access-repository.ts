import type { RsvpEventAccessConfiguration } from "./rsvp-event-access";

export interface RsvpEventAccessRepository {
  findBySlug(
    slug: string,
  ): Promise<RsvpEventAccessConfiguration | null>;
  verifySharedCode(
    slug: string,
    code: string,
  ): Promise<RsvpEventAccessConfiguration | null>;
}
