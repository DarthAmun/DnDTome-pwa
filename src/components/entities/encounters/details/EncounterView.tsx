import {
  faHandHoldingHeart,
  faPlayCircle,
  faSkullCrossbones,
  faStepForward,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useState } from "react";
import { GiBroadsword, GiHeartBottle } from "react-icons/gi";
import { useHistory } from "react-router";
import styled from "styled-components";
import BuildEncounter from "../../../../data/encounter/BuildEncounter";
import BuildPlayer from "../../../../data/encounter/BuildPlayer";
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import { rollDie } from "../../../../services/DiceService";
import { buildEncounter } from "../../../../services/EncounterService";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import TinyNumberField from "../../../form_elements/TinyNumberField";
import Board from "../../../general_elements/board/Board";
import { DamageDialog } from "../../../general_elements/Dialog";
import { LoadingSpinner } from "../../../Loading";

interface $Props {
  encounter: Encounter;
  dmView: boolean;
  onEdit: (value: Encounter) => void;
}

const EncounterView = ({ encounter, dmView, onEdit }: $Props) => {
  let history = useHistory();
  const [damageDialog, setDamageDialog] = useState<boolean>(false);
  const [damageDialogIndex, setDamageDialogIndex] = useState<number>(0);
  const [loadedEncounter, setLoadedEncounter] = useState<BuildEncounter>(new BuildEncounter());
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    buildEncounter(encounter).then((buildEncounter) => {
      setLoadedEncounter(buildEncounter);
      isLoading(false);
    });
  }, [encounter, setLoadedEncounter]);

  const onChangePlayerField = (field: string, newField: string | number, oldPlayer: Player) => {
    if (oldPlayer.isMonster) {
      let newPlayers = loadedEncounter.encounter.enemies.map((newPlayer: Player) => {
        if (oldPlayer === newPlayer) {
          return { ...newPlayer, [field]: newField };
        } else {
          return newPlayer;
        }
      });
      onEdit({ ...encounter, enemies: newPlayers });
    } else {
      let newPlayers = loadedEncounter.encounter.players.map((newPlayer: Player) => {
        if (oldPlayer === newPlayer) {
          return { ...newPlayer, [field]: newField };
        } else {
          return newPlayer;
        }
      });
      onEdit({ ...encounter, players: newPlayers });
    }
  };

  const killPlayer = (enemy: Player) => {
    onChangePlayerField("currentHp", 0, enemy);
  };

  const revicePlayer = (enemy: Player) => {
    onChangePlayerField("currentHp", 1, enemy);
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
    let nextInit = (encounter.currentInit + 1) % loadedEncounter.players.length;
    let roundCounter = encounter.roundCounter;
    if ((encounter.currentInit + 1) % loadedEncounter.players.length === 0) {
      roundCounter++;
    }

    let counter = 0;
    while (loadedEncounter.players[nextInit].player.currentHp <= 0) {
      if ((nextInit + 1) % loadedEncounter.players.length === 0) {
        roundCounter++;
      }
      nextInit = (nextInit + 1) % loadedEncounter.players.length;
      counter++;
      if (counter > loadedEncounter.players.length) {
        break;
      }
    }
    if (counter > loadedEncounter.players.length) {
      finishEncounter();
    } else {
      onEdit({
        ...encounter,
        currentInit: nextInit,
        roundCounter: roundCounter,
      });
    }
  };

  const onChangeDimension = useCallback(
    (dimension: { width: number; height: number; size: number; zoom: number }) => {
      onEdit({ ...loadedEncounter.encounter, dimension: dimension });
    },
    [loadedEncounter.encounter, onEdit]
  );

  const onChangePlayers = useCallback(
    (players: BuildPlayer[]) => {
      if (players !== loadedEncounter.players) {
        let newPlayers: Player[] = [];
        players.forEach((player: BuildPlayer) => {
          if (!player.player.isMonster) {
            newPlayers.push(player.player);
          }
        });
        let newEnemies: Player[] = [];
        players.forEach((player: BuildPlayer) => {
          if (player.player.isMonster) {
            newEnemies.push(player.player);
          }
        });

        onEdit({ ...loadedEncounter.encounter, players: newPlayers, enemies: newEnemies });
      }
    },
    [loadedEncounter.encounter, loadedEncounter.players, onEdit]
  );

  const showDamageDialog = (i: number) => {
    setDamageDialogIndex(i);
    setDamageDialog(true);
  };

  return (
    <CenterWrapper>
      {damageDialog && (
        <DamageDialog
          name={loadedEncounter.players[damageDialogIndex].player.name}
          damageText={"Damage"}
          damageClick={(currentHp) => {
            onChangePlayerField(
              "currentHp",
              loadedEncounter.players[damageDialogIndex].player.currentHp - currentHp,
              loadedEncounter.players[damageDialogIndex].player
            );
            setDamageDialog(false);
          }}
          healText={"Heal"}
          healClick={(currentHp) => {
            onChangePlayerField(
              "currentHp",
              loadedEncounter.players[damageDialogIndex].player.currentHp + currentHp >
                loadedEncounter.players[damageDialogIndex].player.hp
                ? loadedEncounter.players[damageDialogIndex].player.hp
                : loadedEncounter.players[damageDialogIndex].player.currentHp + currentHp,
              loadedEncounter.players[damageDialogIndex].player
            );
            setDamageDialog(false);
          }}
          abortText={"Back"}
          abortClick={() => {
            setDamageDialog(false);
          }}
        />
      )}
      <View mode={dmView ? 1 : 0}>
        <Name>
          <b>{encounter.name}</b>
        </Name>
        <PropWrapper>
          {dmView && (
            <PropElm>
              <PropTitle>Difficulty: </PropTitle>
              {loadedEncounter.difficulty.difficulty}
            </PropElm>
          )}
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
              <TextButton text={"Next"} icon={faStepForward} onClick={() => nextPlayer()} />
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
                {dmView && <th>Current Hp</th>}
                {dmView && <th>AC</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loadedEncounter.players.map((buildPlayer: BuildPlayer, index: number) => {
                return (
                  <Row
                    current={encounter.currentInit === index && encounter.isPlaying}
                    isDead={buildPlayer.player.currentHp <= 0}
                    key={index}
                  >
                    <PropField>
                      <TinyNumberField
                        value={buildPlayer.player.init}
                        onChange={(init) => onChangePlayerField("init", init, buildPlayer.player)}
                      />
                    </PropField>
                    <Prop>
                      {buildPlayer.entity.pic !== "" && buildPlayer.entity.pic !== undefined ? (
                        <PlayerImage player={buildPlayer}></PlayerImage>
                      ) : (
                        <></>
                      )}
                      {buildPlayer.player.isMonster && (
                        <MainLink
                          onClick={() =>
                            history.push(`/monster-detail/name/${buildPlayer.player.name}`)
                          }
                        >
                          {dmView ? buildPlayer.player.name : "???"}
                        </MainLink>
                      )}
                      {!buildPlayer.player.isMonster && (
                        <MainLink
                          onClick={() =>
                            history.push(`/char-detail/name/${buildPlayer.player.name}`)
                          }
                        >
                          {buildPlayer.player.name}
                        </MainLink>
                      )}
                    </Prop>
                    <PropRight>
                      <DamageButton onClick={() => showDamageDialog(index)}>
                        <GiBroadsword />
                        <GiHeartBottle />
                      </DamageButton>
                      {dmView && `${buildPlayer.player.currentHp} / ${buildPlayer.player.hp}`}
                    </PropRight>
                    {dmView && <Prop>{buildPlayer.player.ac}</Prop>}
                    {/* <Prop>{player.tag}</Prop> */}
                    <td>
                      {buildPlayer.player.currentHp > 0 && (
                        <IconButton
                          icon={faSkullCrossbones}
                          onClick={() => killPlayer(buildPlayer.player)}
                        />
                      )}
                      {buildPlayer.player.currentHp <= 0 && (
                        <IconButton
                          icon={faHandHoldingHeart}
                          onClick={() => revicePlayer(buildPlayer.player)}
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
      {loadedEncounter && encounter.map !== "" && encounter.map !== undefined && (
        <Board
          onChangePlayers={onChangePlayers}
          players={loadedEncounter.players}
          dimension={
            encounter.dimension !== undefined
              ? encounter.dimension
              : { width: 20, height: 20, size: 20, zoom: 100 }
          }
          currentPlayerNumber={loadedEncounter.encounter.currentInit}
          onChangeDimension={onChangeDimension}
          img={encounter.map}
        ></Board>
      )}
    </CenterWrapper>
  );
};

export default EncounterView;

const DamageButton = styled.button`
  svg {
    color: ${({ theme }) => theme.buttons.color};
  }
  font-size: 16px;
  float: left;
  padding: 5px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px 0px rgba(0, 0, 0, 0.3);
  box-sizing: content-box;
  border-radius: 10px;
  border: none;

  transition: color 0.2s;
  background: ${({ theme }) => theme.buttons.backgroundColor};
  &:hover {
    color: ${({ theme }) => theme.buttons.hoverColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttons.disabled};
  }
`;

interface $PlayerImageProps {
  player: BuildPlayer;
}

const PlayerImage = ({ player }: $PlayerImageProps) => {
  return <Image pic={player.entity.pic} />;
};

const Table = styled.table`
  width: 100%;
`;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

type viewType = {
  mode?: number;
};

const View = styled.div<viewType>`
  flex: 1 1;
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  max-width: 800px;
  ${(props) => {
    if (!props.mode) {
      return "min-width: 400px;";
    } else {
      return "min-width: 500px;";
    }
  }}
  padding: 5px;

  @media (max-width: 576px) {
    min-width: 100%;
  }
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
      return `td:nth-child(1) {background-color: ${props.theme.main.highlight};}`;
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
  line-height: 34px;
`;

const PropRight = styled(Prop)`
  text-align: right;
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

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  if (pic !== "") {
    return <ImageElm style={style}></ImageElm>;
  } else {
    return <Empty />;
  }
};

const ImageElm = styled.div`
  margin-right: 5px;
  margin-top: -7px;
  margin-bottom: -7px;
  height: 43px;
  width: 43px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;

  @media (max-width: 576px) {
    display: none;
  }
`;
const Empty = styled.div``;
