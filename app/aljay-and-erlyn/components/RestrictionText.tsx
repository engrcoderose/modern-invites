const restrictedWords = /\b(avoid|all-yellow|all-green|white|black|red|ripped jeans|mini-skirts|Crocs|flip-flops|slippers)\b/gi;

export default function RestrictionText({ children }: { children: string }) {
  return <>{children.split(restrictedWords).map((part, index) => index % 2 === 1
    ? <strong key={index} className="font-bold underline decoration-1 underline-offset-[3px]">{part}</strong>
    : part)}</>;
}
