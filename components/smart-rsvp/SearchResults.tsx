import { Loader2, UsersRound } from "lucide-react";

import type { SearchMatch } from "./types";

interface SearchResultsProps {
  matches: SearchMatch[];
  loadingInvitationId: number | null;
  onSelect: (match: SearchMatch) => Promise<void>;
}

export function SearchResults({
  matches,
  loadingInvitationId,
  onSelect,
}: SearchResultsProps) {
  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 border-t border-[var(--smart-rsvp-border-soft)] pt-6">
      <p className="text-sm font-medium text-gray-700">
        {matches.length === 1
          ? "We found your invitation:"
          : "Select your invitation:"}
      </p>

      {matches.map((match) => {
        const isLoading = loadingInvitationId === match.invitationId;

        return (
          <button
            key={`${match.invitationId}-${match.matchedGuestName}`}
            type="button"
            disabled={loadingInvitationId !== null}
            onClick={() => {
              void onSelect(match);
            }}
            className="w-full rounded-lg border border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] p-4 text-left transition hover:border-[var(--smart-rsvp-border)] hover:bg-[var(--smart-rsvp-soft-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--smart-rsvp-soft-strong)]">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[var(--smart-rsvp-accent)]" />
                ) : (
                  <UsersRound className="h-5 w-5 text-[var(--smart-rsvp-accent)]" />
                )}
              </div>

              <div className="flex-1">
                <p className="font-libreBaskerville text-lg text-gray-900">
                  {match.householdName}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Matched guest: {match.matchedGuestName}
                </p>
              </div>

              <span className="text-sm font-medium text-[var(--smart-rsvp-accent)]">
                {isLoading ? "Loading..." : "Select"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
