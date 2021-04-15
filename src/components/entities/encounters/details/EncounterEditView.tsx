import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isNpc } from "../../../../data/campaign/Npc";
import { isChar } from "../../../../data/chars/Char";
import ClassSet from "../../../../data/chars/ClassSet";
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import { isMonster } from "../../../../data/Monster";
import { recivePromiseByAttribute } from "../../../../services/DatabaseService";
import { calcDifficulty } from "../../../../services/EncounterService";
import AutoStringField from "../../../form_elements/AutoStringField";
import IconButton from "../../../form_elements/IconButton";
import ImageImportField from "../../../form_elements/ImageField";
import NumberField from "../../../form_elements/NumberField";
import SingleSelectField from "../../../form_elements/SingleSelectField";
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
    let newEnemyList = [...encounter.enemies];
    newEnemyList.splice(i, 1);
    onEdit({ ...encounter, enemies: newEnemyList });
  };
  const addNewEnemy = () => {
    let newEnemyList = [...encounter.enemies];
    newEnemyList.push(new Player());
    onEdit({ ...encounter, enemies: newEnemyList });
  };
  const onChangeEnemyField = (
    field: string,
    newEnemy: string | number,
    oldEnemy: Player,
    i: number
  ) => {
    let enemies = [...encounter.enemies];
    enemies[i] = { ...oldEnemy, [field]: newEnemy };
    onEdit({ ...encounter, enemies: enemies });
  };
  const onChangeEnemy = async (newEnemy: string, oldEnemy: Player, i: number) => {
    let enemies = [...encounter.enemies];

    let found: any[] = [];
    found.push(recivePromiseByAttribute("monsters", "name", newEnemy));
    found.push(recivePromiseByAttribute("npcs", "name", newEnemy));
    found.push(recivePromiseByAttribute("chars", "name", newEnemy));
    let results = await Promise.all(found);
    results = results.filter((e) => e !== undefined);

    if (results[0] && isMonster(results[0])) {
      enemies[i] = {
        ...oldEnemy,
        name: newEnemy,
        hp: results[0].hp,
        currentHp: results[0].hp,
        ac: results[0].ac,
        isEnemy: true,
        isMonster: true,
        isNpc: false,
        isVisible: true,
        level: results[0].cr,
        pic: results[0].pic,
        size: results[0].size,
      };
      onEdit({ ...encounter, enemies: enemies });
    } else if (results[0] && isChar(results[0])) {
      let level = 0;
      results[0].classes.forEach((classSet: ClassSet) => {
        level += classSet.level;
      });
      enemies[i] = {
        ...oldEnemy,
        name: newEnemy,
        hp: results[0].hp,
        currentHp: results[0].hp,
        ac: results[0].ac,
        isEnemy: true,
        isMonster: true,
        isNpc: false,
        isVisible: true,
        level: level,
        pic: results[0].pic,
        size: "medium",
      };
      onEdit({ ...encounter, enemies: enemies });
    } else if (results[0] && isNpc(results[0])) {
      if (results[0].monster !== undefined) {
        enemies[i] = {
          ...oldEnemy,
          name: newEnemy,
          hp: results[0].monster.hp,
          currentHp: results[0].monster.hp,
          ac: results[0].monster.ac,
          isEnemy: true,
          isMonster: true,
          isNpc: true,
          isVisible: true,
          level: results[0].monster.cr,
          pic: results[0].monster.pic,
          size: results[0].monster.size,
        };
      } else if (results[0].char !== undefined) {
        let level = 0;
        results[0].char.classes.forEach((classSet: ClassSet) => {
          level += classSet.level;
        });
        enemies[i] = {
          ...oldEnemy,
          name: newEnemy,
          hp: results[0].char.hp,
          currentHp: results[0].char.hp,
          ac: results[0].char.ac,
          isEnemy: true,
          isMonster: false,
          isNpc: true,
          isVisible: true,
          level: level,
          pic: results[0].char.pic,
          size: "medium",
        };
      } else {
        enemies[i] = { ...oldEnemy, name: newEnemy, isNpc: true };
      }
      onEdit({ ...encounter, enemies: enemies });
    } else {
      enemies[i] = { ...oldEnemy, name: newEnemy };
      onEdit({ ...encounter, enemies: enemies });
    }
  };

  const removePlayer = (i: number) => {
    let newPlayerList = [...encounter.players];
    newPlayerList.splice(i, 1);
    onEdit({ ...encounter, players: newPlayerList });
  };
  const addNewPlayer = () => {
    let newPlayerList = [...encounter.players];
    newPlayerList.push(new Player());
    onEdit({ ...encounter, players: newPlayerList });
  };
  const onChangePlayerField = (
    field: string,
    newPlayer: string | number,
    oldPlayer: Player,
    i: number
  ) => {
    let players = [...encounter.players];
    players[i] = { ...oldPlayer, [field]: newPlayer };
    onEdit({ ...encounter, players: players });
  };
  const onChangePlayer = async (newPlayer: string, oldPlayer: Player, i: number) => {
    let players = [...encounter.players];

    let found: any[] = [];
    found.push(recivePromiseByAttribute("monsters", "name", newPlayer));
    found.push(recivePromiseByAttribute("npcs", "name", newPlayer));
    found.push(recivePromiseByAttribute("chars", "name", newPlayer));
    let results = await Promise.all(found);
    results = results.filter((e) => e !== undefined);

    if (results[0] && isMonster(results[0])) {
      players[i] = {
        ...oldPlayer,
        name: newPlayer,
        hp: results[0].hp,
        currentHp: results[0].hp,
        ac: results[0].ac,
        isEnemy: false,
        isMonster: true,
        isNpc: false,
        isVisible: true,
        level: results[0].cr,
        pic: results[0].pic,
        size: results[0].size,
      };
      onEdit({ ...encounter, players: players });
    } else if (results[0] && isChar(results[0])) {
      let level = 0;
      results[0].classes.forEach((classSet: ClassSet) => {
        level += classSet.level;
      });
      players[i] = {
        ...oldPlayer,
        name: newPlayer,
        hp: results[0].hp,
        currentHp: results[0].hp,
        ac: results[0].ac,
        isEnemy: false,
        isMonster: false,
        isNpc: false,
        isVisible: true,
        level: level,
        pic: results[0].pic,
        size: "medium",
      };
      onEdit({ ...encounter, players: players });
    } else if (results[0] && isNpc(results[0])) {
      if (results[0].monster !== undefined) {
        players[i] = {
          ...oldPlayer,
          name: newPlayer,
          hp: results[0].monster.hp,
          currentHp: results[0].monster.hp,
          ac: results[0].monster.ac,
          isEnemy: false,
          isMonster: true,
          isNpc: true,
          isVisible: true,
          level: results[0].monster.cr,
          pic: results[0].monster.pic,
          size: results[0].monster.size,
        };
      } else if (results[0].char !== undefined) {
        let level = 0;
        results[0].char.classes.forEach((classSet: ClassSet) => {
          level += classSet.level;
        });
        players[i] = {
          ...oldPlayer,
          name: newPlayer,
          hp: results[0].char.hp,
          currentHp: results[0].char.hp,
          ac: results[0].char.ac,
          isMonster: false,
          isEnemy: false,
          isNpc: true,
          isVisible: true,
          level: level,
          pic: results[0].char.pic,
          size: "medium",
        };
      } else {
        players[i] = { ...oldPlayer, name: newPlayer, isNpc: true };
      }
      onEdit({ ...encounter, players: players });
    } else {
      players[i] = { ...oldPlayer, name: newPlayer };
      onEdit({ ...encounter, players: players });
    }
  };

  return (
    <CenterWrapper>
      <View>
        <StringField
          value={encounter.name}
          label="Encounter Name"
          onChange={(name) => onEdit({ ...encounter, name: name })}
        />
        <StringField
          value={encounter.map}
          label="Map"
          onChange={(newMap) => onEdit({ ...encounter, map: newMap })}
        />
        <FieldGroup>
          <ImageImportField
            label="Map"
            onFinished={(base64) => onEdit({ ...encounter, mapBase64: base64 })}
          />
          <IconButton icon={faTrash} onClick={() => onEdit({ ...encounter, mapBase64: "" })} />
        </FieldGroup>
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
                optionTable={["monsters", "chars", "npcs"]}
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
                onChange={(level) => onChangeEnemyField("level", level, enemy, index)}
              />
              <StringField
                value={enemy.pic}
                label="Pic"
                onChange={(pic) => onChangeEnemyField("pic", pic, enemy, index)}
              />
              <SingleSelectField
                options={[
                  { value: "tiny", label: "tiny" },
                  { value: "small", label: "small" },
                  { value: "medium", label: "medium" },
                  { value: "large", label: "large" },
                  { value: "huge", label: "huge" },
                  { value: "gargantuan", label: "gargantuan" },
                ]}
                value={enemy.size}
                label={"Size"}
                onChange={(size) => onChangePlayerField("size", size, enemy, index)}
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
                optionTable={["monsters", "chars", "npcs"]}
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
              <StringField
                value={player.pic}
                label="Pic"
                onChange={(pic) => onChangePlayerField("pic", pic, player, index)}
              />
              <SingleSelectField
                options={[
                  { value: "tiny", label: "tiny" },
                  { value: "small", label: "small" },
                  { value: "medium", label: "medium" },
                  { value: "large", label: "large" },
                  { value: "huge", label: "huge" },
                  { value: "gargantuan", label: "gargantuan" },
                ]}
                value={player.size}
                label={"Size"}
                onChange={(size) => onChangePlayerField("size", size, player, index)}
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

const FieldGroup = styled.div`
  flex: 2 2 auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;

  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;
