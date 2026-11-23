import ScrollReveal from "@/components/landing/ScrollReveal";
import { DIGITAL_INVITATION_SERVICES } from "@/lib/pricing";

export default function DigitalInvitationsPricing() {
  return (
    <section id="digital-invitations" aria-labelledby="digital-invitations-heading" className="mt-8 scroll-mt-24 rounded-2xl border border-brand-700/15 bg-brand-50 p-5 sm:p-8">
      <ScrollReveal as="h3" id="digital-invitations-heading" className="border-b border-brand-700/15 pb-6 font-elegant text-2xl leading-tight text-brand-700 sm:text-3xl">
        Digital invitations
      </ScrollReveal>
      <dl className="mt-4">
        {DIGITAL_INVITATION_SERVICES.map((service) => (
          <ScrollReveal key={service.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-brand-700/15 py-4 last:border-b-0">
            <dt className="min-w-0 flex-[1_1_12rem] text-sm leading-6 text-marketing-muted">{service.name}</dt>
            <dd className="ml-auto shrink-0 text-sm font-semibold leading-6 tabular-nums text-brand-700">₱{service.price}</dd>
          </ScrollReveal>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-6 text-marketing-muted">Invitation layout varies by number of pages.</p>
    </section>
  );
}
