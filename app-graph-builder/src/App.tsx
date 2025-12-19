import FlowCanvas from "./components/canvas/FlowCanvas";
import RightPanel from "./components/layout/RightPanel";
import TopBar from "./components/layout/TopBar";
import LeftRail from "./components/layout/LeftRail";

import { useAppGraph } from "./hooks/useAppGraph";
import { useAppStore } from "./store/useAppStore";
import { useEffect } from "react";

export default function App() {
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setNodes = useAppStore((s) => s.setNodes);
  const setEdges = useAppStore((s) => s.setEdges);

  const { data, isLoading } = useAppGraph(selectedAppId);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <TopBar />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left rail */}
        <LeftRail />

        {/* Canvas */}
        <div className="flex-1 relative">
          <FlowCanvas />

          {isLoading && (
            <div className="absolute top-2 left-2 text-sm bg-black/70 px-3 py-1 rounded text-white">
              Loading graph...
            </div>
          )}
        </div>

        {/* Right panel */}
        <RightPanel />
      </div>
    </div>
  );
}