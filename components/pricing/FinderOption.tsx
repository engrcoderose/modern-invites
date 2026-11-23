type Props = {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  title: string;
  detail: string;
  checked: boolean;
  included?: boolean;
  onChange: () => void;
};

export default function FinderOption({ type, name, value, title, detail, checked, included = false, onChange }: Props) {
  return (
    <label className={`flex min-h-16 items-start gap-2.5 rounded-xl border p-3 focus-within:ring-2 focus-within:ring-brand-700 focus-within:ring-offset-2 motion-safe:transition-colors ${included ? "border-brand-700/15 bg-brand-100/50" : checked ? "cursor-pointer border-brand-700 bg-white/90" : "cursor-pointer border-brand-700/20 bg-white/50 hover:border-brand-700/50 hover:bg-white/80"}`}>
      <input type={type} name={name} value={value} checked={checked} disabled={included} onChange={onChange} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-700" />
      <span className="min-w-0"><span className="block text-[13px] font-semibold leading-[18px] text-brand-900">{title}</span><span className="mt-1 block text-xs leading-4 text-marketing-muted">{detail}</span></span>
    </label>
  );
}
