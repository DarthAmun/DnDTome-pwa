import { ReactNode } from "react";
import { Panel } from "rsuite";
import styled from "styled-components";

interface $Props {
  children: ReactNode;
  onClick?: () => void;
}
const Card = ({ children, onClick }: $Props) => {
  return (
    <CardWrapper onClick={onClick}>
      <Panel shaded>{children}</Panel>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  flex: 1 1;
  cursor: pointer;
  background-color: #272c4a;
  max-width: max-content;
`;

export const Cards = styled.div`
  display: flex;
  gap: 10px;
`;
