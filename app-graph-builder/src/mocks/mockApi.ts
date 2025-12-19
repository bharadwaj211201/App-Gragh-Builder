import { Node, Edge } from "reactflow";

export type App = {
  id: string;
  name: string;
};

export type AppGraph = {
  nodes: Node[];
  edges: Edge[];
};

/* ----------------------------------
   Fake latency helper
---------------------------------- */
function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/* ----------------------------------
   GET /api/apps
---------------------------------- */
export async function fetchApps(): Promise<App[]> {
  return delay([
    { id: "app-1", name: "Payments Service" },
    { id: "app-2", name: "User Platform" },

    { id: "supertokens-golang", name: "supertokens-golang" },
    { id: "supertokens-java", name: "supertokens-java" },
    { id: "supertokens-python", name: "supertokens-python" },
    { id: "supertokens-ruby", name: "supertokens-ruby" },
    { id: "supertokens-go", name: "supertokens-go" },
  ]);
}

/* ----------------------------------
   GET /api/apps/:appId/graph
---------------------------------- */
export async function fetchAppGraph(
  appId: string
): Promise<AppGraph> {
  switch (appId) {
    case "app-1":
      return delay({
        nodes: [
          {
            id: "pg",
            type: "service",
            position: { x: 100, y: 150 },
            data: { label: "Postgres", status: "Healthy", cpu: 30 },
          },
          {
            id: "rd",
            type: "service",
            position: { x: 350, y: 200 },
            data: { label: "Redis", status: "Degraded", cpu: 55 },
          },
        ],
        edges: [{ id: "e1", source: "pg", target: "rd" }],
      });

    case "app-2":
      return delay({
        nodes: [
          {
            id: "mg",
            type: "service",
            position: { x: 200, y: 150 },
            data: { label: "MongoDB", status: "Healthy", cpu: 25 },
          },
        ],
        edges: [],
      });

    case "supertokens-golang":
      return delay({
        nodes: [
          {
            id: "pg",
            type: "service",
            position: { x: 100, y: 120 },
            data: { label: "Postgres", status: "Healthy", cpu: 25 },
          },
          {
            id: "rd",
            type: "service",
            position: { x: 350, y: 200 },
            data: { label: "Redis", status: "Healthy", cpu: 35 },
          },
        ],
        edges: [{ id: "e1", source: "pg", target: "rd" }],
      });

    case "supertokens-java":
      return delay({
        nodes: [
          {
            id: "rd",
            type: "service",
            position: { x: 200, y: 150 },
            data: { label: "Redis", status: "Down", cpu: 70 },
          },
        ],
        edges: [],
      });

    case "supertokens-python":
      return delay({
        nodes: [
          {
            id: "mg",
            type: "service",
            position: { x: 120, y: 100 },
            data: { label: "MongoDB", status: "Degraded", cpu: 55 },
          },
          {
            id: "rd",
            type: "service",
            position: { x: 380, y: 260 },
            data: { label: "Redis", status: "Healthy", cpu: 20 },
          },
        ],
        edges: [{ id: "e1", source: "mg", target: "rd" }],
      });

    case "supertokens-ruby":
      return delay({
        nodes: [
          {
            id: "pg",
            type: "service",
            position: { x: 200, y: 180 },
            data: { label: "Postgres", status: "Healthy", cpu: 30 },
          },
        ],
        edges: [],
      });

    case "supertokens-go":
      return delay({
        nodes: [
          {
            id: "pg",
            type: "service",
            position: { x: 80, y: 120 },
            data: { label: "Postgres", status: "Healthy", cpu: 20 },
          },
          {
            id: "mg",
            type: "service",
            position: { x: 300, y: 100 },
            data: { label: "MongoDB", status: "Healthy", cpu: 15 },
          },
          {
            id: "rd",
            type: "service",
            position: { x: 200, y: 300 },
            data: { label: "Redis", status: "Degraded", cpu: 50 },
          },
        ],
        edges: [
          { id: "e1", source: "pg", target: "mg" },
          { id: "e2", source: "mg", target: "rd" },
        ],
      });

    default:
      throw new Error("Graph not found");
  }
}