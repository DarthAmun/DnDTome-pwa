import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import { isChar } from "../../../Data/Chars/Char";
import Encounter from "../../../Data/Encounter/Encounter";
import Player from "../../../Data/Encounter/Player";
import IEntity from "../../../Data/IEntity";
import { isMonster } from "../../../Data/Monster";
import { reciveByAttribute } from "../../../Services/DatabaseService";

import AutoStringField from "../../FormElements/AutoStringField";
import IconButton from "../../FormElements/IconButton";
import NumberField from "../../FormElements/NumberField";
import StringField from "../../FormElements/StringField";
import TextButton from "../../FormElements/TextButton";

interface $Props {
  encounter: Encounter;
  onEdit: (value: Encounter) => void;
}

const EncounterEditView = ({ encounter, onEdit }: $Props) => {
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
          ac: result.ac,
          isMonster: true,
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
        players[i] = {
          ...oldPlayer,
          name: newPlayer,
          hp: result.currentHp,
          initBonus: result.init,
          ac: result.ac,
          isMonster: false,
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
      </View>
      <CharView>
        {encounter.enemies.map((enemy: Player, index: number) => {
          return (
            <Container key={index}>
              <AutoStringField
                optionTable={["monsters", "chars"]}
                value={enemy.name}
                label="Monster"
                onChange={(newMonster) =>
                  onChangeEnemy(newMonster, enemy, index)
                }
              />
              <NumberField
                value={enemy.hp}
                label="Hp"
                onChange={(hp) => onChangeEnemyField("hp", hp, enemy, index)}
              />
              <NumberField
                value={enemy.tempHp}
                label="Temp Hp"
                onChange={(tempHp) =>
                  onChangeEnemyField("tempHp", tempHp, enemy, index)
                }
              />
              <NumberField
                value={enemy.ac}
                label="AC"
                onChange={(ac) => onChangeEnemyField("ac", ac, enemy, index)}
              />
              <NumberField
                value={enemy.initBonus}
                label="Init"
                onChange={(init) =>
                  onChangeEnemyField("init", init, enemy, index)
                }
              />
              <IconButton icon={faTrash} onClick={() => removeEnemy(index)} />
            </Container>
          );
        })}
        <TextButton
          text={"Add new Monster"}
          icon={faPlus}
          onClick={() => addNewEnemy()}
        />
      </CharView>
      <CharView>
        {encounter.players.map((player: Player, index: number) => {
          return (
            <Container key={index}>
              <AutoStringField
                optionTable={["monsters", "chars"]}
                value={player.name}
                label="Character"
                onChange={(newPlayer) =>
                  onChangePlayer(newPlayer, player, index)
                }
              />
              <NumberField
                value={player.hp}
                label="Hp"
                onChange={(hp) => onChangePlayerField("hp", hp, player, index)}
              />
              <NumberField
                value={player.tempHp}
                label="Temp Hp"
                onChange={(tempHp) =>
                  onChangePlayerField("tempHp", tempHp, player, index)
                }
              />
              <NumberField
                value={player.ac}
                label="AC"
                onChange={(ac) => onChangePlayerField("ac", ac, player, index)}
              />
              <NumberField
                value={player.initBonus}
                label="Init"
                onChange={(init) =>
                  onChangePlayerField("init", init, player, index)
                }
              />
              <IconButton icon={faTrash} onClick={() => removePlayer(index)} />
            </Container>
          );
        })}
        <TextButton
          text={"Add new Character"}
          icon={faPlus}
          onClick={() => addNewPlayer()}
        />
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
