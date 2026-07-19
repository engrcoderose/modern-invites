import { CalendarHeart, Clock3, Images, MapPinned, Music2, UsersRound } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: UsersRound, title: "Smart RSVP", description: "Collect guest responses and party details in one place." },
  { icon: Clock3, title: "Live countdown", description: "Build anticipation right up to the celebration." },
  { icon: MapPinned, title: "Venue and maps", description: "Help every guest find their way with ease." },
  { icon: Music2, title: "Background music", description: "Set the mood from the moment the invitation opens." },
  { icon: Images, title: "Photo gallery", description: "Share the memories and people behind your event." },
  { icon: CalendarHeart, title: "Event details", description: "Keep schedules, attire, and important notes together." },
];

export default function FeatureShowcase() {
  return (
    <section id="features" className="scroll-mt-24 bg-forest px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Thoughtful by design"
            title={<>Everything your guests need, <span className="italic text-champagne-light">beautifully together.</span></>}
            description="More than an announcement, each invitation becomes a simple home for the details that matter."
            tone="dark"
          />
          <div className="mt-10 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/45 lg:flex">
            <span className="h-px w-12 bg-champagne/60" />
            Made for modern celebrations
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }, index) => (
            <ScrollReveal key={title} delay={(index % 2) * 0.08} className="h-full" amount={0.12}>
              <article className="group h-full bg-forest-light p-7 transition hover:bg-[#275547] sm:min-h-56 sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/30 text-champagne-light transition group-hover:bg-champagne group-hover:text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-instrumentSerif text-lg italic text-white/25">0{index + 1}</span>
                </div>
                <h3 className="mt-8 font-instrumentSerif text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
