import { FlaskConical } from "lucide-react";

export function DemoNotice() {
  return <div className="flex items-start gap-2.5 rounded-xl bg-white/60 px-4 py-3 text-xs leading-5">
    <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
    <p><strong>Demo album.</strong> Sample names and photos are illustrative. Added photos and changes stay in this browser. Nothing is uploaded to a server or shared with other guests.</p>
  </div>;
}
