import { FormEvent } from "react";
import { Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AccessStepProps {
  rsvpCode: string;
  isCheckingCode: boolean;
  errorMessage: string;
  onCodeChange: (value: string) => void;
  onSubmit: () => Promise<void>;
}

export function AccessStep({
  rsvpCode,
  isCheckingCode,
  errorMessage,
  onCodeChange,
  onSubmit,
}: AccessStepProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSubmit();
  }

  return (
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="rsvp-code" className="text-gray-800">
              RSVP Code
            </Label>

            <Input
              id="rsvp-code"
              type="text"
              value={rsvpCode}
              onChange={(event) => {
                onCodeChange(event.target.value);
              }}
              placeholder="Enter your code"
              autoComplete="off"
              maxLength={64}
              disabled={isCheckingCode}
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
            disabled={isCheckingCode || rsvpCode.trim().length === 0}
            className="w-full rounded-full bg-pink-500 py-6 text-lg text-white hover:bg-pink-600"
          >
            {isCheckingCode ? (
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
  );
}
