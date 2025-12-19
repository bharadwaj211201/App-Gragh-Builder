import { useApps } from "../../hooks/useApps";
import { useAppStore } from "../../store/useAppStore";
import NodeInspector from "../inspector/NodeInspector";

export default function RightPanel() {
  const { data, isLoading, error } = useApps();
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);

  return (
    <div className="w-80 bg-black text-white border-l flex flex-col">
      <div className="p-4 border-b">Apps</div>

      <div className="p-4 space-y-2">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading apps</div>}

        {data?.map((app: any) => (
          <button
            key={app.id}
            className="w-full text-left p-2 hover:bg-gray-800 rounded"
            onClick={() => setSelectedAppId(app.id)}
          >
            {app.name}
          </button>
        ))}
      </div>

      <div className="flex-1 border-t">
        <NodeInspector />
      </div>
    </div>
  );
}