import React, { memo } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import styled from "styled-components";
import FormatedText from "../FormatedText";

export default memo(({ data }: Node) => {
  return (
    <StyledNode>
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div>
        <FormatedText text={data.label} />
      </div>
      <Handle type="source" position={Position.Right} id="c" style={{ background: "#555" }} />
      <Handle type="source" position={Position.Bottom} id="d" style={{ background: "#555" }} />
    </StyledNode>
  );
});

const StyledNode = styled.div`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  padding: 10px;
  border-radius: 5px;
`;
