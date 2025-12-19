import { Handle, Position, NodeProps } from "reactflow";
import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";

const iconMap: Record<string, string> = {
  Postgres: "🐘",
  Redis: "🧠",
  MongoDB: "🍃",
};

const tabs = ["CPU", "Memory", "Disk", "Region"] as const;

export default function ServiceNode({ id, data }: NodeProps) {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const isSelected = selectedNodeId === id;
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("CPU");

  const statusColor =
    data.status === "Healthy"
      ? "bg-green-600"
      : data.status === "Degraded"
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div
      className={`w-[240px] rounded-xl bg-[#0b0f14] border shadow-lg text-white p-3
      transition-all duration-200
      ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-500 scale-[1.03]"
          : "border-[#1f2937]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm">
          {iconMap[data.label] ?? "🧩"} {data.label}
        </div>
        <span className="text-xs px-2 py-1 rounded bg-green-700">
          $0.03/hr
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs px-2 py-1 rounded transition-colors
              ${
                activeTab === tab
                  ? "bg-gray-700"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metric */}
      <div className="text-xs text-gray-400 mt-3 flex justify-between">
        <span>{activeTab}</span>
        <span>{data.cpu}%</span>
      </div>

      {/* Slider */}
      <div className="mt-1 h-2 rounded bg-gradient-to-r from-blue-500 via-green-500 to-red-500 relative">
        <div
          className="absolute -top-1 w-3 h-3 bg-white rounded-full"
          style={{ left: `${data.cpu}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
          {data.status}
        </span>
        <span className="text-xs text-orange-400 font-semibold">
          AWS
        </span>
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}