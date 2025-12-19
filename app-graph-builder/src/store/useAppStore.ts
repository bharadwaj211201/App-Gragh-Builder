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
  setEdges: (edges: Edge[]) => void;
  setSelectedNodeId: (id: string | null) => void;
  setInspectorTab: (tab: InspectorTab) => void;
  updateNodeData: (id: string, data: any) => void;
  deleteSelectedNode: () => void;

  selectedAppId: string | null;
  setSelectedAppId: (id: string) => void;

  /* ✅ ADDED (mobile UI state) */
  isMobilePanelOpen: boolean;
  setMobilePanelOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  nodes: [
    {
      id: "1",
      type: "service",
      position: { x: 200, y: 80 },
      data: {
        label: "Postgres",
        status: "Healthy",
        cpu: 20,
      },
    },
    {
      id: "2",
      type: "service",
      position: { x: 550, y: 220 },
      data: {
        label: "Redis",
        status: "Down",
        cpu: 40,
      },
    },
    {
      id: "3",
      type: "service",
      position: { x: 200, y: 360 },
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
  setEdges: (edges) => set({ edges }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  selectedAppId: null,
  setSelectedAppId: (id) => set({ selectedAppId: id }),

  /* ✅ ADDED (mobile panel state) */
  isMobilePanelOpen: false,
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),

  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    })),

  deleteSelectedNode: () =>
    set((state) => {
      if (!state.selectedNodeId) return state;

      const nodeId = state.selectedNodeId;

      return {
        nodes: state.nodes.filter((n) => n.id !== nodeId),
        edges: state.edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        ),
        selectedNodeId: null,
      };
    }),
}));