import { Loader2, RefreshCw } from "lucide-react";
import { RsvpClosedNotice } from "./RsvpClosedNotice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InitializationStepProps {
  errorMessage: string;
  onRetry: () => Promise<void>;
  closed?: boolean;
  closedMessage?: string;
}

export function InitializationStep({
  errorMessage,
  onRetry,
  closed = false,
  closedMessage,
}: InitializationStepProps) {
  if (closed) return <RsvpClosedNotice message={closedMessage} />;
  return (
    <Card className="border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl">
      <CardHeader className="border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] text-center">
        {errorMessage ? (
          <RefreshCw aria-hidden="true" className="mx-auto mb-3 size-8 text-[var(--smart-rsvp-accent)]" />
        ) : (
          <Loader2 aria-hidden="true" className="mx-auto mb-3 size-8 animate-spin text-[var(--smart-rsvp-accent)]" />
        )}
        <CardTitle role="heading" aria-level={3} className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">
          {errorMessage ? "Unable to Open RSVP" : "Preparing Your RSVP"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 text-center md:p-8">
        {errorMessage ? (
          <>
            <p role="alert" className="text-sm leading-6 text-red-700">
              {errorMessage}
            </p>
            <Button
              type="button"
              onClick={() => void onRetry()}
              className="mt-5 rounded-full bg-[var(--smart-rsvp-accent)] px-6 text-white hover:bg-[var(--smart-rsvp-accent-hover)]"
            >
              Try Again
            </Button>
          </>
        ) : (
          <p className="text-sm text-gray-600">
            Preparing the RSVP form…
          </p>
        )}
      </CardContent>
    </Card>
  );
}
