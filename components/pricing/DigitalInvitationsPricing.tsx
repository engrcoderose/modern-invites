import ScrollReveal from "@/components/landing/ScrollReveal";
import { DIGITAL_INVITATION_SERVICES } from "@/lib/pricing";

export default function DigitalInvitationsPricing() {
  return (
    <section id="digital-invitations" aria-labelledby="digital-invitations-heading" className="bg-ivory px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl rounded-2xl border border-forest/15 bg-sage-50 p-5 sm:p-8">
        <ScrollReveal as="h2" id="digital-invitations-heading" className="border-b border-forest/15 pb-6 font-instrumentSerif text-3xl leading-tight text-forest sm:text-4xl">
          Digital invitations
        </ScrollReveal>
        <dl className="mt-4">
          {DIGITAL_INVITATION_SERVICES.map((service) => (
            <ScrollReveal key={service.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-dashed border-forest/15 py-4 last:border-b-0">
              <dt className="min-w-0 flex-[1_1_12rem] text-sm leading-6 text-marketing-muted">{service.name}</dt>
              <dd className="ml-auto shrink-0 text-sm font-semibold leading-6 tabular-nums text-forest">₱{service.price}</dd>
            </ScrollReveal>
          ))}
        </dl>
        <p className="mt-4 text-xs leading-6 text-marketing-muted">Invitation layout varies by number of pages.</p>
      </div>
    </section>
  );
}
