import TopBar from "./components/layout/TopBar";
import LeftRail from "./components/layout/LeftRail";
import RightPanel from "./components/layout/RightPanel";
import FlowCanvas from "./components/canvas/FlowCanvas";

export default function App() {
  return (
    <div className="h-full flex flex-col">
      <TopBar />

      <div className="flex flex-1">
        <LeftRail />

        <div className="flex-1">
          <FlowCanvas />
        </div>

        <RightPanel />
      </div>
    </div>
  );
}
