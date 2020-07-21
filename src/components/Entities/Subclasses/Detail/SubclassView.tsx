import React, { useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Subclass from "../../../../Data/Subclass";
import Trait from "../../../../Data/Trait";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  subclass: Subclass;
}

const SubclassView = ({ subclass }: $Props) => {
  let history = useHistory();

  const formatText = useCallback(
    (text: String) => {
      if (subclass !== undefined) {
        let parts: string[] = text.split("[[");
        return parts.map((part: string, index: number) => {
          if (part.includes("]]")) {
            const codePart: string[] = part.split("]]");
            const linkParts: string[] = codePart[0].split(".");
            const link: string =
              "/" + linkParts[0] + "-detail/name/" + linkParts[1];
            return (
              <span key={index}>
                <Link onClick={() => history.push(link)}>
                  {linkParts[1]}
                </Link>
                {codePart[1]}
              </span>
            );
          } else {
            return (
              <span key={index}>
                {part}
              </span>
            );
          }
        });
      }
      return "";
    },
    [subclass, history]
  );
  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>
            {subclass.name}
          </b>
        </Name>
        <PropWrapper>
        <Prop>
            <PropTitle>Class:</PropTitle>
            {subclass.type}
          </Prop>
          <Prop>
            <Icon icon={faLink} />
            {subclass.sources}
          </Prop>
        </PropWrapper>
      </View>
      <View>
        <PropWrapper>
          {subclass.features.map((feature: Trait, index: number) => {
            return (
              <TraitWrapper key={index}>
                <TraitName>
                  {feature.name}
                </TraitName>
                <TraitLevel>{feature.level}</TraitLevel>
                <TraitText>
                  {formatText(feature.text)}
                </TraitText>
              </TraitWrapper>
            );
          })}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default SubclassView;

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

const Link = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 10px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;
