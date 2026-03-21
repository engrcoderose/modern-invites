import GalleryCard, { type GalleryCardItem } from "@/app/gallery/components/GalleryCard";

type GalleryProps = {
  weddings: GalleryCardItem[];
  birthdays: GalleryCardItem[];
};

function GallerySection({
  heading,
  items,
}: {
  heading: string;
  items: GalleryCardItem[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="mb-10 text-center font-elegant text-2xl font-semibold text-slate-900 sm:text-3xl">
        {heading}
      </h2>
      <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title}>
            <GalleryCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Gallery({ weddings, birthdays }: GalleryProps) {
  return (
    <main className="pb-20 pt-12 sm:pb-24 sm:pt-16 space-y-20">
      <div className="w-full mx-auto px-4 pb-14 text-center sm:px-6 sm:pb-16 h-[500px] bg-gradient-to-b from-sage-200 to-sage-50 flex items-center justify-center">
        <h1 className="font-elegant text-3xl font-semibold tracking-tight text-sage-900 sm:text-4xl md:text-5xl">
          Explore Our Sample Works
        </h1>
      </div>

      <div className="flex flex-col gap-20 sm:gap-24">
        <GallerySection heading="Weddings 💍" items={weddings} />
        <GallerySection heading="Birthdays 🎂" items={birthdays} />
      </div>
    </main>
  );
}

export type { GalleryCardItem };
