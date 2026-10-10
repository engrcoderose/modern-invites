const features = [
  { title: "Smart RSVP", description: "Collect guest responses and party details." },
  { title: "Live countdown", description: "Count down to your celebration." },
  { title: "Venue & maps", description: "Help guests find the venue." },
  { title: "Background music", description: "Welcome guests with your chosen song." },
  { title: "Photo gallery", description: "Share your favorite photos." },
  { title: "Event details", description: "Keep schedules, attire, and notes together." },
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="bg-marketing-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div>
          <h2 className="home-heading text-forest">Beautiful to open.<br />Easy to use.</h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-marketing-muted">Features vary by package.</p>
        </div>
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="border-t border-forest/20 pt-4"><dt className="text-base font-semibold text-forest">{feature.title}</dt><dd className="mt-2 text-sm leading-6 text-marketing-muted">{feature.description}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
