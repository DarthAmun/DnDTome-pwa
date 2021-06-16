import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Char from "../../../../data/chars/Char";
import Race from "../../../../data/races/Race";
import Subrace from "../../../../data/races/Subrace";
import Class from "../../../../data/classes/Class";
import {
  reciveAll,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../../services/DatabaseService";

import IconButton from "../../../form_elements/IconButton";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import FormatedText from "../../../general_elements/FormatedText";
import SingleSelectField from "../../../form_elements/SingleSelectField";
import ClassSet from "../../../../data/chars/ClassSet";
import Background from "../../../../data/Background";
import { recalcClasses } from "../../../../services/CharacterService";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabBackground = ({ char, onChange, completed }: $Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [race, setRace] = useState<Race>();
  const [subrace, setSubrace] = useState<Subrace>();
  const [backgrounds, setBackgrounds] = useState<Background[]>();

  useEffect(() => {
    let classList: Promise<Class>[] = [];
    char.classes.forEach((classe: ClassSet) => {
      let [name, sources] = classe.classe.split("|");
      if (sources !== undefined) {
        classList.push(recivePromiseByMultiAttribute("classes", { name: name, sources: sources }));
      } else {
        classList.push(recivePromiseByAttribute("classes", "name", name));
      }
    });
    Promise.all(classList).then(setClasses);
  }, [char.classes]);

  useEffect(() => {
    if (char.race && char.race.race.length > 1) {
      let [name, sources] = char.race.race.split("|");
      recivePromiseByMultiAttribute("races", { name: name, sources: sources }).then(setRace);
    }
  }, [char]);

  useEffect(() => {
    if (char.race && char.race.subrace.length > 1) {
      let [name, sources] = char.race.subrace.split("|");
      recivePromiseByMultiAttribute("subraces", { name: name, sources: sources }).then(setSubrace);
    }
  }, [char]);

  useEffect(() => {
    reciveAll("backgrounds", (results: any[]) => {
      setBackgrounds(results);
    });
  }, []);

  const onComplete = () => {
    recalcClasses(char).then((newChar) => {
      onChange(newChar);
      completed(true, "Abilities");
    });
  };

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
            <Text>
              {race && (
                <>
                  <PropTitle>{race.name}:</PropTitle>
                  <FormatedText text={race.abilityScores} />
                </>
              )}
              <br />
              {subrace && (
                <>
                  <PropTitle>{subrace.name}:</PropTitle>
                  <FormatedText text={subrace.abilityScores} />
                </>
              )}
            </Text>
          </PropWrapper>
        </CharView>
      </CenterWrapper>
      <CenterWrapper>
        {backgrounds && (
          <CharView>
            <SingleSelectField
              options={backgrounds?.map((c) => {
                return { value: c.name + "|" + c.sources, label: c.name + "|" + c.sources };
              })}
              value={char.background}
              label="Background *"
              onChange={(background) => onChange({ ...char, background: background })}
            />
            <IconButton
              icon={faCheckCircle}
              disabled={!(char && char.background)}
              onClick={() => onComplete()}
            />
            <PropWrapper>
              {char.background &&
                backgrounds
                  .filter(
                    (r) =>
                      r.name === char.background.split("|")[0] &&
                      r.sources === char.background.split("|")[1]
                  )
                  .map((background) => {
                    return (
                      <Text>
                        <PropTitle>{background.name}:</PropTitle>
                        <FormatedText text={background.proficiencies} />
                        <br />
                        <FormatedText text={background.description} />
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

export default CharLabBackground;

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
