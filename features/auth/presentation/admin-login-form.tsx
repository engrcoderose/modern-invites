"use client";

import { useActionState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";

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
  initialAdminLoginFormState,
  type AdminLoginAction,
} from "./admin-login-form.types";

interface AdminLoginFormProps {
  action: AdminLoginAction;
}

export function AdminLoginForm({ action }: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialAdminLoginFormState,
  );

  const emailError = state.fieldErrors?.email?.[0];
  const passwordError = state.fieldErrors?.password?.[0];

  return (
    <Card className="w-full max-w-md border-black/10 bg-white/95 shadow-xl shadow-black/5">
      <CardHeader className="space-y-4">
        <div className="flex size-11 items-center justify-center rounded-full bg-forest text-white">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </div>

        <div className="space-y-2">
          <CardTitle className="font-elegant text-3xl font-medium">
            Administrator access
          </CardTitle>
          <CardDescription className="leading-6">
            Sign in with your private Modern Invites administrator
            credentials.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
              className="h-11 bg-white"
            />
            {emailError ? (
              <p id="email-error" className="text-sm text-destructive">
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={
                passwordError ? "password-error" : undefined
              }
              className="h-11 bg-white"
            />
            {passwordError ? (
              <p id="password-error" className="text-sm text-destructive">
                {passwordError}
              </p>
            ) : null}
          </div>

          {state.status === "error" && state.message ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            >
              {state.message}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full bg-forest text-white hover:bg-forest-light"
          >
            {isPending ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
