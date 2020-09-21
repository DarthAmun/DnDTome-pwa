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
import SmallNumberField from "../../FormElements/SmallNumberField";

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
    newPlayers = newPlayers.sort((a, b) => (a.init < b.init ? 1 : -1));
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
      let roll = rollDie(20);
      roll += player.initBonus || 0;
      return { ...player, init: roll };
    });
    let newEnemies = encounter.enemies.map((enemy: Player) => {
      let roll = rollDie(20);
      roll += enemy.initBonus || 0;
      return { ...enemy, init: roll };
    });
    onEdit({
      ...encounter,
      enemies: newEnemies,
      players: newPlayers,
      isPlaying: true,
      currentRound: 0,
    });
  };

  const finishEncounter = () => {
    let newPlayers = encounter.players.map((player: Player) => {
      return { ...player, init: 0 };
    });
    let newEnemies = encounter.enemies.map((enemy: Player) => {
      return { ...enemy, init: 0 };
    });
    onEdit({
      ...encounter,
      enemies: newEnemies,
      players: newPlayers,
      isPlaying: false,
      currentRound: 0,
    });
  };

  const nextPlayer = () => {
    let nextRound = (encounter.currentRound + 1) % players.length;
    let counter = 0;
    while (players[nextRound].currentHp <= 0) {
      nextRound = (nextRound + 1) % players.length;
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
        currentRound: nextRound,
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
          <Prop>
            <PropTitle>Difficulty: </PropTitle>
            {difficulty}
          </Prop>
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
          <>
            {players.map((player: Player, index: number) => {
              return (
                <>
                  <PropWrapper
                    current={
                      encounter.currentRound === index && encounter.isPlaying
                    }
                    isDead={player.currentHp <= 0}
                    key={index}
                  >
                    <PropField>
                      <SmallNumberField
                        value={player.init}
                        label="Init"
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
                      <SmallNumberField
                        value={player.currentHp}
                        label="Current Hp"
                        onChange={(currentHp) =>
                          onChangePlayerField("currentHp", currentHp, player)
                        }
                      />{" "}
                      / {player.hp}
                    </PropField>
                    <Prop>{player.ac}</Prop>
                    <Prop>{player.tag}</Prop>
                    {player.currentHp > 0 && (
                      <IconButton
                        icon={faSkullCrossbones}
                        onClick={() => killEnemy(player)}
                      />
                    )}
                  </PropWrapper>
                </>
              );
            })}
          </>
        )}
      </View>
    </CenterWrapper>
  );
};

export default EncounterView;

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
  margin: 5px 5px 10px 5px;
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

const PropWrapper = styled.div<Type>`
  ${(props) => {
    if (props.current) {
      return "background-color: #8000ff;";
    }
    if (props.isDead) {
      return "opacity: 0.5;";
    }
    return "";
  }};
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  max-width: 100%;
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
