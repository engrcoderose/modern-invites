import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({ children, light = false, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.32em]", light ? "text-[#eac8cd]" : "text-[#637b65]", className)}>
      <span className={`h-px w-8 ${light ? "bg-[#eac8cd]/60" : "bg-[#637b65]/50"}`} />
      <span>{children}</span>
    </div>
  );
}
