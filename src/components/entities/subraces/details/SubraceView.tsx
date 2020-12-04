import React, { useState } from "react";
import Trait from "../../../../data/races/Trait";
import Subrace from "../../../../data/races/Subrace";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { GiUpgrade } from "react-icons/gi";
import FormatedText from "../../../general_elements/FormatedText";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";

interface $Props {
  subrace: Subrace;
}

const SubraceView = ({ subrace }: $Props) => {
  const [send, setSend] = useState<boolean>(false);
  
  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{subrace.name}</b>
        </Name>
        <PropWrapper>
          <Prop>
            <GiUpgrade />
            {subrace.abilityScores}
          </Prop>
          <Prop>
            <PropTitle>Race:</PropTitle>
            {subrace.type}
          </Prop>
          <Prop>
            <Icon icon={faLink} />
            {subrace.sources}
          </Prop>
        </PropWrapper>
      </View>
      <View>
        <PropWrapper>
          {subrace.traits.map((trait: Trait, index: number) => {
            return (
              <TraitWrapper key={index}>
                <TraitName>{trait.name}</TraitName>
                <TraitLevel>{trait.level}</TraitLevel>
                <TraitText>
                  <FormatedText text={trait.text} />
                </TraitText>
              </TraitWrapper>
            );
          })}
        </PropWrapper>
      </View>
      <View>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${subrace.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={subrace} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default SubraceView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 auto;
  max-width: 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
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

  svg {
    margin-right: 5px;
    height: auto;
    border-radius: 150px;
    transition: color 0.2s;
    color: ${({ theme }) => theme.main.highlight};
  }
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const TraitWrapper = styled(PropWrapper)``;
const TraitName = styled.div`
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  margin: 2px;
  flex: 3 3 auto;
`;
const TraitLevel = styled(TraitName)`
  flex: 1 1 auto;
`;
const TraitText = styled(TraitName)`
  flex: 4 4 auto;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;
