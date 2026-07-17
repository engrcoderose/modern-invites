"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RSVPInfo } from "../types";

type RSVPStage = "access" | "search";

interface SmartRSVPSectionProps {
  rsvp: RSVPInfo;
  eventSlug: string;
}

interface EventInformation {
  name: string;
  slug: string;
  rsvpDeadline: string | null;
}

interface AccessResponse {
  success: boolean;
  message?: string;
  event?: EventInformation;
}

export default function SmartRSVPSection({
  rsvp,
  eventSlug,
}: SmartRSVPSectionProps) {
  const [stage, setStage] = useState<RSVPStage>("access");

  const [rsvpCode, setRsvpCode] = useState("");
  const [event, setEvent] = useState<EventInformation | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleAccessSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();

    const normalizedCode = rsvpCode.trim().toUpperCase();

    if (!normalizedCode) {
      setErrorMessage("Please enter the RSVP code.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: eventSlug,
          code: normalizedCode,
        }),
      });

      const result = (await response.json()) as AccessResponse;

      if (!response.ok || !result.success || !result.event) {
        throw new Error(result.message || "Unable to verify the RSVP code.");
      }

      // Keep the normalized code in React memory.
      setRsvpCode(normalizedCode);

      // Store the safe event information returned
      // by the API.
      setEvent(result.event);

      // Move to the next RSVP step.
      setStage("search");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to verify the RSVP code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleStartOver() {
    setStage("access");
    setEvent(null);
    setRsvpCode("");
    setErrorMessage("");
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 px-4 py-20"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-12 text-center">
          <p className="mb-5 font-libreBaskerville text-base uppercase text-[#ac243d] md:text-xl">
            {rsvp.subtitle}
          </p>

          <div className="mx-auto mb-4 h-1 w-16 bg-yellow-400" />

          <h2 className="font-meaCulpa text-5xl text-[#ac243d] md:text-8xl">
            RSVP
          </h2>
        </div>

        <div className="mx-auto max-w-xl">
          {stage === "access" && (
            <Card className="border-2 border-pink-300 bg-white shadow-xl">
              <CardHeader className="border-b border-pink-200 bg-pink-50 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                  <LockKeyhole className="h-6 w-6 text-pink-600" />
                </div>

                <CardTitle className="font-libreBaskerville text-2xl text-[#ac243d]">
                  Enter Your RSVP Code
                </CardTitle>

                <p className="mt-2 text-sm text-gray-600">
                  Enter the shared code provided with your invitation.
                </p>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleAccessSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="rsvp-code" className="text-gray-800">
                      RSVP Code
                    </Label>

                    <Input
                      id="rsvp-code"
                      type="text"
                      value={rsvpCode}
                      onChange={(inputEvent) => {
                        setRsvpCode(inputEvent.target.value.toUpperCase());

                        if (errorMessage) {
                          setErrorMessage("");
                        }
                      }}
                      placeholder="Enter your code"
                      autoComplete="off"
                      maxLength={64}
                      disabled={isSubmitting}
                      className="mt-2 text-center font-semibold uppercase tracking-[0.2em]"
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
                    disabled={isSubmitting || rsvpCode.trim().length === 0}
                    className="w-full rounded-full bg-pink-500 py-6 text-lg text-white hover:bg-pink-600"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Checking Code...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {stage === "search" && event && (
            <Card className="border-2 border-green-200 bg-white shadow-xl">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />

                <h3 className="font-libreBaskerville text-2xl text-gray-900">
                  Code Verified
                </h3>

                <p className="mt-2 text-gray-600">
                  You now have access to the RSVP for{" "}
                  <strong>{event.name}</strong>.
                </p>

                <p className="mt-6 text-sm text-gray-500">
                  The exact-name search will be added in the next step.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStartOver}
                  className="mt-6"
                >
                  Use a Different Code
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
