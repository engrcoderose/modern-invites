"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Check, Copy, KeyRound, Loader2 } from "lucide-react";

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
  initialCreateClientFormState,
  type CreateClientFormProps,
} from "./create-client-form.types";

export function CreateClientForm({
  action,
  events,
}: CreateClientFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialCreateClientFormState,
  );
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setCopied(false);
    }
  }, [state]);

  async function copyAccessCode() {
    const accessCode = state.createdAccess?.accessCode;

    if (!accessCode) {
      return;
    }

    await navigator.clipboard.writeText(accessCode);
    setCopied(true);
  }

  const noEvents = events.length === 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Card className="border-black/10 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-elegant text-3xl font-medium">
            Create client access
          </CardTitle>
          <CardDescription className="max-w-2xl leading-6">
            Register the client’s email, generate a secure access code,
            and assign the client to an active event.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="displayName">Client or couple name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Nylgen and Kersee"
                  required
                  minLength={2}
                  maxLength={150}
                  aria-invalid={Boolean(
                    state.fieldErrors?.displayName?.length,
                  )}
                  className="h-11 bg-white"
                />
                {state.fieldErrors?.displayName?.[0] ? (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.displayName[0]}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Client email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="client@example.com"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  aria-invalid={Boolean(state.fieldErrors?.email?.length)}
                  className="h-11 bg-white"
                />
                {state.fieldErrors?.email?.[0] ? (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.email[0]}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventId">Assigned event</Label>
                <select
                  id="eventId"
                  name="eventId"
                  required
                  defaultValue=""
                  disabled={noEvents}
                  aria-invalid={Boolean(
                    state.fieldErrors?.eventId?.length,
                  )}
                  className="flex h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
                {state.fieldErrors?.eventId?.[0] ? (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.eventId[0]}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Permission</Label>
                <select
                  id="role"
                  name="role"
                  defaultValue="owner"
                  required
                  aria-invalid={Boolean(state.fieldErrors?.role?.length)}
                  className="flex h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="owner">Owner</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                {state.fieldErrors?.role?.[0] ? (
                  <p className="text-sm text-destructive">
                    {state.fieldErrors.role[0]}
                  </p>
                ) : null}
              </div>
            </div>

            {noEvents ? (
              <p className="rounded-lg border border-champagne/40 bg-champagne/10 px-3 py-2 text-sm text-ink-muted">
                No active events are available. Create or activate an
                event before provisioning client access.
              </p>
            ) : null}

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
              disabled={isPending || noEvents}
              className="h-11 bg-forest text-white hover:bg-forest-light"
            >
              {isPending ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" />
                  Creating access…
                </>
              ) : (
                <>
                  <KeyRound aria-hidden="true" />
                  Generate client access
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <aside>
        {state.status === "success" && state.createdAccess ? (
          <Card className="border-eucalyptus/30 bg-sage-50 shadow-sm">
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-full bg-forest text-white">
                <Check aria-hidden="true" className="size-5" />
              </div>
              <CardTitle>Access created</CardTitle>
              <CardDescription className="leading-6">
                Copy this information now. The complete access code will
                not be stored or shown again.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Client
                </p>
                <p className="mt-1 font-medium">
                  {state.createdAccess.displayName}
                </p>
                <p className="text-sm text-ink-muted">
                  {state.createdAccess.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Access code
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="min-w-0 flex-1 break-all rounded-md border border-forest/15 bg-white px-3 py-2 font-mono text-sm font-semibold text-forest">
                    {state.createdAccess.accessCode}
                  </code>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={copyAccessCode}
                    aria-label="Copy access code"
                  >
                    {copied ? (
                      <Check aria-hidden="true" />
                    ) : (
                      <Copy aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border-black/15 bg-white/60 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">
                One-time access code
              </CardTitle>
              <CardDescription className="leading-6">
                The generated code will appear here after the client is
                provisioned successfully.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </aside>
    </div>
  );
}
