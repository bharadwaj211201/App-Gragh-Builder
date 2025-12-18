export default function TopBar() {
  return (
    <div className="h-12 flex items-center justify-between px-4 border-b bg-black text-white">
      <div className="font-semibold">App Graph Builder</div>

      <div className="flex gap-2">
        <button className="px-2 py-1 text-sm border rounded">
          Fit View
        </button>
        <button className="px-2 py-1 text-sm border rounded">
          Settings
        </button>
      </div>
    </div>
  );
}
