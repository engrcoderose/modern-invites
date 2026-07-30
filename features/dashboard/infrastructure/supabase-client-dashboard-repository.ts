import "server-only";

import type {
  AssignedDashboardEvent,
  ClientEventWorkspace,
  DashboardAttendanceStatus,
  DashboardEventRole,
  DashboardGuest,
  DashboardGuestPage,
  DashboardGuestQuery,
  DashboardHousehold,
} from "@/features/dashboard/domain/client-dashboard";
import type { ClientDashboardRepository } from "@/features/dashboard/domain/client-dashboard-repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface EventMembershipRow {
  event_id: number;
  role: DashboardEventRole;
}

interface EventRow {
  id: number;
  name: string;
  slug: string;
  rsvp_deadline: string | null;
}

interface InvitationRelation {
  id: number;
  event_id: number;
  household_name: string;
  max_attendees: number;
}

interface GuestRow {
  id: number;
  invitation_id: number;
  full_name: string;
  guest_type: "adult" | "child";
  attendance_status: DashboardAttendanceStatus;
  dietary_restrictions: string | null;
  rsvp_email: string | null;
  rsvp_phone: string | null;
  rsvp_message: string | null;
  responded_at: string | null;
  invitations: InvitationRelation | InvitationRelation[];
}

interface RsvpRow {
  invitation_id: number;
  email: string | null;
  phone: string | null;
  message: string | null;
  submitted_at: string;
  updated_at: string;
}

interface EventAccessModeRow {
  rsvp_access_mode: "shared_code" | "name_search";
}

interface HouseholdRow {
  id: number;
  household_name: string;
  max_attendees: number;
  guests:
    | {
        count: number;
      }[]
    | {
        count: number;
      };
}

function getInvitation(
  relation: InvitationRelation | InvitationRelation[],
) {
  return Array.isArray(relation) ? relation[0] : relation;
}

export async function createSupabaseClientDashboardRepository(): Promise<ClientDashboardRepository> {
  const supabase = await createSupabaseServerClient();

  async function getEventRole(
    userId: string,
    eventId: number,
  ): Promise<DashboardEventRole | null> {
    const { data, error } = await supabase
      .from("event_members")
      .select("role")
      .eq("user_id", userId)
      .eq("event_id", eventId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to verify event access.");
    }

    return (data?.role as DashboardEventRole | undefined) ?? null;
  }

  async function listAssignedEvents(
    userId: string,
  ): Promise<AssignedDashboardEvent[]> {
    const { data: membershipData, error: membershipError } =
      await supabase
        .from("event_members")
        .select("event_id, role")
        .eq("user_id", userId);

    if (membershipError) {
      throw new Error("Unable to load client event memberships.");
    }

    const memberships = (membershipData ?? []) as EventMembershipRow[];

    if (memberships.length === 0) {
      return [];
    }

    const roleByEventId = new Map(
      memberships.map((membership) => [
        membership.event_id,
        membership.role,
      ]),
    );

    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("id, name, slug, rsvp_deadline")
      .in("id", [...roleByEventId.keys()])
      .eq("is_active", true)
      .order("name");

    if (eventError) {
      throw new Error("Unable to load assigned events.");
    }

    return ((eventData ?? []) as EventRow[])
      .map((event): AssignedDashboardEvent | null => {
        const role = roleByEventId.get(event.id);

        if (!role) {
          return null;
        }

        return {
          id: event.id,
          name: event.name,
          slug: event.slug,
          rsvpDeadline: event.rsvp_deadline,
          role,
        };
      })
      .filter(
        (event): event is AssignedDashboardEvent => event !== null,
      );
  }

  async function countGuests(
    eventId: number,
    attendanceStatus?: DashboardAttendanceStatus,
  ) {
    let query = supabase
      .from("guests")
      .select("id, invitations!inner(event_id)", {
        count: "exact",
        head: true,
      })
      .eq("invitations.event_id", eventId);

    if (attendanceStatus) {
      query = query.eq("attendance_status", attendanceStatus);
    }

    const { count, error } = await query;

    if (error) {
      throw new Error("Unable to calculate guest totals.");
    }

    return count ?? 0;
  }

  async function loadLatestRsvps(invitationIds: number[]) {
    const latestByInvitation = new Map<number, RsvpRow>();

    if (invitationIds.length === 0) {
      return latestByInvitation;
    }

    const { data, error } = await supabase
      .from("rsvps")
      .select(
        "invitation_id, email, phone, message, submitted_at, updated_at",
      )
      .in("invitation_id", invitationIds)
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error("Unable to load RSVP contact details.");
    }

    for (const rsvp of (data ?? []) as RsvpRow[]) {
      if (!latestByInvitation.has(rsvp.invitation_id)) {
        latestByInvitation.set(rsvp.invitation_id, rsvp);
      }
    }

    return latestByInvitation;
  }

  async function loadGuestPage(
    eventId: number,
    query: DashboardGuestQuery,
  ): Promise<DashboardGuestPage> {
    const start = (query.page - 1) * query.pageSize;
    const end = start + query.pageSize - 1;

    let guestQuery = supabase
      .from("guests")
      .select(
        [
          "id",
          "invitation_id",
          "full_name",
          "guest_type",
          "attendance_status",
          "dietary_restrictions",
          "rsvp_email",
          "rsvp_phone",
          "rsvp_message",
          "responded_at",
          "invitations!inner(id, event_id, household_name, max_attendees)",
        ].join(","),
        { count: "exact" },
      )
      .eq("invitations.event_id", eventId)
      .order("full_name")
      .range(start, end);

    if (query.attendanceStatus) {
      guestQuery = guestQuery.eq(
        "attendance_status",
        query.attendanceStatus,
      );
    }

    if (query.search) {
      guestQuery = guestQuery.ilike("full_name", `%${query.search}%`);
    }

    const { data, count, error } = await guestQuery;

    if (error) {
      throw new Error("Unable to load the guest list.");
    }

    const { data: eventAccessData, error: eventAccessError } =
      await supabase
        .from("events")
        .select("rsvp_access_mode")
        .eq("id", eventId)
        .maybeSingle();

    if (eventAccessError || !eventAccessData) {
      throw new Error("Unable to load the event RSVP configuration.");
    }

    const eventAccess = eventAccessData as EventAccessModeRow;
    const guestRows = (data ?? []) as unknown as GuestRow[];
    const latestRsvps = await loadLatestRsvps([
      ...new Set(guestRows.map((guest) => guest.invitation_id)),
    ]);

    const guests = guestRows.map((guest): DashboardGuest => {
      const invitation = getInvitation(guest.invitations);
      const rsvp = latestRsvps.get(guest.invitation_id);
      const usesIndividualResponses =
        eventAccess.rsvp_access_mode === "name_search";

      return {
        id: guest.id,
        invitationId: guest.invitation_id,
        householdName: invitation.household_name,
        maxAttendees: invitation.max_attendees,
        fullName: guest.full_name,
        guestType: guest.guest_type,
        attendanceStatus: guest.attendance_status,
        dietaryRestrictions: guest.dietary_restrictions,
        email:
          guest.rsvp_email ??
          (usesIndividualResponses ? null : rsvp?.email ?? null),
        phone:
          guest.rsvp_phone ??
          (usesIndividualResponses ? null : rsvp?.phone ?? null),
        message:
          guest.rsvp_message ??
          (usesIndividualResponses ? null : rsvp?.message ?? null),
        submittedAt:
          guest.responded_at ??
          (usesIndividualResponses ? null : rsvp?.submitted_at ?? null),
      };
    });

    const total = count ?? 0;

    return {
      guests,
      total,
      page: query.page,
      pageSize: query.pageSize,
      totalPages: Math.max(1, Math.ceil(total / query.pageSize)),
    };
  }

  async function requireWritableMembership(
    userId: string,
    eventId: number,
  ) {
    const role = await getEventRole(userId, eventId);

    if (role !== "owner" && role !== "editor") {
      throw new Error("Guest-list changes are not permitted.");
    }
  }

  async function requireGuestInEvent(guestId: number, eventId: number) {
    const { data, error } = await supabase
      .from("guests")
      .select("id, invitations!inner(event_id)")
      .eq("id", guestId)
      .eq("invitations.event_id", eventId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to verify the guest.");
    }

    if (!data) {
      throw new Error("Guest not found.");
    }
  }

  async function getHousehold(
    invitationId: number,
    eventId: number,
  ) {
    const { data, error } = await supabase
      .from("invitations")
      .select("id, household_name, max_attendees, guests(count)")
      .eq("id", invitationId)
      .eq("event_id", eventId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to verify the household.");
    }

    if (!data) {
      throw new Error("The selected household was not found.");
    }

    return data as unknown as HouseholdRow;
  }

  function toHousehold(row: HouseholdRow): DashboardHousehold {
    const countRelation = Array.isArray(row.guests)
      ? row.guests[0]
      : row.guests;

    return {
      id: row.id,
      name: row.household_name,
      maxAttendees: row.max_attendees,
      guestCount: countRelation?.count ?? 0,
    };
  }

  return {
    listAssignedEvents,
    getEventRole,

    async getEventWorkspace(
      userId,
      eventId,
      query,
    ): Promise<ClientEventWorkspace | null> {
      const events = await listAssignedEvents(userId);
      const event = events.find((candidate) => candidate.id === eventId);

      if (!event) {
        return null;
      }

      const [
        totalGuests,
        attendingGuests,
        declinedGuests,
        pendingGuests,
        invitationResult,
        rsvpResult,
        guestPage,
      ] = await Promise.all([
        countGuests(eventId),
        countGuests(eventId, "attending"),
        countGuests(eventId, "declined"),
        countGuests(eventId, "pending"),
        supabase
          .from("invitations")
          .select(
            "id, household_name, max_attendees, guests(count)",
            { count: "exact" },
          )
          .eq("event_id", eventId)
          .order("household_name"),
        supabase
          .from("rsvps")
          .select("id, invitations!inner(event_id)", {
            count: "exact",
            head: true,
          })
          .eq("invitations.event_id", eventId),
        loadGuestPage(eventId, query),
      ]);

      if (invitationResult.error || rsvpResult.error) {
        throw new Error("Unable to calculate RSVP totals.");
      }

      return {
        event,
        summary: {
          totalGuests,
          attendingGuests,
          declinedGuests,
          pendingGuests,
          totalInvitations: invitationResult.count ?? 0,
          submittedRsvps: rsvpResult.count ?? 0,
        },
        guestPage,
        households: (
          (invitationResult.data ?? []) as unknown as HouseholdRow[]
        ).map(toHousehold),
      };
    },

    async listAllEventGuests(userId, eventId) {
      const role = await getEventRole(userId, eventId);

      if (!role) {
        return [];
      }

      const allGuests: DashboardGuest[] = [];
      const pageSize = 250;
      let page = 1;

      while (page <= 40) {
        const result = await loadGuestPage(eventId, {
          page,
          pageSize,
        });

        if (result.total > 10_000) {
          throw new Error(
            "This event is too large for a single dashboard export.",
          );
        }

        allGuests.push(...result.guests);

        if (page >= result.totalPages) {
          break;
        }

        page += 1;
      }

      return allGuests;
    },

    async createGuest(userId, command) {
      await requireWritableMembership(userId, command.eventId);

      let invitationId = command.invitationId;
      let createdInvitationId: number | null = null;
      let household: HouseholdRow | null = null;

      if (invitationId) {
        household = await getHousehold(invitationId, command.eventId);
      } else {
        if (!command.householdName) {
          throw new Error("A household name is required.");
        }

        const { data: invitation, error: invitationError } =
          await supabase
            .from("invitations")
            .insert({
              event_id: command.eventId,
              household_name: command.householdName,
              max_attendees: 1,
            })
            .select("id")
            .single();

        if (invitationError || !invitation) {
          throw new Error("Unable to create the guest household.");
        }

        invitationId = invitation.id as number;
        createdInvitationId = invitationId;
      }

      const { data: guest, error: guestError } = await supabase
        .from("guests")
        .insert({
          invitation_id: invitationId,
          full_name: command.fullName,
          guest_type: command.guestType,
          attendance_status: "pending",
          dietary_restrictions: command.dietaryRestrictions,
        })
        .select("id")
        .single();

      if (guestError || !guest) {
        if (createdInvitationId) {
          await supabase
            .from("invitations")
            .delete()
            .eq("id", createdInvitationId);
        }
        throw new Error("Unable to create the guest.");
      }

      if (household) {
        const { count: currentGuestCount, error: countError } =
          await supabase
            .from("guests")
            .select("id", { count: "exact", head: true })
            .eq("invitation_id", household.id);

        if (countError) {
          await supabase.from("guests").delete().eq("id", guest.id);
          throw new Error("Unable to verify the household capacity.");
        }

        const expectedGuestCount = currentGuestCount ?? 0;

        if (expectedGuestCount > household.max_attendees) {
          const { error: capacityError } = await supabase
            .from("invitations")
            .update({
              max_attendees: expectedGuestCount,
              updated_at: new Date().toISOString(),
            })
            .eq("id", household.id);

          if (capacityError) {
            await supabase.from("guests").delete().eq("id", guest.id);
            throw new Error(
              "Unable to update the household capacity.",
            );
          }
        }
      }
    },

    async updateGuest(userId, command) {
      await requireWritableMembership(userId, command.eventId);
      await requireGuestInEvent(command.guestId, command.eventId);

      const { data, error } = await supabase
        .from("guests")
        .update({
          full_name: command.fullName,
          guest_type: command.guestType,
          attendance_status: command.attendanceStatus,
          dietary_restrictions: command.dietaryRestrictions,
          updated_at: new Date().toISOString(),
        })
        .eq("id", command.guestId)
        .select("id")
        .maybeSingle();

      if (error || !data) {
        throw new Error("Unable to update the guest.");
      }
    },

    async deleteGuest(userId, eventId, guestId) {
      await requireWritableMembership(userId, eventId);
      await requireGuestInEvent(guestId, eventId);

      const { data, error } = await supabase
        .from("guests")
        .delete()
        .eq("id", guestId)
        .select("id")
        .maybeSingle();

      if (error || !data) {
        throw new Error("Unable to delete the guest.");
      }
    },
  };
}
