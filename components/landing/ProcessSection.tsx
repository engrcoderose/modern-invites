const steps = [
  { title: "Choose your package", description: "Match the features to your budget." },
  { title: "Send your details", description: "Share photos, event details, colors, and music." },
  { title: "Review and share", description: "Approve the draft, then send guests your link." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 border-y border-forest/15 bg-sage-100 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-12">
          <h2 className="home-heading max-w-xl text-forest">From idea to invitation.</h2>
          <p className="max-w-sm text-sm leading-7 text-marketing-muted">Most invitations are ready in 3–7 business days after we receive your content.</p>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4"><span className="font-instrumentSerif text-4xl leading-none text-eucalyptus-dark" aria-hidden="true">{index + 1}.</span><div><h3 className="text-base font-semibold text-forest">{step.title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-marketing-muted">{step.description}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
