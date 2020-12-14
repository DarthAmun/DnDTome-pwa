import React from "react";
import styled from "styled-components";

interface $Props {
  children: string[];
  activeTab?: string;
  onChange: (name: string) => void;
}

const TabBar = ({ children, activeTab, onChange }: $Props) => {
  return (
    <Bar>
      {children.map((child, index) => {
        return (
          <Tab key={index} onClick={(e) => onChange(child)} isActive={child === activeTab}>
            {child}
          </Tab>
        );
      })}
    </Bar>
  );
};

export default TabBar;

const Bar = styled.div`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  overflow: hidden;
  min-width: calc(100% - 20px);
  flex: 1 1 auto;
  padding: 3px;
  margin: 5px;
  border-radius: 10px;
  position: relative;
  z-index: 100;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
`;

type ActiveType = {
  isActive?: boolean;
};

const Tab = styled.div<ActiveType>`
  flex: 3 1 auto;
  height: 30px;
  line-height: 20px;
  padding: 5px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin: 2px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.buttons.backgroundColor};
    color: ${({ theme }) => theme.buttons.color};
  }

  ${(props) => {
    if (props.isActive) {
      return `background-color: ${props.theme.buttons.backgroundColor}; 
      color: ${props.theme.buttons.color};`;
    }
  }}
`;
