"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Leaf,
  LoaderCircle,
  MailCheck,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { WeddingData } from "../../data/weddingData";
import { Container, Heading, Section } from "../ui";

type RSVPProps = {
  data: Pick<WeddingData, "couple" | "rsvp">;
};

type SubmissionStatus = "idle" | "sending" | "sent" | "error";

type SubmitRsvpResponse = {
  success?: boolean;
  message?: string;
};

export function RSVP({ data }: RSVPProps) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/rsvp/nylgen-and-kersee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendeeName: formData.get("attendeeName"),
          attendance: formData.get("attendance"),
          contact: formData.get("contact"),
          email: formData.get("email"),
        }),
      });

      const result = (await response.json()) as SubmitRsvpResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "We could not save your response. Please try again.",
        );
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not save your response. Please try again.",
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setErrorMessage("");
    setStatus("idle");
  };

  const coupleNames = `${data.couple.groom.firstName} & ${data.couple.bride.firstName}`;

  return (
    <Section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      tone="ivory"
      className="border-t border-wedding-line/25"
    >
      <Container size="wide">
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-28">
          <motion.div
            className="mx-auto max-w-xl text-center lg:sticky lg:top-28 lg:mx-0 lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 text-wedding-sage lg:justify-start">
              <MailCheck
                className="size-4 stroke-[1.2]"
                aria-hidden="true"
              />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                Kindly respond
              </p>
            </div>

            <Heading
              id="rsvp-heading"
              as="h2"
              variant="title"
              align="center"
              className="mt-7 text-[clamp(4rem,8vw,7.5rem)] leading-[0.8] lg:text-left"
            >
              Will you
              <span className="mt-3 block font-wedding-script text-[0.72em] font-normal leading-none text-wedding-gold">
                join us?
              </span>
            </Heading>

            <p className="mt-8 font-wedding-body text-sm leading-8 tracking-[0.05em] text-wedding-ink/70 sm:text-base">
              Your presence would make our celebration complete. Please reply
              on or before {data.rsvp.deadlineDisplay}.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 text-wedding-line lg:justify-start">
              <span className="h-px w-12 bg-current" />
              <Leaf className="size-4 stroke-[1]" />
              <span className="h-px w-12 bg-current" />
            </div>
          </motion.div>

          <motion.div
            className="border border-wedding-line/55 bg-wedding-paper p-6 shadow-wedding-card sm:p-10 lg:p-12"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid size-16 place-items-center rounded-full border border-wedding-line bg-wedding-mist text-wedding-sage-deep">
                    <Check className="size-7 stroke-[1.3]" />
                  </div>
                  <h3 className="mt-7 font-wedding-display text-4xl text-wedding-sage-deep">
                    We received your reply.
                  </h3>
                  <p className="mt-4 max-w-sm font-wedding-body text-sm leading-7 text-wedding-ink/65">
                    {data.rsvp.confirmationMessage}
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-wedding-sage underline decoration-wedding-line underline-offset-8"
                  >
                    Send another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="space-y-8"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <label className="block font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-wedding-sage-deep">
                    Name of the attendee
                    <input
                      required
                      name="attendeeName"
                      type="text"
                      autoComplete="name"
                      minLength={2}
                      maxLength={150}
                      disabled={status === "sending"}
                      placeholder="Your complete name"
                      className="mt-3 w-full border-0 border-b border-wedding-line bg-transparent px-0 py-3 font-wedding-body text-base normal-case tracking-normal text-wedding-ink outline-none transition-colors placeholder:text-wedding-ink/30 focus:border-wedding-sage-deep focus:ring-0 disabled:opacity-60"
                    />
                  </label>

                  <fieldset disabled={status === "sending"}>
                    <legend className="font-sans text-[0.62rem] font-medium uppercase leading-5 tracking-[0.2em] text-wedding-sage-deep">
                      Will you be attending {coupleNames}&apos;s wedding?
                    </legend>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="cursor-pointer border border-wedding-line/65 p-4 text-center font-wedding-body text-sm text-wedding-ink/70 transition-colors has-[:checked]:border-wedding-sage-deep has-[:checked]:bg-wedding-mist has-[:checked]:text-wedding-sage-deep">
                        <input
                          required
                          type="radio"
                          name="attendance"
                          value="attending"
                          className="sr-only"
                        />
                        Joyfully Attending
                      </label>
                      <label className="cursor-pointer border border-wedding-line/65 p-4 text-center font-wedding-body text-sm text-wedding-ink/70 transition-colors has-[:checked]:border-wedding-sage-deep has-[:checked]:bg-wedding-mist has-[:checked]:text-wedding-sage-deep">
                        <input
                          required
                          type="radio"
                          name="attendance"
                          value="declined"
                          className="sr-only"
                        />
                        Regretfully Unable to attend
                      </label>
                    </div>
                  </fieldset>

                  <label className="block font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-wedding-sage-deep">
                    Contact
                    <input
                      required
                      name="contact"
                      type="tel"
                      autoComplete="tel"
                      minLength={6}
                      maxLength={40}
                      disabled={status === "sending"}
                      placeholder="+63 900 000 0000"
                      className="mt-3 w-full border-0 border-b border-wedding-line bg-transparent px-0 py-3 font-wedding-body text-base normal-case tracking-normal text-wedding-ink outline-none transition-colors placeholder:text-wedding-ink/30 focus:border-wedding-sage-deep focus:ring-0 disabled:opacity-60"
                    />
                  </label>

                  <label className="block font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-wedding-sage-deep">
                    Email
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      disabled={status === "sending"}
                      placeholder="you@example.com"
                      className="mt-3 w-full border-0 border-b border-wedding-line bg-transparent px-0 py-3 font-wedding-body text-base normal-case tracking-normal text-wedding-ink outline-none transition-colors placeholder:text-wedding-ink/30 focus:border-wedding-sage-deep focus:ring-0 disabled:opacity-60"
                    />
                  </label>

                  {status === "error" && errorMessage ? (
                    <div
                      role="alert"
                      className="border border-red-200 bg-red-50 px-4 py-3 font-wedding-body text-sm leading-6 text-red-700"
                    >
                      {errorMessage}
                    </div>
                  ) : null}

                  <button
                    disabled={status === "sending"}
                    type="submit"
                    className="group flex w-full items-center justify-between bg-wedding-sage-deep px-6 py-5 font-sans text-[0.64rem] font-medium uppercase tracking-[0.24em] text-wedding-paper transition-colors hover:bg-wedding-sage disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending"
                      ? "Sending your reply"
                      : "Send my response"}
                    {status === "sending" ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
