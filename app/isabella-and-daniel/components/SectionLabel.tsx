interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] ${light ? "text-[#d8bd83]" : "text-[#7a2138]"}`}>
      <span className={`h-px w-8 ${light ? "bg-[#d8bd83]/60" : "bg-[#7a2138]/50"}`} />
      <span>{children}</span>
    </div>
  );
}
