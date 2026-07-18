import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { EventInformation, SearchMatch } from "./types";
import { SearchResults } from "./SearchResults";

interface SearchStepProps {
  event: EventInformation;
  fullName: string;
  matches: SearchMatch[];
  isSearching: boolean;
  errorMessage: string;
  onNameChange: (value: string) => void;
  onSearch: () => Promise<void>;
  onReset: () => void;
  loadingInvitationId: number | null;
  partyError: string;
  onSelectMatch: (match: SearchMatch) => Promise<void>;
}

export function SearchStep({
  event,
  fullName,
  matches,
  isSearching,
  errorMessage,
  onNameChange,
  onSearch,
  onReset,
  loadingInvitationId,
  partyError,
  onSelectMatch,
}: SearchStepProps) {
  function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    void onSearch();
  }

  return (
    <Card className="border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl">
      <CardHeader className="border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />

        <p className="text-sm font-medium text-green-700">RSVP code verified</p>

        <CardTitle className="mt-2 font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">
          Find Your Invitation
        </CardTitle>

        <p className="mt-2 text-sm text-gray-600">
          Enter your complete name exactly as it appears on the guest list for{" "}
          {event.name}.
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="guest-full-name" className="text-gray-800">
              Complete Invited Name
            </Label>

            <Input
              id="guest-full-name"
              type="text"
              value={fullName}
              onChange={(event) => {
                onNameChange(event.target.value);
              }}
              placeholder="e.g. Josephine Debil"
              autoComplete="name"
              maxLength={150}
              disabled={isSearching}
              className="mt-2"
            />
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSearching || fullName.trim().length < 3}
            className="w-full rounded-full bg-[var(--smart-rsvp-accent)] py-6 text-lg text-white hover:bg-[var(--smart-rsvp-accent-hover)]"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Find My Invitation
              </>
            )}
          </Button>
        </form>

        <SearchResults
          matches={matches}
          loadingInvitationId={loadingInvitationId}
          onSelect={onSelectMatch}
        />

        {partyError && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {partyError}
          </div>
        )}

        <div className="border-t border-gray-100 pt-5 text-center">
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            disabled={isSearching}
            className="text-gray-500"
          >
            Use a Different RSVP Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
