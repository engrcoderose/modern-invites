import ScrollReveal from "./ScrollReveal";
import StudioHeading from "@/components/marketing/StudioHeading";

const steps = [
  { title: "Choose your package", description: "Match the features to your budget." },
  { title: "Send your details", description: "Share photos, event details, colors, and music." },
  { title: "Review and share", description: "Approve the draft, then send guests your link." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-lilac scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StudioHeading description="Most invitations are ready in 3–7 business days after we receive your content.">From idea to <em className="text-brand-700">invitation.</em></StudioHeading>
        <ol className="studio-journey relative mt-14 grid gap-6 lg:mb-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className={index === 1 ? "lg:pt-8" : index === 2 ? "lg:pt-16" : ""}>
              <ScrollReveal delay={index * 0.1} className="h-full">
                <div className="studio-step relative flex h-full flex-col items-start rounded-[2rem] p-8 sm:p-10">
                <span className="mb-8 font-elegant text-5xl italic leading-none text-brand-700" aria-hidden="true">0{index + 1}</span>
                <div><h3 className="font-elegant text-2xl leading-snug text-marketing-ink sm:text-3xl">{step.title}</h3><p className="mt-4 max-w-sm text-sm leading-7 text-marketing-muted">{step.description}</p></div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
