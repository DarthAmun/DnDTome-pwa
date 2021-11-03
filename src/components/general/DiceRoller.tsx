import { useState } from "react";
import { FaDice } from "react-icons/fa";
import { InputGroup, Input } from "rsuite";
import styled from "styled-components";
import { rollCommand } from "../../services/DiceService";

interface $Props {
  dice: string;
}

const DiceRoller = ({ dice }: $Props) => {
  const [field, setField] = useState<string>(dice);
  const [results, setResults] = useState<string[]>([]);

  const roll = () => {
    if (field !== "") {
      const { text, result, rolls } = rollCommand(field);
      const resultText = field + ": " + result + rolls.replaceAll("`", "") + " " + text;
      setResults((r) => [resultText, ...r]);
    }
  };

  const whenClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <DiceRollerConatiner onClick={whenClick}>
      <InputGroup style={{ width: "max-content" }}>
        <Input placeholder={"e.g. 2d8+3"} value={field} onChange={(val: any) => setField(val)} />
        <InputGroup.Button onClick={(e) => roll()}>
          <FaDice />
        </InputGroup.Button>
      </InputGroup>
      <ResultContainer>
        {results.length > 0 &&
          results.map((result: string, index: number) => {
            return <RollResult key={index}>{index === 0 ? <b>{result}</b> : result}</RollResult>;
          })}
      </ResultContainer>
    </DiceRollerConatiner>
  );
};

export default DiceRoller;

const DiceRollerConatiner = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.secondTextColor};
  background-color: ${({ theme }) => theme.mainColor};
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ResultContainer = styled.div`
  flex: 1 1 100%;
  max-height: 200px;
  overflow-y: scroll;
  margin: 5px;
`;

const RollResult = styled.div`
  flex: 1 1 100%;
  padding: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  margin-bottom: 3px;
`;
