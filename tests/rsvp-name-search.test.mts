import assert from "node:assert/strict";
import test from "node:test";
import {
  nameWithoutMiddleInitials,
  searchInvitationsWithoutMiddleInitials,
  type NameSearchCandidate,
} from "../features/rsvp/application/search-invitations-without-middle-initials.ts";

const guest = (name: string, invitationId = 12, eventId = 7): NameSearchCandidate => ({
  event_id: eventId,
  invitation_id: invitationId,
  household_name: "Test household",
  matched_guest_name: name,
});

test("middle initials with or without periods are optional; other name parts remain required", () => {
  for (const value of ["John Rey F. Sergio", "John Rey F Sergio", "  JOHN  REY  Sergio "]) {
    assert.equal(nameWithoutMiddleInitials(value), "john rey sergio");
  }
  assert.equal(nameWithoutMiddleInitials("Leslie Marie S. Zaldua"), "leslie marie zaldua");
  assert.equal(nameWithoutMiddleInitials("José M. De la Cruz"), "josé de la cruz");
  assert.equal(nameWithoutMiddleInitials("John Rey Francisco Sergio"), "john rey francisco sergio");
  assert.equal(nameWithoutMiddleInitials("J. Rey Sergio"), "j. rey sergio");
});

test("both requested spellings return the original invited name for party authorization", async () => {
  for (const fullName of ["John Rey F. Sergio", "John Rey Sergio"]) {
    const matches = await searchInvitationsWithoutMiddleInitials({
      async findCandidates(query) {
        assert.equal(query.eventId, 7);
        assert.equal(query.pattern, "%john%rey%sergio%");
        return [guest("John Rey F. Sergio")];
      },
    }, { eventId: 7, fullName });
    assert.deepEqual(matches, [{ invitation_id: 12, household_name: "Test household", matched_guest_name: "John Rey F. Sergio" }]);
  }
  const matches = await searchInvitationsWithoutMiddleInitials({
    async findCandidates() { return [guest("John Rey Sergio")]; },
  }, { eventId: 7, fullName: "John Rey F. Sergio" });
  assert.equal(matches[0].matched_guest_name, "John Rey Sergio");
});

test("partial names, different surnames and guests from other events never match", async () => {
  const repository = { async findCandidates() {
    return [guest("John Rey F. Sergio"), guest("John Rey Sergio", 90, 8)];
  } };
  for (const fullName of ["John Sergio", "John Rey Santos", "Rey Sergio", "John R. Sergio", "John Rey% Sergio"]) {
    assert.deepEqual(await searchInvitationsWithoutMiddleInitials(repository, { eventId: 7, fullName }), []);
  }
  assert.equal((await searchInvitationsWithoutMiddleInitials(repository, { eventId: 7, fullName: "John Rey Sergio" })).length, 1);
});

test("one-word searches are rejected without querying candidates", async () => {
  const matches = await searchInvitationsWithoutMiddleInitials({
    async findCandidates() { assert.fail("Must not query a surname alone"); },
  }, { eventId: 7, fullName: "Sergio" });
  assert.deepEqual(matches, []);
});

test("all ambiguous matches survive pagination for invitation selection", async () => {
  const offsets: number[] = [];
  const matches = await searchInvitationsWithoutMiddleInitials({
    async findCandidates({ eventId, offset, limit }) {
      assert.equal(eventId, 7);
      assert.equal(limit, 200);
      offsets.push(offset);
      return offset === 0
        ? [guest("John Rey F. Sergio"), ...Array.from({ length: 199 }, () => guest("John Reyson Sergio"))]
        : [guest("John Rey A. Sergio", 13), guest("John Rey F. Sergio")];
    },
  }, { eventId: 7, fullName: "John Rey Sergio" });
  assert.deepEqual(offsets, [0, 200]);
  assert.deepEqual(matches.map((match) => match.invitation_id), [12, 13]);
});

test("database pattern metacharacters are escaped and repository failures propagate", async () => {
  await searchInvitationsWithoutMiddleInitials({
    async findCandidates({ pattern }) {
      assert.equal(pattern, "%ana\\_%de\\%cruz%");
      return [];
    },
  }, { eventId: 7, fullName: "Ana_ De%Cruz" });
  await assert.rejects(searchInvitationsWithoutMiddleInitials({
    async findCandidates() { throw new Error("Database unavailable"); },
  }, { eventId: 7, fullName: "John Rey Sergio" }), /Database unavailable/);
});
