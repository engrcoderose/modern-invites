import { wedding } from "../data/wedding-data";

function NameLine({ text }: { text: string }) {
  return <span className="relative inline-block"><span data-hero-name className="jb-name-ink">{text}</span></span>;
}

export default function CoupleNames({ id = "jb-couple" }: { id?: string }) {
  return (
    <h1 id={id} aria-label={wedding.couple.display} className="jb-names my-3 flex flex-col items-center justify-center sm:my-4">
      <NameLine text={wedding.couple.names[0]} />
      <span className="jb-name-connector my-[clamp(0.5rem,calc(10dvh_-_3rem),2rem)] md:my-2"><NameLine text="&" /></span>
      <NameLine text={wedding.couple.names[1]} />
    </h1>
  );
}
