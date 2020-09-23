import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Encounter from "../../../Data/Encounter/Encounter";
import Player from "../../../Data/Encounter/Player";
import { rollDie } from "../../../Services/DiceService";
import { calcDifficulty } from "../../../Services/EncounterService";

import {
  faPlayCircle,
  faSkullCrossbones,
  faStepForward,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../../Loading";
import IconButton from "../../FormElements/IconButton";
import TextButton from "../../FormElements/TextButton";
import TinyNumberField from "../../FormElements/TinyNumberField";

interface $Props {
  encounter: Encounter;
  onEdit: (value: Encounter) => void;
}

const EncounterView = ({ encounter, onEdit }: $Props) => {
  let history = useHistory();
  const [loading, isLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [difficulty, setDifficulty] = useState<string>("");

  useEffect(() => {
    setDifficulty(calcDifficulty(encounter));
  }, [encounter]);

  useEffect(() => {
    let newPlayers = [...encounter.enemies, ...encounter.players];
    if(encounter.isPlaying) {
      newPlayers = newPlayers.sort((a, b) => (a.init < b.init ? 1 : -1));
    }
    setPlayers(newPlayers);
    isLoading(false);
  }, [encounter]);

  const onChangePlayerField = (
    field: string,
    newField: string | number,
    oldPlayer: Player
  ) => {
    if (oldPlayer.isMonster) {
      let newPlayers = encounter.enemies.map((newPlayer: Player) => {
        if (oldPlayer === newPlayer) {
          return { ...newPlayer, [field]: newField };
        } else {
          return newPlayer;
        }
      });
      onEdit({ ...encounter, enemies: newPlayers });
    } else {
      let newPlayers = encounter.players.map((newPlayer: Player) => {
        if (oldPlayer === newPlayer) {
          return { ...newPlayer, [field]: newField };
        } else {
          return newPlayer;
        }
      });
      onEdit({ ...encounter, players: newPlayers });
    }
  };

  const killEnemy = (enemy: Player) => {
    onChangePlayerField("currentHp", 0, enemy);
  };

  const startEncounter = () => {
    let newPlayers = encounter.players.map((player: Player) => {
      if (player.init < 0) {
        let roll = rollDie(20);
        roll += player.initBonus || 0;
        return { ...player, init: roll };
      } else {
        return player;
      }
    });
    let newEnemies = encounter.enemies.map((enemy: Player) => {
      if (enemy.init < 0) {
        let roll = rollDie(20);
        roll += enemy.initBonus || 0;
        return { ...enemy, init: roll };
      } else {
        return enemy;
      }
    });
    onEdit({
      ...encounter,
      enemies: newEnemies,
      players: newPlayers,
      isPlaying: true,
      currentInit: 0,
      roundCounter: 0,
    });
  };

  const finishEncounter = () => {
    let newPlayers = encounter.players.map((player: Player) => {
      return { ...player, init: -1 };
    });
    let newEnemies = encounter.enemies.map((enemy: Player) => {
      return { ...enemy, init: -1 };
    });
    onEdit({
      ...encounter,
      enemies: newEnemies,
      players: newPlayers,
      isPlaying: false,
      currentInit: 0,
      roundCounter: 0,
    });
  };

  const nextPlayer = () => {
    let nextInit = (encounter.currentInit + 1) % players.length;
    let roundCounter = encounter.roundCounter;
    if ((encounter.currentInit + 1) % players.length === 0) {
      roundCounter++;
    }

    let counter = 0;
    while (players[nextInit].currentHp <= 0) {
      if ((nextInit + 1) % players.length === 0) {
        roundCounter++;
      }
      nextInit = (nextInit + 1) % players.length;
      counter++;
      if (counter > players.length) {
        break;
      }
    }
    if (counter > players.length) {
      finishEncounter();
    } else {
      onEdit({
        ...encounter,
        currentInit: nextInit,
        roundCounter: roundCounter,
      });
    }
  };

  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{encounter.name}</b>
        </Name>
        <PropWrapper>
          <PropElm>
            <PropTitle>Difficulty: </PropTitle>
            {difficulty}
          </PropElm>
          <PropElm>
            <PropTitle>Round: </PropTitle>
            {encounter.roundCounter}
          </PropElm>
          {encounter && !encounter.isPlaying && (
            <TextButton
              text={"Start Encounter"}
              icon={faPlayCircle}
              onClick={() => startEncounter()}
            />
          )}
          {encounter && encounter.isPlaying && (
            <>
              <TextButton
                text={"Next"}
                icon={faStepForward}
                onClick={() => nextPlayer()}
              />
              <TextButton
                text={"End Encounter"}
                icon={faStopCircle}
                onClick={() => finishEncounter()}
              />
            </>
          )}
        </PropWrapper>
        {loading && <LoadingSpinner />}
        {!loading && (
          <Table>
            <thead>
              <tr>
                <th>Init</th>
                <th>Name</th>
                <th>Current Hp</th>
                <th>Hp</th>
                <th>AC</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player: Player, index: number) => {
                return (
                  <Row
                    current={
                      encounter.currentInit === index && encounter.isPlaying
                    }
                    isDead={player.currentHp <= 0}
                    key={index}
                  >
                    <PropField>
                      <TinyNumberField
                        value={player.init}
                        onChange={(init) =>
                          onChangePlayerField("init", init, player)
                        }
                      />
                    </PropField>
                    <Prop>
                      {player.isMonster && (
                        <MainLink
                          onClick={() =>
                            history.push(`/monster-detail/name/${player.name}`)
                          }
                        >
                          {player.name}
                        </MainLink>
                      )}
                      {!player.isMonster && (
                        <MainLink
                          onClick={() =>
                            history.push(`/char-detail/name/${player.name}`)
                          }
                        >
                          {player.name}
                        </MainLink>
                      )}
                    </Prop>
                    <PropField>
                      <TinyNumberField
                        value={player.currentHp}
                        max={player.hp}
                        onChange={(currentHp) =>
                          onChangePlayerField("currentHp", currentHp, player)
                        }
                      />
                    </PropField>
                    <Prop>{player.hp}</Prop>
                    <Prop>{player.ac}</Prop>
                    {/* <Prop>{player.tag}</Prop> */}
                    <td>
                      {player.currentHp > 0 && (
                        <IconButton
                          icon={faSkullCrossbones}
                          onClick={() => killEnemy(player)}
                        />
                      )}
                    </td>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        )}
      </View>
    </CenterWrapper>
  );
};

export default EncounterView;

const Table = styled.table`
  width: 100%;
`;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.div`
  height: auto;
  float: left;
  padding: 10px;
  margin: 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

type Type = {
  current?: boolean;
  isDead?: boolean;
};

const Row = styled.tr<Type>`
  ${(props) => {
    if (props.isDead) {
      return "opacity: 0.5;";
    }
    if (props.current) {
      return "td:nth-child(1) {background-color: #8000ff;}";
    }
    return "";
  }}
  margin: 2px;
`;

const Prop = styled.td`
  margin: 2px;
  padding: 5px;
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

const PropElm = styled.div`
  margin: 5px;
  padding: 10px;
  height: 20px;
  flex: 1 1 auto;
  line-height: 20px;
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

const PropField = styled(Prop)`
  padding: 0px;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const MainLink = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  border-radius: 5px;
  text-decoration: none;
  color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  padding: 0px 5px 0px 5px;
  cursor: pointer;
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
