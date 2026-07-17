import { UsersRound } from "lucide-react";

import type { SearchMatch } from "./types";

interface SearchResultsProps {
  matches: SearchMatch[];
}

export function SearchResults({ matches }: SearchResultsProps) {
  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 border-t border-pink-100 pt-6">
      <p className="text-sm font-medium text-gray-700">
        {matches.length === 1
          ? "We found your invitation:"
          : "We found these matching invitations:"}
      </p>

      {matches.map((match) => (
        <div
          key={`${match.invitationId}-${match.matchedGuestName}`}
          className="rounded-lg border border-pink-200 bg-pink-50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100">
              <UsersRound className="h-5 w-5 text-pink-600" />
            </div>

            <div>
              <p className="font-libreBaskerville text-lg text-gray-900">
                {match.householdName}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Matched guest: {match.matchedGuestName}
              </p>
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-gray-500">
        Party selection will be enabled in the next step.
      </p>
    </div>
  );
}
