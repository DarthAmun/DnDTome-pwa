import React, { useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AppWrapper from "../../../AppWrapper";
import IconButton from "../../../FormElements/IconButton";
import TabBar from "../../../GeneralElements/TabBar";
import CharLabGeneral from "./CharLabGeneral";
import CharLabClass from "./CharLabClass";
import CharLabRace from "./CharLabRace";

const CharLab = () => {
  const [activeTab, setTab] = useState<string>("General");
  const [newChar, updateChar] = useState<Char>(new Char());

  const [completedGeneral, setGeneral] = useState<boolean>(false);
  const [completedClass, setClass] = useState<boolean>(false);
  const [completedRace, setRace] = useState<boolean>(false);

  const updateGeneral = (value: boolean, nextTab: string) => {
    setGeneral(value);
    setTab(nextTab);
  };
  const updateClass = (value: boolean, nextTab: string) => {
    setClass(value);
    setTab(nextTab);
  };
  const updateRace = (value: boolean, nextTab: string) => {
    setRace(value);
    setTab(nextTab);
  };

  return (
    <AppWrapper>
      <TabBar
        children={[
          "General",
          "Class",
          "Race",
          "Abilities",
          "Equipment",
          "Spell",
          "Monster",
          "Finished",
        ]}
        onChange={(tab: string) => setTab(tab)}
      />
      <CenterWrapper>
        <View>
          {activeTab === "General" && (
            <>
              {!completedGeneral && (
                <CharLabGeneral
                  char={newChar}
                  onChange={updateChar}
                  completed={updateGeneral}
                />
              )}
              {completedGeneral && (
                <>
                  <PropWrapper>
                    <Prop>Would you like to edit general again? </Prop>
                    <IconButton
                      icon={faEdit}
                      onClick={() => setGeneral(false)}
                    />
                  </PropWrapper>
                </>
              )}
            </>
          )}
          {activeTab === "Class" && (
            <>
              {!completedClass && (
                <CharLabClass
                  char={newChar}
                  onChange={updateChar}
                  completed={updateClass}
                />
              )}
              {completedClass && (
                <>
                  <PropWrapper>
                    <Prop>Would you like to edit classes again? </Prop>
                    <IconButton
                      icon={faEdit}
                      onClick={() => setClass(false)}
                    />
                  </PropWrapper>
                </>
              )}
            </>
          )}
           {activeTab === "Race" && (
            <>
              {!completedRace && (
                <CharLabRace
                  char={newChar}
                  onChange={updateChar}
                  completed={updateRace}
                />
              )}
              {completedRace && (
                <>
                  <PropWrapper>
                    <Prop>Would you like to edit race again? </Prop>
                    <IconButton
                      icon={faEdit}
                      onClick={() => setRace(false)}
                    />
                  </PropWrapper>
                </>
              )}
            </>
          )}
        </View>
      </CenterWrapper>
    </AppWrapper>
  );
};

export default CharLab;

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
  padding: 5px;
  margin: 5px;
  height: 100%;
  width: min-content;
  min-width: 300px;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;

const PropWrapper = styled.div`
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
