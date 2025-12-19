# App Graph Builder

A small frontend application that visualizes application infrastructure as an interactive graph.
Built as part of a frontend intern take-home task to demonstrate layout composition, ReactFlow usage, state management, and mock API integration.

---

## Setup Instructions

### Prerequisites

* **Node.js ≥ 18**
* **npm** (or pnpm/yarn)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript checks
```

---

## Key Engineering Decisions

### 1. **ReactFlow (xyflow)**

* Used for graph rendering, zoom/pan, selection, and edge management.
* Custom `ServiceNode` component implemented for consistent node styling and interaction.
* Fit-to-view button added for usability after zooming/panning.

### 2. **Zustand for Client State**

* Chosen for simplicity and minimal boilerplate.
* Manages:

  * selectedAppId
  * selectedNodeId
  * activeInspectorTab
  * nodes & edges
* Avoids prop drilling and keeps UI state predictable.

### 3. **TanStack Query for Data Fetching**

* Handles mock API calls and caching.
* Automatically refetches graph data when app selection changes.
* Loading and error states handled cleanly.

### 4. **Mock APIs with MSW**

* Simulates backend endpoints:

  * `/api/apps`
  * `/api/apps/:appId/graph`
* Enables realistic async behavior without a real backend.

### 5. **shadcn/ui + Tailwind**

* Used for inspector UI (tabs, inputs, badges, sliders).
* Ensures consistent styling and accessibility with minimal custom CSS.

### 6. **Defensive Rendering**

* Graph data normalized before rendering to prevent ReactFlow crashes.
* ErrorBoundary added to avoid full white screen on runtime errors.

---

## Known Limitations

* Graph layouts are manually positioned (no automatic layout algorithm like Dagre).
* Node data is not persisted (refresh resets the graph).
* Mobile responsiveness is functional but minimal (basic panel stacking).
* Mock APIs are static and not configurable via UI.
* No authentication or role-based access.
* No backend persistence or real-time updates.

---

## Summary

This project focuses on **correctness, clean architecture, and predictable state handling** rather than feature overload.
The codebase is structured to be easily extendable with real APIs, persistence, and advanced graph features.