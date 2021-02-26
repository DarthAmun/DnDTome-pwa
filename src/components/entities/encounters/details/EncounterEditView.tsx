import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isChar } from "../../../../data/chars/Char";
import ClassSet from "../../../../data/chars/ClassSet";
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import IEntity from "../../../../data/IEntity";
import { isMonster } from "../../../../data/Monster";
import { reciveByAttribute } from "../../../../services/DatabaseService";
import { calcDifficulty } from "../../../../services/EncounterService";

import AutoStringField from "../../../form_elements/AutoStringField";
import IconButton from "../../../form_elements/IconButton";
import NumberField from "../../../form_elements/NumberField";
import StringField from "../../../form_elements/StringField";
import TextButton from "../../../form_elements/TextButton";

interface $Props {
  encounter: Encounter;
  onEdit: (value: Encounter) => void;
}

const EncounterEditView = ({ encounter, onEdit }: $Props) => {
  const [difficulty, setDifficulty] = useState<string>("");
  const [expArray, setExpArray] = useState<string>("");

  useEffect(() => {
    const { difficulty, calcExp } = calcDifficulty(encounter);
    setDifficulty(difficulty);
    setExpArray(
      "Easy: " +
        calcExp.easy +
        " | Medium: " +
        calcExp.medium +
        " | Hard: " +
        calcExp.hard +
        " | Deadly: " +
        calcExp.deadly
    );
  }, [encounter]);

  const removeEnemy = (i: number) => {
    let newEnemyList = encounter.enemies;
    newEnemyList.splice(i, 1);
    onEdit({ ...encounter, enemies: newEnemyList });
  };
  const addNewEnemy = () => {
    let newEnemyList = encounter.enemies;
    newEnemyList.push(new Player());
    onEdit({ ...encounter, enemies: newEnemyList });
  };
  const onChangeEnemyField = (
    field: string,
    newEnemy: string | number,
    oldEnemy: Player,
    i: number
  ) => {
    let enemies = encounter.enemies;
    enemies[i] = { ...oldEnemy, [field]: newEnemy };
    onEdit({ ...encounter, enemies: enemies });
  };
  const onChangeEnemy = (newEnemy: string, oldEnemy: Player, i: number) => {
    let enemies = encounter.enemies;

    reciveByAttribute("monsters", "name", newEnemy, (result: IEntity) => {
      if (result && isMonster(result)) {
        enemies[i] = {
          ...oldEnemy,
          name: newEnemy,
          hp: result.hp,
          currentHp: result.hp,
          ac: result.ac,
          isMonster: true,
          level: result.cr,
        };
        onEdit({ ...encounter, enemies: enemies });
      } else {
        enemies[i] = { ...oldEnemy, name: newEnemy };
        onEdit({ ...encounter, enemies: enemies });
      }
    });
  };

  const removePlayer = (i: number) => {
    let newPlayerList = encounter.players;
    newPlayerList.splice(i, 1);
    onEdit({ ...encounter, players: newPlayerList });
  };
  const addNewPlayer = () => {
    let newPlayerList = encounter.players;
    newPlayerList.push(new Player());
    onEdit({ ...encounter, players: newPlayerList });
  };
  const onChangePlayerField = (
    field: string,
    newPlayer: string | number,
    oldPlayer: Player,
    i: number
  ) => {
    let players = encounter.players;
    players[i] = { ...oldPlayer, [field]: newPlayer };
    onEdit({ ...encounter, players: players });
  };
  const onChangePlayer = (newPlayer: string, oldPlayer: Player, i: number) => {
    let players = encounter.players;

    reciveByAttribute("chars", "name", newPlayer, (result: IEntity) => {
      if (result && isChar(result)) {
        let level = 0;
        result.classes.forEach((classSet: ClassSet) => {
          level += classSet.level;
        });
        players[i] = {
          ...oldPlayer,
          name: newPlayer,
          hp: result.hp,
          currentHp: result.currentHp,
          initBonus: result.init,
          ac: result.ac,
          isMonster: false,
          level: level,
        };
        onEdit({ ...encounter, players: players });
      } else {
        players[i] = { ...oldPlayer, name: newPlayer };
        onEdit({ ...encounter, players: players });
      }
    });
  };

  return (
    <CenterWrapper>
      <View>
        <StringField
          value={encounter.name}
          label="Encounter Name"
          onChange={(name) => onEdit({ ...encounter, name: name })}
        />
        <AutoStringField
          optionTable={"locations"}
          value={encounter.map}
          label="Map"
          onChange={(newMap) => onEdit({ ...encounter, map: newMap })}
        />
      </View>
      <View>
        <PropWrapper>
          <Prop>
            <PropTitle>Difficulty: </PropTitle>
            {difficulty}
          </Prop>
          <Prop>
            <PropTitle>Exp: </PropTitle>
            {expArray}
          </Prop>
        </PropWrapper>
      </View>
      <CharView>
        {encounter.enemies.map((enemy: Player, index: number) => {
          return (
            <Container key={index}>
              <AutoStringField
                optionTable={["monsters", "chars"]}
                value={enemy.name}
                label="Monster"
                onChange={(newMonster) => onChangeEnemy(newMonster, enemy, index)}
              />
              <NumberField
                value={enemy.currentHp}
                label="Current Hp"
                onChange={(currentHp) => onChangeEnemyField("currentHp", currentHp, enemy, index)}
              />
              <NumberField
                value={enemy.hp}
                label="Hp"
                onChange={(hp) => onChangeEnemyField("hp", hp, enemy, index)}
              />
              <NumberField
                value={enemy.ac}
                label="AC"
                onChange={(ac) => onChangeEnemyField("ac", ac, enemy, index)}
              />
              <NumberField
                value={enemy.initBonus}
                label="Init Bonus"
                onChange={(initBonus) => onChangeEnemyField("initBonus", initBonus, enemy, index)}
              />
              <NumberField
                value={enemy.level}
                label="Cr"
                onChange={(level) => onChangePlayerField("level", level, enemy, index)}
              />
              <IconButton icon={faTrash} onClick={() => removeEnemy(index)} />
            </Container>
          );
        })}
        <Container>
          <TextButton text={"Add new Monster"} icon={faPlus} onClick={() => addNewEnemy()} />
        </Container>
      </CharView>
      <CharView>
        {encounter.players.map((player: Player, index: number) => {
          return (
            <Container key={index}>
              <AutoStringField
                optionTable={"chars"}
                value={player.name}
                label="Character"
                onChange={(newPlayer) => onChangePlayer(newPlayer, player, index)}
              />
              <NumberField
                value={player.currentHp}
                label="Current Hp"
                onChange={(currentHp) => onChangePlayerField("currentHp", currentHp, player, index)}
              />
              <NumberField
                value={player.hp}
                label="Hp"
                onChange={(hp) => onChangePlayerField("hp", hp, player, index)}
              />
              <NumberField
                value={player.ac}
                label="AC"
                onChange={(ac) => onChangePlayerField("ac", ac, player, index)}
              />
              <NumberField
                value={player.initBonus}
                label="Init Bonus"
                onChange={(initBonus) => onChangePlayerField("initBonus", initBonus, player, index)}
              />
              <NumberField
                value={player.level}
                label="Level"
                onChange={(level) => onChangePlayerField("level", level, player, index)}
              />
              <IconButton icon={faTrash} onClick={() => removePlayer(index)} />
            </Container>
          );
        })}
        <Container>
          <TextButton text={"Add new Character"} icon={faPlus} onClick={() => addNewPlayer()} />
        </Container>
      </CharView>
    </CenterWrapper>
  );
};

export default EncounterEditView;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  flex: 1 1;
  min-width: calc(100% - 40px);
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharView = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  flex: 1 1 600px;
  padding: 5px;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: stretch;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 600px;
`;

const Prop = styled.div`
  flex: 1 1 auto;
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

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;