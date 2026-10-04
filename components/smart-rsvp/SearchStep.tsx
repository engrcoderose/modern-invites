import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { EventInformation, SearchMatch } from "./types";
import { SearchResults } from "./SearchResults";

export interface SearchHeaderOptions {
  title?: string;
  titleClassName?: string;
  description?: string;
  showVerification?: boolean;
}

interface SearchStepProps {
  appearance?: "card" | "minimal";
  header?: SearchHeaderOptions;
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
  appearance = "card",
  header,
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
  const minimal = appearance === "minimal";
  function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    void onSearch();
  }

  return (
    <Card className={minimal ? "rounded-none border-0 bg-transparent shadow-none" : "border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl"}>
      <CardHeader className={cn("text-center", minimal ? "border-0 bg-transparent px-0 pb-10 pt-0" : "border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)]")}>
        {(header?.showVerification ?? true) && (
          <>
            <CheckCircle2 aria-hidden="true" className="mx-auto mb-3 h-10 w-10 text-green-600" />
            <p className="text-sm font-medium text-green-700">
              {event.accessMode === "shared_code"
                ? "RSVP code verified"
                : "Guest list verification"}
            </p>
          </>
        )}

        <CardTitle className={`mt-2 text-[var(--smart-rsvp-heading)] ${header?.titleClassName ?? "font-libreBaskerville text-2xl"}`}>
          <h3>{header?.title ?? "Find Your Invitation"}</h3>
        </CardTitle>

        <p className={minimal ? "mt-5 font-serif text-base leading-relaxed text-[var(--smart-rsvp-heading)] sm:text-lg" : "mt-2 text-sm text-gray-600"}>
          {header?.description ?? `Enter your complete name exactly as it appears on the guest list for ${event.name}.`}
        </p>
      </CardHeader>

      <CardContent className={minimal ? "space-y-6 p-0" : "space-y-6 p-6 md:p-8"}>
        <form onSubmit={handleSubmit} className={minimal ? "space-y-7" : "space-y-5"}>
          <div>
            <Label htmlFor="guest-full-name" className={minimal ? "block text-center font-serif text-xs font-normal uppercase tracking-[.18em] text-[var(--smart-rsvp-heading)]" : "text-gray-800"}>
              {minimal ? "Full Name" : "Complete Invited Name"}
            </Label>

            {minimal && (
              <p id="guest-full-name-hint" className="mt-3 text-center font-serif text-base text-[var(--smart-rsvp-heading)]">
                Enter your first and last name
              </p>
            )}

            <Input
              id="guest-full-name"
              type="text"
              value={fullName}
              onChange={(event) => {
                onNameChange(event.target.value);
              }}
              placeholder={minimal ? undefined : "e.g. Josephine Debil"}
              aria-describedby={minimal ? "guest-full-name-hint" : undefined}
              autoComplete="name"
              maxLength={150}
              disabled={isSearching}
              className={minimal ? "mt-4 h-12 rounded-none border-0 border-b border-[var(--smart-rsvp-border)] bg-transparent px-2 py-2 text-center font-serif text-base text-[var(--smart-rsvp-heading)] shadow-none focus-visible:border-[var(--smart-rsvp-accent)] focus-visible:ring-0 md:text-base" : "mt-2"}
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
            className={cn("w-full bg-[var(--smart-rsvp-accent)] text-white hover:bg-[var(--smart-rsvp-accent-hover)]", minimal ? "relative h-16 rounded-none px-12 font-serif text-xs font-normal uppercase tracking-[.08em] shadow-none sm:text-sm" : "rounded-full py-6 text-lg")}
          >
            {isSearching ? (
              <>
                <Loader2 aria-hidden="true" className={cn("h-5 w-5 animate-spin", minimal ? "absolute right-5" : "mr-2")} />
                Searching...
              </>
            ) : (
              <>
                <Search aria-hidden="true" className={cn("h-5 w-5", minimal ? "absolute right-5" : "mr-2")} />
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

        {event.accessMode === "shared_code" ? (
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
        ) : null}
      </CardContent>
    </Card>
  );
}
