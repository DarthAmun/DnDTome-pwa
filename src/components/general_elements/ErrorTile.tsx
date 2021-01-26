import React from "react";
import styled from "styled-components";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../form_elements/TextButton";

interface $Props {
  text: string;
  buttonText: string;
  onButton: () => void;
}

const ErrorTile = ({ text, buttonText, onButton }: $Props) => {
  return (
    <Tile>
      <PropWrapper>
        <Name>
          <b>A problem occured!</b>
        </Name>
        <Text>
          <PropTitle>Text: </PropTitle>
          {text}
        </Text>
        <TextButton text={buttonText} onClick={() => onButton()} icon={faPlusCircle} />
      </PropWrapper>
    </Tile>
  );
};

export default ErrorTile;

const Tile = styled.div`
  flex: 1 1 15em;
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tile.boxShadow};
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 0 5px 5px 5px;
  font-size: 14px;
  width: calc(100% - 30px);
  color: ${({ theme }) => theme.tile.headerColor};
  text-align: center;
  border-radius: 5px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 10px);
  float: left;
  padding: 5px 5px 0 5px;
  display: flex;
  flex-wrap: wrap;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;
