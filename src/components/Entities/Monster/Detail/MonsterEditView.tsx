import React from "react";
import styled from "styled-components";
import Monster from "../../../../Data/Monster";

import StringField from "../../../FormElements/StringField";
import NumberField from "../../../FormElements/NumberField";
import TextField from "../../../FormElements/TextField";

import { faLink, faBookOpen, faImage } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  monster: Monster;
  onEdit: (value: Monster) => void;
}

const MonsterEditView = ({ monster, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={monster.name}
          label="Name"
          onChange={(name) => onEdit({ ...monster, name: name })}
        />
        <StringField
          value={monster.type}
          label="Type"
          onChange={(type) => onEdit({ ...monster, type: type })}
        />
        <StringField
          value={monster.subtype}
          label="Subtype"
          onChange={(subtype) => onEdit({ ...monster, subtype: subtype })}
        />
        <StringField
          value={monster.alignment}
          label="Alignment"
          onChange={(alignment) => onEdit({ ...monster, alignment: alignment })}
        />
        <StringField
          value={monster.cr}
          label="CR"
          onChange={(cr) => onEdit({ ...monster, cr: cr })}
        />
        <FieldGroup>
          <StringField
            value={monster.hp}
            label="Hp"
            onChange={(hp) => onEdit({ ...monster, hp: hp })}
          />
          <NumberField
            value={monster.ac}
            label="Ac"
            onChange={(ac) => onEdit({ ...monster, ac: ac })}
          />
        </FieldGroup>
        <FieldGroup>
          <NumberField
            value={monster.str}
            label="Strength"
            onChange={(str) => onEdit({ ...monster, str: str })}
          />
          <NumberField
            value={monster.dex}
            label="Dexterity"
            onChange={(dex) => onEdit({ ...monster, dex: dex })}
          />
        </FieldGroup>
        <FieldGroup>
          <NumberField
            value={monster.con}
            label="Constitution"
            onChange={(con) => onEdit({ ...monster, con: con })}
          />
          <NumberField
            value={monster.int}
            label="Intelligence"
            onChange={(int) => onEdit({ ...monster, int: int })}
          />
        </FieldGroup>
        <FieldGroup>
          <NumberField
            value={monster.wis}
            label="Wisdome"
            onChange={(wis) => onEdit({ ...monster, wis: wis })}
          />
          <NumberField
            value={monster.cha}
            label="Charisma"
            onChange={(cha) => onEdit({ ...monster, cha: cha })}
          />
        </FieldGroup>
        <StringField
          value={monster.speed}
          label="Speed"
          onChange={(speed) => onEdit({ ...monster, speed: speed })}
        />
        <StringField
          value={monster.senses}
          label="Senses"
          onChange={(senses) => onEdit({ ...monster, senses: senses })}
        />
        <StringField
          value={monster.lang}
          label="Lang"
          onChange={(lang) => onEdit({ ...monster, lang: lang })}
        />
        <StringField
          value={monster.savingThrows}
          label="Saving Throws"
          onChange={(savingThrows) =>
            onEdit({ ...monster, savingThrows: savingThrows })
          }
        />
        <StringField
          value={monster.skills}
          label="Skills"
          onChange={(skills) => onEdit({ ...monster, skills: skills })}
        />
        <StringField
          value={monster.dmgVulnerabilitie}
          label="Vulnerabilities"
          onChange={(dmgVulnerabilitie) =>
            onEdit({ ...monster, dmgVulnerabilitie: dmgVulnerabilitie })
          }
        />
        <StringField
          value={monster.dmgResistance}
          label="Resistances"
          onChange={(dmgResistance) =>
            onEdit({ ...monster, dmgResistance: dmgResistance })
          }
        />
        <StringField
          value={monster.dmgImmunities}
          label="Immunities"
          onChange={(dmgImmunities) =>
            onEdit({ ...monster, dmgImmunities: dmgImmunities })
          }
        />
        <StringField
          value={monster.conImmunities}
          label="Condition Immunities"
          onChange={(conImmunities) =>
            onEdit({ ...monster, conImmunities: conImmunities })
          }
        />
        <StringField
          value={monster.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...monster, sources: sources })}
        />
        <StringField
          value={monster.pic}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...monster, pic: pic })}
        />
        <TextField
          value={monster.ablt}
          label="Abilites"
          icon={faBookOpen}
          onChange={(ablt) => onEdit({ ...monster, ablt: ablt })}
        />
        <TextField
          value={monster.sAblt}
          label="Spezial Abilities"
          icon={faBookOpen}
          onChange={(sAblt) => onEdit({ ...monster, sAblt: sAblt })}
        />
        <TextField
          value={monster.lAblt}
          label="Legendary Abilities"
          icon={faBookOpen}
          onChange={(lAblt) => onEdit({ ...monster, lAblt: lAblt })}
        />
      </View>
    </CenterWrapper>
  );
};

export default MonsterEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const FieldGroup = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
