import { Flower2 } from "lucide-react";
import ScrollLayer from "./ScrollLayer";

export default function SectionHeading({ title, id }: { title: string; id?: string }) {
  return (
    <ScrollLayer profile="heading" className="mx-auto mb-12 max-w-xl text-center md:mb-16">
      <Flower2 aria-hidden="true" className="mx-auto mb-5 h-6 w-6 text-[#738665]" strokeWidth={1} />
      <h2 id={id} className="jb-heading text-balance">{title}</h2>
    </ScrollLayer>
  );
}
