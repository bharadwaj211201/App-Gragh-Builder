import { Handle, Position, NodeProps } from "reactflow";
import { useAppStore } from "../../store/useAppStore";

const iconMap: Record<string, string> = {
  Postgres: "🐘",
  Redis: "🧠",
  MongoDB: "🍃",
};
type ServiceNodeProps = {
  data: {
    label: string;
    status: "Healthy" | "Degraded" | "Error";
    cpu: number;
  };
};

export default function ServiceNode({ id, data }: NodeProps) {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const isSelected = selectedNodeId === id;


  const statusColor =
    data.status === "Healthy"
      ? "bg-green-600"
      : data.status === "Degraded"
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div
  className={`w-[280px] rounded-xl bg-[#0b0f14] border shadow-lg text-white p-4
  transition-all duration-200
  ${isSelected ? "border-blue-500 ring-2 ring-blue-500 scale-[1.03]" : "border-[#1f2937]"}`}
>

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          {iconMap[data.label] ?? "🧩"} {data.label}
        </div>
        <span className="text-xs px-2 py-1 rounded bg-green-700">
          $0.03 / HR
        </span>
      </div>

      {/* Specs */}
      <div className="text-xs text-gray-400 mt-2 flex justify-between">
        <span>CPU</span>
        <span>{data.cpu}%</span>
      </div>

      {/* Slider */}
      <div className="mt-1 h-2 rounded bg-gradient-to-r from-blue-500 via-green-500 to-red-500 relative">
        <div
          className="absolute top-[-4px] w-3 h-3 bg-white rounded-full"
          style={{ left: `${data.cpu}%` }}
        />
      </div>

      {/* Status + Provider */}
      <div className="flex items-center justify-between mt-4">
        <span
          className={`text-xs px-2 py-1 rounded ${statusColor}`}
        >
          {data.status}
        </span>
        <span className="text-xs text-orange-400 font-semibold">
          aws
        </span>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
