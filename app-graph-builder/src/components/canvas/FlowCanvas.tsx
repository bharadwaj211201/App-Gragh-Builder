import ReactFlow, {
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppStore } from "../../store/useAppStore";

export default function FlowCanvas() {
  const nodes = useAppStore((s) => s.nodes);
  const edges = useAppStore((s) => s.edges);
  const setNodes = useAppStore((s) => s.setNodes);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes(applyNodeChanges(changes, nodes));

  const onEdgesChange = (changes: EdgeChange[]) =>
    applyEdgeChanges(changes, edges);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
