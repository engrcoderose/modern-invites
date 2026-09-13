import Link from "next/link";
import { ArrowUpRight, Blocks, Check } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import SectionHeading from "@/components/landing/SectionHeading";
import { MODULAR_FEATURES } from "@/lib/pricing";
import { CONTACT_URL } from "@/lib/site";

export default function ModularPricing() {
  return (
    <section className="bg-ivory px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Build your own invitation"
          title={
            <>
              Choose only the features{" "}
              <span className="italic text-eucalyptus-dark">you need.</span>
            </>
          }
          description="Start with a simple invitation and add individual modules, or use these prices to customize one of our packages."
          align="center"
        />

        <ScrollReveal delay={0.08}>
          <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-forest/10 bg-white px-4 py-2 text-xs font-bold text-forest shadow-sm">
            <Blocks
              className="h-3.5 w-3.5 text-champagne-dark"
              aria-hidden="true"
            />
            Modular features start at ₱99
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULAR_FEATURES.map((feature, index) => (
            <ScrollReveal
              key={feature.name}
              delay={(index % 3) * 0.04}
              className="h-full"
            >
              <article className="flex h-full items-start justify-between gap-5 rounded-2xl border border-forest/10 bg-white p-5 shadow-[0_18px_45px_-36px_rgba(23,61,50,0.55)] sm:p-6">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-eucalyptus/15 text-forest">
                    <Check
                      className="h-3 w-3"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-forest">
                      {feature.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-ink-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-instrumentSerif text-2xl leading-none text-ink">
                    ₱{feature.price}
                  </p>
                  <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-muted/55">
                    Add-on
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[1.75rem] bg-forest px-6 py-7 text-center text-white sm:flex-row sm:px-9 sm:text-left">
            <div>
              <h3 className="font-instrumentSerif text-2xl sm:text-3xl">
                Need a custom combination?
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Tell us which modules you want and we’ll prepare a tailored
                one-time quote. Add-on prices apply to existing packages.
              </p>
            </div>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-forest transition duration-300 hover:-translate-y-0.5 hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
            >
              Build my package
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-ink-muted">
          Prices shown are starting rates and may vary based on content,
          complexity, and requested customization.
        </p>
      </div>
    </section>
  );
}
