import React from "react";
import styled from "styled-components";
import Race from "../../../../Data/Race";

import StringField from "../../../FormElements/StringField";
import ShortTextField from "../../../FormElements/ShortTextField";

import { faLink, faImage } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  race: Race;
  onEdit: (value: Race) => void;
}

const RaceEditView = ({ race, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={race.name}
          label="Name"
          onChange={(name) => onEdit({ ...race, name: name })}
        />
        <StringField
          value={race.type}
          label="Type"
          onChange={(type) => onEdit({ ...race, type: type })}
        />
        <StringField
          value={race.abilityScores}
          label="Ability Scores"
          onChange={(abilityScores) =>
            onEdit({ ...race, abilityScores: abilityScores })
          }
        />
        <ShortTextField
          value={race.age}
          label="Age"
          onChange={(age) => onEdit({ ...race, age: age })}
        />
        <ShortTextField
          value={race.alignment}
          label="Alignment"
          onChange={(alignment) => onEdit({ ...race, alignment: alignment })}
        />
        <ShortTextField
          value={race.size}
          label="Size"
          onChange={(size) => onEdit({ ...race, size: size })}
        />
        <ShortTextField
          value={race.speed}
          label="Speed"
          onChange={(speed) => onEdit({ ...race, speed: speed })}
        />
        <ShortTextField
          value={race.lang}
          label="Language"
          onChange={(lang) => onEdit({ ...race, lang: lang })}
        />
        <StringField
          value={race.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...race, pic: pic })}
        />
        <StringField
          value={race.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...race, sources: sources })}
        />
      </View>
    </CenterWrapper>
  );
};

export default RaceEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
