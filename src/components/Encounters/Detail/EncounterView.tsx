import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Encounter from "../../../Data/Encounter/Encounter";
import Player from "../../../Data/Encounter/Player";

import { faPlayCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "../../Loading";
import IconButton from "../../FormElements/IconButton";
import TextButton from "../../FormElements/TextButton";
import { rollDie } from "../../../Services/DiceService";

interface $Props {
  encounter: Encounter;
}

const EncounterView = ({ encounter }: $Props) => {
  let history = useHistory();
  const [loading, isLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers([...encounter.enemies, ...encounter.players]);
    isLoading(false);
  }, [encounter]);

  const removeEnemy = (enemy: Player) => {
    let newEnemyList: Player[] = players.filter(
      (player: Player) => enemy !== player
    );
    setPlayers(newEnemyList);
  };

  const startEncounter = () => {
    let newPlayers = [...encounter.enemies, ...encounter.players].map(
      (player: Player) => {
        let roll = rollDie(20);
        roll += player.initBonus || 0;
        return { ...player, init: roll };
      }
    );
    newPlayers = newPlayers.sort((a, b) => (a.init < b.init ? 1 : -1));
    setPlayers(newPlayers);
  };

  return (
    <CenterWrapper>
      <View>
        <Name>
          <b>{encounter.name}</b>
        </Name>
        <TextButton
          text={"Start Encounter"}
          icon={faPlayCircle}
          onClick={() => startEncounter()}
        />
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            {players.map((player: Player, index: number) => {
              return (
                <PropWrapper key={index}>
                  <Prop>{player.init}</Prop>
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
                  <Prop>{player.hp}</Prop>
                  <Prop>{player.tempHp}</Prop>
                  <Prop>{player.ac}</Prop>
                  <Prop>{player.tag}</Prop>
                  <IconButton
                    icon={faTrash}
                    onClick={() => removeEnemy(player)}
                  />
                </PropWrapper>
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

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 20px);
  margin: 2px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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
