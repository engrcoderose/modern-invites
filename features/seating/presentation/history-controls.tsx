import { Redo2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HistoryControls({ disabled, canUndo, canRedo, onUndo, onRedo }: {
  disabled: boolean; canUndo: boolean; canRedo: boolean; onUndo(): void; onRedo(): void;
}) {
  return <div role="group" aria-label="Edit history" className="flex gap-2">
    <Button type="button" variant="outline" disabled={disabled || !canUndo} onClick={onUndo} title="Undo (Ctrl/Cmd+Z)" aria-keyshortcuts="Control+z Meta+z" className="bg-white"><Undo2 aria-hidden="true" className="size-4" />Undo</Button>
    <Button type="button" variant="outline" disabled={disabled || !canRedo} onClick={onRedo} title="Redo (Ctrl/Cmd+Shift+Z or Ctrl+Y)" aria-keyshortcuts="Control+Shift+z Meta+Shift+z Control+y" className="bg-white"><Redo2 aria-hidden="true" className="size-4" />Redo</Button>
  </div>;
}
