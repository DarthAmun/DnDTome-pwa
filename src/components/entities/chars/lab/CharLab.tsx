import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { saveWithCallback } from "../../../../services/DatabaseService";
import Char from "../../../../data/chars/Char";

import { faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../form_elements/IconButton";
import TabBar from "../../../general_elements/TabBar";
import CharLabGeneral from "./CharLabGeneral";
import CharLabClass from "./CharLabClass";
import CharLabRace from "./CharLabRace";
import CharLabAbilities from "./CharLabAbilities";
import CharLabEquipment from "./CharLabEquipment";
import { useQuery } from "../../../../hooks/QueryHook";
import CharLabBackground from "./CharLabBackground";
import { recalcClasses } from "../../../../services/CharacterService";
import CharView from "../details/CharView";

const CharLab = () => {
  let history = useHistory();
  const name = useQuery().get("name");
  const [activeTab, setTab] = useState<string>("General");
  const [newChar, updateChar] = useState<Char>(new Char(-1, name !== null ? name : ""));

  const [completedGeneral, setGeneral] = useState<boolean>(false);
  const [completedClass, setClass] = useState<boolean>(false);
  const [completedRace, setRace] = useState<boolean>(false);
  const [completedBackground, setBackground] = useState<boolean>(false);
  const [completedAbilities, setAbilities] = useState<boolean>(false);
  const [completedEquipment, setEquipment] = useState<boolean>(false);

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
  const updateBackground = (value: boolean, nextTab: string) => {
    setBackground(value);
    setTab(nextTab);
  };
  const updateAbilities = (value: boolean, nextTab: string) => {
    setAbilities(value);
    setTab(nextTab);
  };
  const updateEquipment = (value: boolean, nextTab: string) => {
    setEquipment(value);
    setTab(nextTab);
  };

  const saveChar = () => {
    recalcClasses(newChar).then((updatedChar) => {
      delete updatedChar["id"];
      saveWithCallback("chars", updatedChar, (result) => {
        history.push(`/char-detail/id/${result}`);
      });
    });
  };

  return (
    <>
      <TabBar
        children={["General", "Class", "Race", "Background", "Abilities", "Equipment", "Finished"]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      <CenterWrapper>
        <View>
          {activeTab === "General" && (
            <>
              {!completedGeneral && (
                <CharLabGeneral char={newChar} onChange={updateChar} completed={updateGeneral} />
              )}
              {completedGeneral && (
                <PropWrapper>
                  <Prop>Would you like to edit general again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setGeneral(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Class" && (
            <>
              {!completedClass && (
                <CharLabClass char={newChar} onChange={updateChar} completed={updateClass} />
              )}
              {completedClass && (
                <PropWrapper>
                  <Prop>Would you like to edit classes again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setClass(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Race" && (
            <>
              {!completedRace && (
                <CharLabRace char={newChar} onChange={updateChar} completed={updateRace} />
              )}
              {completedRace && (
                <PropWrapper>
                  <Prop>Would you like to edit the race again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setRace(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Background" && (
            <>
              {!completedBackground && (
                <CharLabBackground
                  char={newChar}
                  onChange={updateChar}
                  completed={updateBackground}
                />
              )}
              {completedBackground && (
                <PropWrapper>
                  <Prop>Would you like to edit the background again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setBackground(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Abilities" && (
            <>
              {!completedAbilities && (
                <CharLabAbilities
                  char={newChar}
                  onChange={updateChar}
                  completed={updateAbilities}
                />
              )}
              {completedAbilities && (
                <PropWrapper>
                  <Prop>Would you like to edit abilities again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setAbilities(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Equipment" && (
            <>
              {!completedEquipment && (
                <CharLabEquipment
                  char={newChar}
                  onChange={updateChar}
                  completed={updateEquipment}
                />
              )}
              {completedEquipment && (
                <PropWrapper>
                  <Prop>Would you like to edit equipment again? </Prop>
                  <IconButton icon={faEdit} onClick={() => setEquipment(false)} />
                </PropWrapper>
              )}
            </>
          )}
          {activeTab === "Finished" && (
            <>
              {(!completedGeneral ||
                !completedClass ||
                !completedRace ||
                !completedBackground ||
                !completedAbilities ||
                !completedGeneral ||
                !completedEquipment) && (
                <PropWrapper>
                  <Prop>Somthing is not finished!</Prop>
                </PropWrapper>
              )}
              {completedGeneral &&
                completedClass &&
                completedRace &&
                completedBackground &&
                completedAbilities &&
                completedGeneral &&
                completedEquipment && (
                  <>
                    <PropWrapper>
                      <Prop>Create Char?</Prop>
                      <IconButton icon={faCheckCircle} onClick={() => saveChar()} />
                    </PropWrapper>
                    <CharView
                      character={newChar}
                      modifications={true}
                      saveChar={() => undefined}
                    ></CharView>
                  </>
                )}
            </>
          )}
        </View>
      </CenterWrapper>
    </>
  );
};

export default CharLab;

const CenterWrapper = styled.div`
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
