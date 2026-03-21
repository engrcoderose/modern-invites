import Link from "next/link";

export type GalleryCardItem = {
  title: string;
  description: string;
  href?: string;
};

type GalleryCardProps = {
  item: GalleryCardItem;
};

export default function GalleryCard({ item }: GalleryCardProps) {
  const href = item.href ?? "#";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-stone-100 to-stone-200">
        <div className="absolute inset-3 rounded-lg bg-stone-300/80 shadow-inner ring-1 ring-stone-400/30" />
        <div className="absolute bottom-2 right-3 h-[45%] w-[28%] rounded-lg border-4 border-white bg-stone-400/90 shadow-lg ring-1 ring-black/10" />
      </div>

      <div className="flex flex-1 flex-col items-center gap-2 px-5 pb-6 pt-5 text-center">
        <h3 className="font-elegant text-lg font-semibold text-slate-900 sm:text-xl">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <Link
          href={href}
          className="mt-2 inline-flex rounded-full border border-gold-500 px-6 py-2 text-sm font-medium text-gold-600 transition hover:bg-gold-50"
        >
          View Demo
        </Link>
      </div>
    </article>
  );
}
