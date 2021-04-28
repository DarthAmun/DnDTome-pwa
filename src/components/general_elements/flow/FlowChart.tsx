import React, { useEffect, useState, MouseEvent } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
  Elements,
  Connection,
  Edge,
  Node,
  FlowElement,
  isEdge,
  ConnectionMode,
} from "react-flow-renderer";
import styled from "styled-components";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomeNode from "./CustomeNode";
import EditDialog from "./NodeEditDialog";
import IconButton from "../../form_elements/IconButton";

interface $Props {
  initElements: Elements;
  isEditable: boolean;
  onEdit?: (value: FlowElement[]) => void;
}

const nodeTypes = {
  customeNode: CustomeNode,
};

const FlowChart = ({ initElements, isEditable, onEdit }: $Props) => {
  const [elements, setElements] = useState<FlowElement[]>(initElements);
  const [activeElement, setActiveElement] = useState<FlowElement>();
  const [showEditDialog, setEditDialaog] = useState<boolean>();

  useEffect(() => {
    if (onEdit !== undefined && initElements !== elements) onEdit(elements);
  }, [elements, onEdit, initElements]);

  const addNewNode = () => {
    let id: number = 0;
    elements.forEach((elm) => {
      if (+elm.id >= id) id = +elm.id + 1;
    });
    const newNode: Elements = [
      {
        id: id.toString(),
        type: "customeNode",
        data: {
          label: "New Node",
        },
        position: { x: 250 + elements.length * 15, y: 0 + elements.length * 15 },
      },
    ];
    setElements((els: Elements) => els.concat(newNode));
  };
  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els: Elements) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => {
    params = {
      ...params,
      type: "smoothstep",
      label: "Test",
      labelBgStyle: { fill: "#1F2340", fillOpacity: 1.0 },
      labelStyle: { fill: "white" },
    };
    setElements((els: Elements) => addEdge(params, els));
  };
  const onLoad = (reactFlowInstance: any) => {
    console.log("flow loaded:", reactFlowInstance);
    reactFlowInstance.fitView();
  };
  const onElementClick = (event: MouseEvent, elm: any) => {
    if (isEdge(elm)) {
      elements.forEach((el) => {
        if (el.id === elm.id && isEdge(el)) {
          elm.label = el.label;
        }
      });
    }
    setActiveElement(elm);
    setEditDialaog(true);
  };
  const onSave = (newElm: FlowElement) => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === newElm.id) {
          return newElm;
        }
        return el;
      })
    );
    setEditDialaog(false);
  };

  const onNodeDragStop = (event: MouseEvent, node: Node) => {
    setElements((els: Elements) =>
      els.map((el: any) => {
        if (node.id === el.id) el.position = node.position;
        return el;
      })
    );
  };

  return (
    <FlowContainer>
      <ReactFlow
        elements={elements}
        onNodeDragStop={onNodeDragStop}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        connectionMode={ConnectionMode.Loose}
        snapGrid={[15, 15]}
        elementsSelectable={isEditable}
        nodesConnectable={isEditable}
        nodesDraggable={isEditable}
        onElementClick={isEditable ? onElementClick : undefined}
        deleteKeyCode={46}
      >
        <Controls />
        <Background color="#aaa" gap={15} />
      </ReactFlow>
      {isEditable && (
        <FlowBar>
          <IconButton icon={faPlus} onClick={() => addNewNode()} />
        </FlowBar>
      )}
      {showEditDialog && activeElement && (
        <EditDialog
          activeElement={activeElement}
          onSave={onSave}
          onClose={() => setEditDialaog(false)}
        ></EditDialog>
      )}
    </FlowContainer>
  );
};

export default FlowChart;

const FlowBar = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 0px;
  right: 0px;
`;

const FlowContainer = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  padding: 5px;
  width: 100%;
  height: calc(100vh - 260px);
  min-height: 50vh;
  border-radius: 5px;
  position: relative;
`;
