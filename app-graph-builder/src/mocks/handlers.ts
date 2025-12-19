import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/apps", () => {
    return HttpResponse.json([
      { id: "app-1", name: "Payments Service" },
      { id: "app-2", name: "User Platform" },
    ]);
  }),

  http.get("/api/apps/:appId/graph", ({ params }) => {
  const { appId } = params;

  if (appId === "app-1") {
    return HttpResponse.json({
      nodes: [
        {
          id: "1",
          type: "service",
          position: { x: 100, y: 100 },
          data: { label: "Postgres", status: "Healthy", cpu: 30 },
        },
        {
          id: "2",
          type: "service",
          position: { x: 300, y: 200 },
          data: { label: "Redis", status: "Degraded", cpu: 60 },
        },
      ],
      edges: [{ id: "e1-2", source: "1", target: "2" }],
    });
  }

  return HttpResponse.json({
    nodes: [
      {
        id: "3",
        type: "service",
        position: { x: 200, y: 150 },
        data: { label: "MongoDB", status: "Healthy", cpu: 20 },
      },
    ],
    edges: [],
  });
}),

];