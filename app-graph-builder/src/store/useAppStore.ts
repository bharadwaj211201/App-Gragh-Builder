import { create } from "zustand";
import { Node, Edge } from "reactflow";

export type InspectorTab = "config" | "runtime";
export type NodeStatus = "Healthy" | "Degraded" | "Down";

interface AppState {
  nodes: Node[];
  edges: Edge[];

  selectedNodeId: string | null;
  activeInspectorTab: InspectorTab;

  setNodes: (nodes: Node[]) => void;
  setSelectedNodeId: (id: string | null) => void;
  setInspectorTab: (tab: InspectorTab) => void;
  updateNodeData: (id: string, data: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  nodes: [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: {
        label: "Postgres",
        status: "Healthy",
        cpu: 20,
      },
    },
    {
      id: "2",
      position: { x: 350, y: 200 },
      data: {
        label: "Redis",
        status: "Down",
        cpu: 40,
      },
    },
    {
      id: "3",
      position: { x: 200, y: 350 },
      data: {
        label: "MongoDB",
        status: "Degraded",
        cpu: 60,
      },
    },
  ],

  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ],

  selectedNodeId: null,
  activeInspectorTab: "config",

  setNodes: (nodes) => set({ nodes }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    })),
}));
