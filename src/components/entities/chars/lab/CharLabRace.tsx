import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Race from "../../../../data/races/Race";
import Trait from "../../../../data/races/Trait";
import Subrace from "../../../../data/races/Subrace";
import Class from "../../../../data/classes/Class";
import { reciveAll, reciveAllFiltered } from "../../../../services/DatabaseService";

import IconButton from "../../../form_elements/IconButton";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../general_elements/FormatedText";
import SingleSelectField from "../../../form_elements/SingleSelectField";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabRace = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);

  const [races, setRaces] = useState<Race[]>();
  const [subraces, setSubraces] = useState<Subrace[]>();

  useEffect(() => {
    reciveAllFiltered(
      "classes",
      [
        {
          fieldName: "name",
          value: char.classes.map((classe) => {
            return classe.classe;
          }),
          sort: 0,
        },
      ],
      (results: any[]) => {
        setClasses(results);
      }
    );
  }, [char.classes]);

  useEffect(() => {
    reciveAll("races", (results: any[]) => {
      setRaces(results);
    });
    reciveAll("subraces", (results: any[]) => {
      setSubraces(results);
    });
  }, []);

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
        {races && subraces && (
          <CharView>
            <SingleSelectField
              options={races?.map((c) => {
                return { value: c.name, label: c.name };
              })}
              value={char.race.race}
              label="Race *"
              onChange={(race) => onChange({ ...char, race: { ...char.race, race: race } })}
            />
            <SingleSelectField
              options={subraces
                ?.filter((s) => s.type === char.race.race)
                .map((c) => {
                  return { value: c.name, label: c.name };
                })}
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
              {char.race &&
                races
                  .filter((r) => r.name === char.race.race)
                  .map((race) => {
                    return (
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
                    );
                  })}
              {char.race.subrace &&
                subraces
                  .filter((r) => r.name === char.race.subrace)
                  .map((subrace) => {
                    return (
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
                    );
                  })}
            </PropWrapper>
          </CharView>
        )}
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
