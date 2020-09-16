import React from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import IconButton from "../../../FormElements/IconButton";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AutoStringField from "../../../FormElements/AutoStringField";

interface $Props {
  char: Char;
  onChange: (character: Char) => void;
  completed: (completed: boolean, nextTab: string) => void;
}

const CharLabRace = ({ char, onChange, completed }: $Props) => {
  return (
    <CenterWrapper>
      <CharView>
        <AutoStringField
          optionTable={"races"}
          value={char.race.race}
          label="Race"
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
          disabled={
            !(
              char &&
              char.race &&
              char.race.race.length > 1 &&
              char.race.subrace.length > 1
            )
          }
          onClick={() => completed(true, "Abilities")}
        />
      </CharView>
    </CenterWrapper>
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
