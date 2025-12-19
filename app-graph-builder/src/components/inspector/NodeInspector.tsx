import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useAppStore } from "../../store/useAppStore";

/* ---- Types ---- */
type ServiceNodeData = {
  label: string;
  status: "Healthy" | "Degraded" | "Error";
  cpu: number;
};

export default function NodeInspector() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const nodes = useAppStore((s) => s.nodes);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setTab = useAppStore((s) => s.setInspectorTab);
  const updateNodeData = useAppStore((s) => s.updateNodeData);

  /* ---- No node selected ---- */
  if (!selectedNodeId) {
    return (
      <div className="p-4 text-gray-400">
        Select a node to inspect
      </div>
    );
  }

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const { label, status, cpu } = node.data as ServiceNodeData;

  return (
    <div className="p-4 space-y-5 text-white">
      {/* ---------- Status Pill ---------- */}
      <Badge
        variant={
          status === "Healthy"
            ? "default"
            : status === "Degraded"
            ? "secondary"
            : "destructive"
        }
      >
        {status}
      </Badge>

      {/* ---------- Node Name ---------- */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Service Name</label>
        <Input
          value={label}
          onChange={(e) =>
            updateNodeData(selectedNodeId, {
              label: e.target.value,
            })
          }
        />
      </div>

      {/* ---------- Tabs ---------- */}
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setTab(value as "config" | "runtime")
        }
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* ---------- Config Tab ---------- */}
      {activeTab === "config" && (
        <div className="space-y-3">
          <label className="text-sm text-gray-400">
            CPU Usage
          </label>

          <Slider
            value={[cpu]}
            max={100}
            onValueChange={([v]) =>
              updateNodeData(selectedNodeId, { cpu: v })
            }
          />

          <Input
            type="number"
            min={0}
            max={100}
            value={cpu}
            onChange={(e) =>
              updateNodeData(selectedNodeId, {
                cpu: Math.min(
                  100,
                  Math.max(0, Number(e.target.value))
                ),
              })
            }
          />
        </div>
      )}

      {/* ---------- Runtime Tab ---------- */}
      {activeTab === "runtime" && (
        <div className="space-y-4 text-sm">
          {/* CPU */}
          <div className="flex justify-between">
            <span className="text-gray-400">CPU Usage</span>
            <span className="font-medium">{cpu}%</span>
          </div>

          {/* Memory (mocked) */}
          <div className="flex justify-between">
            <span className="text-gray-400">Memory</span>
            <span className="font-medium">
              {Math.round(cpu * 0.8)} MB
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span
              className={
                status === "Healthy"
                  ? "text-green-400"
                  : status === "Degraded"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {status}
            </span>
          </div>

          {/* Uptime (mocked) */}
          <div className="flex justify-between">
            <span className="text-gray-400">Uptime</span>
            <span className="font-medium">
              {Math.floor(cpu / 5) + 12} hrs
            </span>
          </div>
        </div>
      )}
    </div>
  );
}