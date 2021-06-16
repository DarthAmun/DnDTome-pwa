import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../form_elements/TextButton";
import NumberField from "../form_elements/NumberField";
import BuildChar from "../../data/chars/BuildChar";
import { rollCommand } from "../../services/DiceService";

interface $Props {
  message: string;
  icon?: IconDefinition;
  confirmeText: string;
  confirmeClick: () => void;
  abortText: string;
  abortClick: () => void;
}

export const Dialog = ({
  message,
  icon,
  confirmeText,
  confirmeClick,
  abortText,
  abortClick,
}: $Props) => {
  return (
    <DialogWrapper>
      <Message>
        {icon ? <Icon icon={icon} /> : ""} {message}
      </Message>
      <ButtonBar>
        <TextButton text={abortText} onClick={abortClick} />
        <TextButton text={confirmeText} onClick={confirmeClick} />
      </ButtonBar>
    </DialogWrapper>
  );
};

interface $DamageProps {
  name: string;
  damageText: string;
  damageClick: (value: number) => void;
  healText: string;
  healClick: (value: number) => void;
  abortText: string;
  abortClick: () => void;
}
export const DamageDialog = ({
  name,
  damageText,
  damageClick,
  healText,
  healClick,
  abortText,
  abortClick,
}: $DamageProps) => {
  const [dmg, setDmg] = useState<number>(0);
  return (
    <DialogWrapper>
      <NumberField value={dmg} label={name} onChange={setDmg} />
      <ButtonBar>
        <TextButton text={abortText} onClick={abortClick} />
        <TextButton text={damageText} onClick={() => damageClick(dmg)} style={{ float: "left" }} />
        <TextButton
          text={healText}
          onClick={() => healClick(dmg)}
          style={{ backgroundColor: "lightgreen", float: "left" }}
        />
      </ButtonBar>
    </DialogWrapper>
  );
};

interface $ShortRestProps {
  buildChar: BuildChar;
  healText: string;
  healClick: (value: number) => void;
  abortText: string;
  abortClick: () => void;
}
export const ShortRestDialod = ({
  buildChar,
  healText,
  healClick,
  abortText,
  abortClick,
}: $ShortRestProps) => {
  const [values, setValues] = useState<number[]>([]);
  const [maxValues, setMaxValues] = useState<number[]>([]);
  const [hitDices, setHitDices] = useState<string[]>([]);

  useEffect(() => {
    let newValues: number[] = [];
    let newMaxValues: number[] = [];
    let newHitDices: string[] = [];
    buildChar.character.classes.forEach((classe) => {
      buildChar.classes.forEach((classesClass) => {
        if (classe.classe === classesClass.name + "|" + classesClass.sources) {
          newValues.push(classe.level);
          newMaxValues.push(classe.level);
          newHitDices.push(classesClass.hitDices);
        }
      });
    });
    setValues(newValues);
    setMaxValues(newMaxValues);
    setHitDices(newHitDices);
  }, [buildChar]);

  const changeValue = (value: number, i: number) => {
    let newValues = [...values];
    newValues[i] = value;
    setValues(newValues);
  };
  const heal = () => {
    let heal = 0;
    let newCommand = "";
    values.forEach((val: number, i) => {
      newCommand += val + hitDices[i] + "+";
    });
    newCommand = newCommand.slice(0, -1);

    heal = rollCommand(newCommand).result;
    healClick(heal);
  };

  return (
    <DialogWrapper>
      <ButtonBar>
        {values.length > 0 &&
          values.map((val: number, i) => {
            return (
              <>
                <NumberField
                  key={i}
                  value={val}
                  max={maxValues[i]}
                  label="Amount"
                  onChange={(value) => changeValue(value, i)}
                />
                of {hitDices[i]}
              </>
            );
          })}
        <TextButton text={abortText} onClick={abortClick} />
        <TextButton
          text={healText}
          onClick={() => heal()}
          style={{ backgroundColor: "lightgreen", float: "left" }}
        />
      </ButtonBar>
    </DialogWrapper>
  );
};

const DialogWrapper = styled.div`
  width: 280px;
  position: fixed;
  z-index: 1010;
  top: 100px;
  left: calc(50% - 150px);
  padding: 10px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  color: ${({ theme }) => theme.tile.color};
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
`;

const ButtonBar = styled.div`
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)`
  flex: 1 1 auto;
  margin-right: 5px;
`;
