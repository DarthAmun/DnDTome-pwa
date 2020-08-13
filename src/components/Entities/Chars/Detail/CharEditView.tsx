import React, { useState } from "react";
import styled from "styled-components";
import Char from "../../../../Data/Chars/Char";

import StringField from "../../../FormElements/StringField";
import TabBar from "../../../GeneralElements/TabBar";
import NumberField from "../../../FormElements/NumberField";
import TextField from "../../../FormElements/TextField";
import IconButton from "../../../FormElements/IconButton";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../FormElements/TextButton";

interface $Props {
  char: Char;
  onEdit: (value: Char) => void;
}

const CharEditView = ({ char, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  const removeSpell = (oldSpell: string) => {
    let newSpellList = char.spells.filter(spell => spell !== oldSpell);
    onEdit({ ...char, spells: newSpellList });
  };
  const addNewSpell = () => {
    let newSpellList = char.spells;
    newSpellList.push("");
    onEdit({ ...char, spells: newSpellList });
  };
  const onChangeSpell = (newSpell: string, oldSpell: string) => {
    let spells = char.spells.map((spell) => {
      if (spell === oldSpell) {
        return newSpell;
      } else {
        return spell;
      }
    })
    onEdit({ ...char, spells: spells });
  };

  const removeItem = (oldItem: string) => {
    let newItemList = char.items.filter(item => item !== oldItem);
    onEdit({ ...char, items: newItemList });
  };
  const addNewItem = () => {
    let newItemList = char.items;
    newItemList.push("");
    onEdit({ ...char, items: newItemList });
  };
  const onChangeItem = (newItem: string, oldItem: string) => {
    let items = char.items.map((item) => {
      if (item === oldItem) {
        return newItem;
      } else {
        return item;
      }
    })
    onEdit({ ...char, items: items });
  };

  const removeMonster = (oldMonster: string) => {
    let newMonsterList = char.monsters.filter(monster => monster !== oldMonster);
    onEdit({ ...char, monsters: newMonsterList });
  };
  const addNewMonster = () => {
    let newMonsterList = char.monsters;
    newMonsterList.push("");
    onEdit({ ...char, monsters: newMonsterList });
  };
  const onChangeMonster= (newMonster: string, oldMonster: string) => {
    let monsters = char.monsters.map((monster) => {
      if (monster === oldMonster) {
        return newMonster;
      } else {
        return monster;
      }
    })
    onEdit({ ...char, monsters: monsters });
  };

  return (
    <CenterWrapper>
      <CharView>
        <StringField
          value={char.name}
          label="Name"
          onChange={(name) => onEdit({ ...char, name: name })}
        />
        <StringField
          value={char.player}
          label="Player"
          onChange={(player) => onEdit({ ...char, player: player })}
        />
        <StringField
          value={char.pic}
          label="Picture"
          onChange={(pic) => onEdit({ ...char, pic: pic })}
        />
        <StringField
          value={char.background}
          label="Background"
          onChange={(background) => onEdit({ ...char, background: background })}
        />
        <StringField
          value={char.alignment}
          label="Alignment"
          onChange={(alignment) => onEdit({ ...char, alignment: alignment })}
        />
        <NumberField
          value={char.ac}
          label="Armor Class"
          onChange={(ac) => onEdit({ ...char, ac: ac })}
        />
        <NumberField
          value={char.hp}
          label="Hit Points"
          onChange={(hp) => onEdit({ ...char, hp: hp })}
        />
        <NumberField
          value={char.init}
          label="Initiative"
          onChange={(init) => onEdit({ ...char, init: init })}
        />
        <NumberField
          value={char.str}
          label="Strength"
          onChange={(str) => onEdit({ ...char, str: str })}
        />
        <NumberField
          value={char.dex}
          label="Dexterity"
          onChange={(dex) => onEdit({ ...char, dex: dex })}
        />
        <NumberField
          value={char.con}
          label="Constitution"
          onChange={(con) => onEdit({ ...char, con: con })}
        />
        <NumberField
          value={char.int}
          label="Intelligence"
          onChange={(int) => onEdit({ ...char, int: int })}
        />
        <NumberField
          value={char.wis}
          label="Wisdome"
          onChange={(wis) => onEdit({ ...char, wis: wis })}
        />
        <NumberField
          value={char.cha}
          label="Charisma"
          onChange={(cha) => onEdit({ ...char, cha: cha })}
        />
      </CharView>
      <CharView>
        <TabBar
          children={["General", "Actions", "Spells", "Items", "Monster"]}
          onChange={(tab: string) => setTab(tab)}
        />
        {activeTab === "General" && (
          <>
            <NumberField
              value={char.passivPerception}
              label="Passiv Perception"
              onChange={(passivPerception) =>
                onEdit({ ...char, passivPerception: passivPerception })
              }
            />
            <NumberField
              value={char.passivInsight}
              label="Passiv Insight"
              onChange={(passivInsight) =>
                onEdit({ ...char, passivInsight: passivInsight })
              }
            />
            <NumberField
              value={char.passivInvestigation}
              label="Passiv Investigation"
              onChange={(passivInvestigation) =>
                onEdit({ ...char, passivInvestigation: passivInvestigation })
              }
            />
            <TextField
              value={char.speed}
              label="Speed"
              onChange={(speed) => onEdit({ ...char, speed: speed })}
            />
            <TextField
              value={char.profsLangs}
              label="Languages"
              onChange={(profsLangs) =>
                onEdit({ ...char, profsLangs: profsLangs })
              }
            />
          </>
        )}
        {activeTab === "Actions" && (
          <>
            <TextField
              value={char.actions}
              label="Actions"
              onChange={(actions) => onEdit({ ...char, actions: actions })}
            />
            <TextField
              value={char.bonusActions}
              label="Bonus Actions"
              onChange={(bonusActions) =>
                onEdit({ ...char, bonusActions: bonusActions })
              }
            />
            <TextField
              value={char.reactions}
              label="Reactions"
              onChange={(reactions) =>
                onEdit({ ...char, reactions: reactions })
              }
            />
          </>
        )}
        {activeTab === "Spells" && (
          <>
            <NumberField
              value={char.castingHit}
              label="Casting Hit"
              onChange={(castingHit) =>
                onEdit({ ...char, castingHit: castingHit })
              }
            />
            <NumberField
              value={char.castingDC}
              label="Casting DC"
              onChange={(castingDC) =>
                onEdit({ ...char, castingDC: castingDC })
              }
            />
            {char.spells.map((spell: string, index: number) => {
              return <SpellContainer key={index}>
                <StringField
                  value={spell}
                  label="Spell"
                  onChange={(newSpell) => onChangeSpell(newSpell, spell)}
                />
                <IconButton
                  icon={faTrash}
                  onClick={() => removeSpell(spell)}
                />
              </SpellContainer>
            })}
            <TextButton
              text={"Add new Spell"}
              icon={faPlus}
              onClick={() => addNewSpell()}
            />
          </>
        )}
        {activeTab === "Items" && (
          <>
            {char.items.map((item: string, index: number) => {
              return <SpellContainer key={index}>
                <StringField
                  value={item}
                  label="Item"
                  onChange={(newItem) => onChangeItem(newItem, item)}
                />
                <IconButton
                  icon={faTrash}
                  onClick={() => removeItem(item)}
                />
              </SpellContainer>
            })}
            <TextButton
              text={"Add new Item"}
              icon={faPlus}
              onClick={() => addNewItem()}
            />
          </>
        )}
        {activeTab === "Monster" && (
          <>
            {char.monsters.map((monster: string, index: number) => {
              return <SpellContainer key={index}>
                <StringField
                  value={monster}
                  label="Monster"
                  onChange={(newMonster) => onChangeMonster(newMonster, monster)}
                />
                <IconButton
                  icon={faTrash}
                  onClick={() => removeMonster(monster)}
                />
              </SpellContainer>
            })}
            <TextButton
              text={"Add new Monster"}
              icon={faPlus}
              onClick={() => addNewMonster()}
            />
          </>
        )}
      </CharView>
    </CenterWrapper>
  );
};

export default CharEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
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

const SpellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
`;