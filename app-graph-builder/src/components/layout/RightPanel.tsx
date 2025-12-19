import { useApps } from "../../hooks/useApps";
import { useAppStore } from "../../store/useAppStore";
import NodeInspector from "../inspector/NodeInspector";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Lightbulb,
  Settings,
  Code,
  Package,
  Puzzle,
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  "supertokens-golang": <Lightbulb size={16} />,
  "supertokens-java": <Settings size={16} />,
  "supertokens-python": <Code size={16} />,
  "supertokens-ruby": <Package size={16} />,
  "supertokens-go": <Puzzle size={16} />,
};

export default function RightPanel() {
  const { data, isLoading, error } = useApps();
  const selectedAppId = useAppStore((s) => s.selectedAppId)
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);

  return (
    <div className="w-80 bg-black text-white border-l flex flex-col">
      {/* Header */}
      <div className="p-4 border-b text-lg font-semibold">
        Application
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <Input
          placeholder="Search..."
          className="bg-[#0b0f14] border-[#1f2937]"
        />
      </div>

      {/* App list */}
      <ScrollArea className="flex-1 px-2">
        {isLoading && (
          <div className="p-4 text-sm text-gray-400">Loading apps…</div>
        )}

        {error && (
          <div className="p-4 text-sm text-red-400">
            Failed to load apps
          </div>
        )}

        {data?.map((app: any) => {
          const isActive = app.id === selectedAppId;

          return (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md
                text-left transition
                ${
                  isActive
                    ? "bg-[#1a1f26]"
                    : "hover:bg-[#141820]"
                }
              `}
            >
              <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
                {iconMap[app.id] ?? <Puzzle size={16} />}
              </div>

              <span className="flex-1 text-sm">
                {app.name}
              </span>

              <span className="text-gray-500">›</span>
            </button>
          );
        })}
      </ScrollArea>

      {/* Inspector */}
      <div className="border-t">
        <NodeInspector />
      </div>
    </div>
  );
}