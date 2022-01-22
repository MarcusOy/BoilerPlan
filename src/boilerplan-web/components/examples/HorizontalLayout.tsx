import React, { useState } from "react";

import ReactFlow, {
  removeElements,
  addEdge,
  Elements,
  Position,
  MiniMap,
  Controls,
  Background,
  Handle,
} from "react-flow-renderer";

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const initialElements: Elements<any> = [
  {
    id: "horizontal-1",
    sourcePosition: Position.Right,
    type: "course",
    className: "dark-node",
    data: { label: "CNIT 10000" },
    position: { x: 0, y: 80 },
    style: {
      background: "var(--🗿-colors-gray-600)",
      padding: 10,
      borderRadius: 10,
      cursor: "pointer",
    },
  },
  {
    id: "horizontal-2",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "CNIT 110" },
    position: { x: 250, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "CNIT 220" },
    position: { x: 250, y: 160 },
  },
  {
    id: "horizontal-4",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "CNIT 440" },
    position: { x: 500, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: Position.Top,
    targetPosition: Position.Bottom,
    data: { label: "CNIT 330" },
    position: { x: 500, y: 100 },
  },
  {
    id: "horizontal-6",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "CNIT 420" },
    position: { x: 500, y: 230 },
  },
  {
    id: "horizontal-7",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "CNIT 450" },
    position: { x: 750, y: 50 },
  },
  {
    id: "horizontal-8",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: "CNIT 500" },
    position: { x: 750, y: 300 },
  },
  {
    id: "horizontal-e1-2",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-2",
    animated: true,
  },
  {
    id: "horizontal-e1-3",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-3",
    animated: true,
  },
  {
    id: "horizontal-e1-4",
    source: "horizontal-2",
    type: "smoothstep",
    target: "horizontal-4",
    label: "edge label",
  },
  {
    id: "horizontal-e3-5",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-5",
    animated: true,
  },
  {
    id: "horizontal-e3-6",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-6",
    animated: true,
  },
  {
    id: "horizontal-e5-7",
    source: "horizontal-5",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e6-8",
    source: "horizontal-6",
    type: "smoothstep",
    target: "horizontal-8",
    animated: true,
  },
];

const HorizontalFlow = () => {
  const [elements, setElements] = useState(initialElements);

  const onElementClick = (event, node) => console.log("mouse click:", node);
  const onNodeMouseEnter = (event, node) => console.log("mouse enter:", node);
  const onNodeMouseLeave = (event, node) => console.log("mouse leave:", node);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        selectNodesOnDrag={false}
        onElementClick={onElementClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        {/* <MiniMap
          style={{
            background: "var(--🗿-colors-gray-600)",
          }}
        /> */}
        {/* <Controls /> */}
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HorizontalFlow;
