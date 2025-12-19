import { useAppStore } from "../../store/useAppStore";

export default function TopBar() {
  const setOpen = useAppStore((s) => s.setMobilePanelOpen);

  return (
    <div className="h-14 bg-black text-white flex items-center justify-between px-4 border-b">
      <div className="font-semibold">App Graph Builder</div>

      {/* Mobile button */}
      <button
        className="md:hidden text-sm px-3 py-1 border rounded"
        onClick={() => setOpen(true)}
      >
        Inspect
      </button>
    </div>
  );
}