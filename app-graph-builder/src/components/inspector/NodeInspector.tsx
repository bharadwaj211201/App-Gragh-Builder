import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useAppStore } from "../../store/useAppStore";

export default function NodeInspector() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const nodes = useAppStore((s) => s.nodes);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setTab = useAppStore((s) => s.setInspectorTab);
  const updateNodeData = useAppStore((s) => s.updateNodeData);

  if (!selectedNodeId) {
    return (
      <div className="p-4 text-gray-400">
        Select a node to inspect
      </div>
    );
  }

  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) return null;

  const { label, status, cpu } = node.data;

  return (
    <div className="p-4 space-y-4">
      {/* Status */}
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

      {/* Node Name */}
      <Input
        value={label}
        onChange={(e) =>
          updateNodeData(selectedNodeId, {
            label: e.target.value,
          })
        }
      />

      {/* Tabs */}
      <Tabs
  value={activeTab}
  onValueChange={(value) =>
    setTab(value as "config" | "runtime")
  }
>

        <TabsList>
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Slider + Input */}
      <div className="space-y-2">
        <label className="text-sm">CPU Usage</label>

        <Slider
          value={[cpu]}
          max={100}
          onValueChange={([v]) =>
            updateNodeData(selectedNodeId, { cpu: v })
          }
        />

        <Input
          type="number"
          value={cpu}
          onChange={(e) =>
            updateNodeData(selectedNodeId, {
              cpu: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}
