"use client";

import { useActionState } from "react";
import { KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  initialClientLoginFormState,
  type ClientLoginAction,
} from "./client-login-form.types";

interface ClientLoginFormProps {
  action: ClientLoginAction;
}

export function ClientLoginForm({ action }: ClientLoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialClientLoginFormState,
  );

  const emailError = state.fieldErrors?.email?.[0];
  const accessCodeError = state.fieldErrors?.accessCode?.[0];

  return (
    <Card className="w-full border-white/70 bg-white/95 shadow-2xl shadow-forest/10 backdrop-blur">
      <CardHeader className="space-y-5 pb-5">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-forest text-white shadow-lg shadow-forest/15">
          <KeyRound aria-hidden="true" className="size-5" />
        </div>

        <div className="space-y-2">
          <CardTitle className="font-elegant text-3xl font-medium text-forest sm:text-4xl">
            Welcome to your dashboard
          </CardTitle>
          <CardDescription className="max-w-md text-base leading-7">
            Enter the email address and private access code provided by
            Modern Invites. No account registration is required.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="client-email">Email address</Label>
            <Input
              id="client-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-invalid={Boolean(emailError)}
              aria-describedby={
                emailError ? "client-email-error" : undefined
              }
              className="h-12 bg-white"
              placeholder="you@example.com"
            />
            {emailError ? (
              <p
                id="client-email-error"
                className="text-sm text-destructive"
              >
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="access-code">Dashboard access code</Label>
              <span className="text-xs text-ink-muted">
                Provided by Modern Invites
              </span>
            </div>
            <Input
              id="access-code"
              name="accessCode"
              type="password"
              autoComplete="current-password"
              autoCapitalize="characters"
              spellCheck={false}
              required
              aria-invalid={Boolean(accessCodeError)}
              aria-describedby={
                accessCodeError ? "access-code-error" : "access-code-help"
              }
              className="h-12 bg-white font-mono tracking-wider"
              placeholder="MI-XXXX-XXXX-XXXX-XXXX"
            />
            {accessCodeError ? (
              <p
                id="access-code-error"
                className="text-sm text-destructive"
              >
                {accessCodeError}
              </p>
            ) : (
              <p id="access-code-help" className="text-xs text-ink-muted">
                Access codes are case-sensitive. Keep the dashes when
                entering yours.
              </p>
            )}
          </div>

          {state.status === "error" && state.message ? (
            <p
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              {state.message}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full bg-forest text-white shadow-lg shadow-forest/10 hover:bg-forest-light"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Checking access…
              </>
            ) : (
              "Open my dashboard"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
