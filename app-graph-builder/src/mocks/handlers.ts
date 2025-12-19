import { http, HttpResponse } from "msw";
import { Position } from "reactflow";

export const handlers = [
    http.get("/api/apps", () => {
        return HttpResponse.json([
            { id: "app-1", name: "Payments Service" },
            { id: "app-2", name: "User Platform" },

            { id: "supertokens-golang", name: "supertokens-golang" },
            { id: "supertokens-java", name: "supertokens-java" },
            { id: "supertokens-python", name: "supertokens-python" },
            { id: "supertokens-ruby", name: "supertokens-ruby" },
            { id: "supertokens-go", name: "supertokens-go" },
        ]);
    }),

    http.get("/api/apps/:appId/graph", ({ params }) => {
        const { appId } = params;

        switch (appId) {
            case "app-1": 
                return HttpResponse.json({
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
                            data: { label: "Redis", status: "Degraded", cpu: 55},
                        },
                    ],
                    edges: [{ id: "el", source: "pg", target: "rd" }],
                });

            case "app-2":
                return HttpResponse.json({
                    nodes: [
                        {
                            id: "mg",
                            type: "service",
                            Position: { x: 200, y: 150 },
                            data: { label: "MongoDB", status: "Healthy", cpu: 25 },
                        },
                    ],
                    edges: [],
                });
                
            case "supertokens-golang":
                return HttpResponse.json({
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
                    edges: [
                        { id: "e1", source: "pg", target: "rd" },
                    ],
                });

            case "supertokens-java":
                return HttpResponse.json({
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
                return HttpResponse.json({
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
                    edges: [
                        { id: "e1", source: "mg", target: "rd" },
                    ],
                });

            case "supertokens-ruby":
                return HttpResponse.json({
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
                return HttpResponse.json({
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
                return HttpResponse.json(
                    { message: "Graph not found" },
                    { status: 404 }
                );
        }
    }),
];