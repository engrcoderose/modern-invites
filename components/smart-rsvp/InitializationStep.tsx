import { Loader2, RefreshCw } from "lucide-react";

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
}

export function InitializationStep({
  errorMessage,
  onRetry,
}: InitializationStepProps) {
  return (
    <Card className="border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl">
      <CardHeader className="border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] text-center">
        {errorMessage ? (
          <RefreshCw className="mx-auto mb-3 size-8 text-[var(--smart-rsvp-accent)]" />
        ) : (
          <Loader2 className="mx-auto mb-3 size-8 animate-spin text-[var(--smart-rsvp-accent)]" />
        )}
        <CardTitle className="font-libreBaskerville text-2xl text-[var(--smart-rsvp-heading)]">
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
            Securely connecting to the wedding guest list…
          </p>
        )}
      </CardContent>
    </Card>
  );
}
