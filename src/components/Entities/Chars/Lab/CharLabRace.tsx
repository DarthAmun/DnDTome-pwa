import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";
import Race from "../../../../Data/Races/Race";
import Trait from "../../../../Data/Races/Trait";
import Subrace from "../../../../Data/Races/Subrace";
import Class from "../../../../Data/Classes/Class";
import { reciveAllFiltered } from "../../../../Services/DatabaseService";

import IconButton from "../../../FormElements/IconButton";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AutoStringField from "../../../FormElements/AutoStringField";
import FormatedText from "../../../GeneralElements/FormatedText";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabRace = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);

  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      [
        {
          fieldName: "name",
          value: char.classes.map((classe) => {
            return classe.classe;
          }),
        },
      ],
      (results: any[]) => {
        setClasses(results);
      }
    );
  }, [char.classes]);

  useEffect(() => {
    if (char.race && char.race.race.length > 1) {
      reciveAllFiltered(
        "races",
        [{ fieldName: "name", value: char.race.race }],
        (results: any[]) => {
          setRace(results[0]);
        }
      );
    }
  }, [char]);

  useEffect(() => {
    if (char.race && char.race.subrace.length > 1) {
      reciveAllFiltered(
        "subraces",
        [{ fieldName: "name", value: char.race.subrace }],
        (results: any[]) => {
          setSubrace(results[0]);
        }
      );
    }
  }, [char]);

  return (
    <>
      <CenterWrapper>
        <CharView>
          <PropWrapper>
            {classes &&
              classes.map((classe: Class, index: number) => {
                return (
                  <Text key={index}>
                    <PropTitle>{classe.name}:</PropTitle>
                    <FormatedText text={classe.proficiencies} />
                  </Text>
                );
              })}
          </PropWrapper>
        </CharView>
      </CenterWrapper>
      <CenterWrapper>
        <CharView>
          <AutoStringField
            optionTable={"races"}
            value={char.race.race}
            label="Race *"
            onChange={(race) =>
              onChange({ ...char, race: { ...char.race, race: race } })
            }
          />
          <AutoStringField
            optionTable={"subraces"}
            value={char.race.subrace}
            label="Subrace"
            onChange={(subrace) =>
              onChange({ ...char, race: { ...char.race, subrace: subrace } })
            }
          />
          <IconButton
            icon={faCheckCircle}
            disabled={!(char && char.race && char.race.race.length > 1)}
            onClick={() => completed(true, "Abilities")}
          />
          <PropWrapper>
            {race && (
              <Text>
                <PropTitle>{race.name}:</PropTitle>
                <FormatedText text={race.abilityScores} />
                <br />
                <FormatedText text={race.speed} />
                {race.traits.map((trait: Trait, index: number) => {
                  return (
                    <TraitWrapper key={index}>
                      <TraitName>{trait.name}</TraitName>
                      <TraitLevel>Level: {trait.level}</TraitLevel>
                      <TraitText>
                        <FormatedText text={trait.text} />
                      </TraitText>
                    </TraitWrapper>
                  );
                })}
              </Text>
            )}
            {subrace && (
              <Text>
                <PropTitle>{subrace.name}:</PropTitle>
                <FormatedText text={subrace.abilityScores} />
                <br />
                <FormatedText text={subrace.type} />
                {subrace.traits.map((trait: Trait, index: number) => {
                  return (
                    <TraitWrapper key={index}>
                      <TraitName>{trait.name}</TraitName>
                      <TraitLevel>Level: {trait.level}</TraitLevel>
                      <TraitText>
                        <FormatedText text={trait.text} />
                      </TraitText>
                    </TraitWrapper>
                  );
                })}
              </Text>
            )}
          </PropWrapper>
        </CharView>
      </CenterWrapper>
    </>
  );
};

export default CharLabRace;

const CenterWrapper = styled.div`
  overflow: visible;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  margin: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;

const PropWrapper = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 0 0 5px 0;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const TraitWrapper = styled.div`
  width: calc(100% - 24px);
  padding: 10px;
  margin: 2px;
`;
const TraitName = styled.div`
  font-weight: bold;
`;
const TraitLevel = styled.div``;
const TraitText = styled.div``;
