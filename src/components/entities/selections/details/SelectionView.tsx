import React, { useState } from "react";
import Selection from "../../../../data/Selection";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";
import FormatedText from "../../../general_elements/FormatedText";

interface $Props {
  selection: Selection;
}

const SelectionView = ({ selection }: $Props) => {
  const [send, setSend] = useState<boolean>(false);

  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{selection.name}</b>
        </Name>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${selection.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={selection} mode={"THIS"} />}
        </PropWrapper>
      </View>
      {selection.selectionOptions.map(
        (
          trait: {
            entityName: string;
            entityPrerequsite: string;
            entityText: string;
            level: number;
          },
          index: number
        ) => {
          return (
            <View key={index}>
              <PropWrapper>
                <Prop>
                  <PropTitle>Name:</PropTitle>
                  {trait.entityName}
                </Prop>
                <Prop>
                  <PropTitle>Level:</PropTitle>
                  {trait.level}
                </Prop>
                {trait.entityPrerequsite !== "" && (
                  <Prop>
                    <PropTitle>Prerequisite:</PropTitle>
                    {trait.entityPrerequsite}
                  </Prop>
                )}
                <Text>
                  <FormatedText text={trait.entityText} />
                </Text>
              </PropWrapper>
            </View>
          );
        }
      )}
    </CenterWrapper>
  );
};

export default SelectionView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 24px);
  margin: 5px 2px 5px 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;
