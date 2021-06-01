import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { isNpc } from "../../../../data/campaign/Npc";
import { isChar } from "../../../../data/chars/Char";
import ClassSet from "../../../../data/chars/ClassSet";
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import IEntity from "../../../../data/IEntity";
import { isMonster } from "../../../../data/Monster";
import {
  reciveAllFilteredPromise,
  recivePromiseByMultiAttribute,
} from "../../../../services/DatabaseService";
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
  const [allOptions, setOptions] = useState<IEntity[]>([]);

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

  const findAllItems = useCallback(async (optionsTable: string[]) => {
    let itemList: Promise<IEntity[] | undefined>[] = [];
    optionsTable.forEach((table) => {
      itemList.push(reciveAllFilteredPromise(table, []));
    });
    let results = await Promise.all(itemList);

    let newList: IEntity[] = [];
    results.forEach((entities: IEntity[] | undefined) => {
      if (entities !== undefined) entities.forEach((entity: IEntity) => newList.push(entity));
    });
    setOptions(newList);
  }, []);

  useEffect(() => {
    findAllItems(["monsters", "chars", "npcs"]);
  }, [findAllItems]);

  const removeEnemy = useCallback(
    (i: number) => {
      let newEnemyList = [...encounter.enemies];
      newEnemyList.splice(i, 1);
      onEdit({ ...encounter, enemies: newEnemyList });
    },
    [encounter, onEdit]
  );
  const addNewEnemy = useCallback(() => {
    let newEnemyList = [...encounter.enemies];
    newEnemyList.push(new Player());
    onEdit({ ...encounter, enemies: newEnemyList });
  }, [encounter, onEdit]);
  const onChangeEnemyField = useCallback(
    (field: string, newEnemy: string | number, oldEnemy: Player, i: number) => {
      let enemies = [...encounter.enemies];
      enemies[i] = { ...oldEnemy, [field]: newEnemy };
      onEdit({ ...encounter, enemies: enemies });
    },
    [encounter, onEdit]
  );
  const onChangeEnemy = useCallback(
    async (newEnemy: string, oldEnemy: Player, i: number) => {
      let enemies = [...encounter.enemies];

      let found: any[] = [];
      let [name, sources] = newEnemy.split("|");
      found.push(recivePromiseByMultiAttribute("monsters", { name: name, sources: sources }));
      found.push(recivePromiseByMultiAttribute("npcs", { name: name, sources: sources }));
      found.push(recivePromiseByMultiAttribute("chars", { name: name, sources: sources }));
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
          cord: 0,
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
          cord: 0,
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
            cord: 0,
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
            cord: 0,
          };
        } else {
          enemies[i] = { ...oldEnemy, name: newEnemy, isNpc: true };
        }
        onEdit({ ...encounter, enemies: enemies });
      } else {
        enemies[i] = { ...oldEnemy, name: newEnemy };
        onEdit({ ...encounter, enemies: enemies });
      }
    },
    [encounter, onEdit]
  );

  const removePlayer = useCallback(
    (i: number) => {
      let newPlayerList = [...encounter.players];
      newPlayerList.splice(i, 1);
      onEdit({ ...encounter, players: newPlayerList });
    },
    [encounter, onEdit]
  );
  const addNewPlayer = useCallback(() => {
    let newPlayerList = [...encounter.players];
    newPlayerList.push(new Player());
    onEdit({ ...encounter, players: newPlayerList });
  }, [encounter, onEdit]);
  const onChangePlayerField = useCallback(
    (field: string, newPlayer: string | number, oldPlayer: Player, i: number) => {
      let players = [...encounter.players];
      players[i] = { ...oldPlayer, [field]: newPlayer };
      onEdit({ ...encounter, players: players });
    },
    [encounter, onEdit]
  );
  const onChangePlayer = useCallback(
    async (newPlayer: string, oldPlayer: Player, i: number) => {
      let players = [...encounter.players];

      let found: any[] = [];
      let [name, sources] = newPlayer.split("|");
      found.push(recivePromiseByMultiAttribute("monsters", { name: name, sources: sources }));
      found.push(recivePromiseByMultiAttribute("npcs", { name: name, sources: sources }));
      found.push(recivePromiseByMultiAttribute("chars", { name: name, sources: sources }));
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
          cord: 0,
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
          cord: 0,
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
            cord: 0,
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
            cord: 0,
          };
        } else {
          players[i] = { ...oldPlayer, name: newPlayer, isNpc: true };
        }
        onEdit({ ...encounter, players: players });
      } else {
        players[i] = { ...oldPlayer, name: newPlayer };
        onEdit({ ...encounter, players: players });
      }
    },
    [encounter, onEdit]
  );

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
        {allOptions.length > 0 &&
          encounter.enemies.map((enemy: Player, index: number) => {
            return (
              <Container key={index}>
                <AutoStringField
                  // optionTable={["monsters", "chars", "npcs"]}
                  options={allOptions}
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
        {allOptions.length > 0 &&
          encounter.players.map((player: Player, index: number) => {
            return (
              <Container key={index}>
                <AutoStringField
                  // optionTable={["monsters", "chars", "npcs"]}
                  options={allOptions}
                  value={player.name}
                  label="Character"
                  onChange={(newPlayer) => onChangePlayer(newPlayer, player, index)}
                />
                <NumberField
                  value={player.currentHp}
                  label="Current Hp"
                  onChange={(currentHp) =>
                    onChangePlayerField("currentHp", currentHp, player, index)
                  }
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
                  onChange={(initBonus) =>
                    onChangePlayerField("initBonus", initBonus, player, index)
                  }
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
