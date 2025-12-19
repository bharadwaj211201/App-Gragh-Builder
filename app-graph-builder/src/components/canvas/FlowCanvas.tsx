import ServiceNode from "../nodes/ServiceNode";
import ReactFlow, {
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import { Expand } from "lucide-react";

const nodeTypes = {
  service: ServiceNode,
};

/* Fit view button component */
function FitViewButton() {
  const { fitView } = useReactFlow();

  return (
    <button 
      onClick={() => 
        fitView({
          padding: 0.25,
          duration: 300,
          maxZoom: 1.1,
        })
      }
      className="absolute bottom-4 left-4 z-10
      w-7 h-7
      flex items-center justify-center
      bg-[#0b0f14]
      border border-[#1f2937]
      rounded-md
      text-gray-400
      hover:bg-[#1a1f26]
      hover:text-white
      transition
      "
      title="Fit view"
    >
      <Expand size={12} strokeWidth={2} />
    </button>
  );
}

export default function FlowCanvas() {
  const nodes = useAppStore((s) => s.nodes);
  const edges = useAppStore((s) => s.edges);
  const setNodes = useAppStore((s) => s.setNodes);
  const setEdges = useAppStore((s) => s.setEdges);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);
  const deleteSelectedNode = useAppStore((s) => s.deleteSelectedNode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelectedNode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelectedNode]);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes(applyNodeChanges(changes, nodes));

  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges(applyEdgeChanges(changes, edges));

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={({ nodes }) =>
          setSelectedNodeId(nodes[0]?.id ?? null)
        }
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        fitViewOptions={{
          padding: 0.25,
          maxZoom: 1.1,
        }}
      >
        {/* Fit View Button */}
        <FitViewButton />

        <Background variant={BackgroundVariant.Dots} gap={18} size={1} />
      </ReactFlow>
    </div>
  );
}