import { wedding } from "../data/wedding-data";

function NameLine({ text }: { text: string }) {
  return <span className="relative inline-block"><span data-hero-name className="jb-name-ink">{text}</span></span>;
}

export default function CoupleNames() {
  return (
    <h1 id="jb-couple" aria-label={wedding.couple.display} className="jb-names my-5 flex flex-col items-center justify-center sm:my-6">
      <NameLine text={wedding.couple.names[0]} />
      <span className="jb-name-connector my-1"><NameLine text="and" /></span>
      <NameLine text={wedding.couple.names[1]} />
    </h1>
  );
}
