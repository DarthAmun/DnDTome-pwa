import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEye,
  faEyeSlash,
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
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import { rollDie } from "../../../../services/DiceService";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import TinyNumberField from "../../../form_elements/TinyNumberField";
import Board from "../../../general_elements/board/Board";
import { DamageDialog } from "../../../general_elements/Dialog";
import { calcDifficulty } from "../../../../services/EncounterService";
import { LoadingSpinner } from "../../../Loading";
import Slot from "../../../../data/encounter/Slot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface $Props {
  encounter: Encounter;
  dmView: boolean;
  onEdit: (value: Encounter) => void;
}

const EncounterView = ({ encounter, dmView, onEdit }: $Props) => {
  let history = useHistory();
  const [damageDialog, setDamageDialog] = useState<boolean>(false);
  const [damageDialogIndex, setDamageDialogIndex] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [initTracker, showInitTracker] = useState<boolean>(false);

  useEffect(() => {
    if (encounter !== undefined) {
      setPlayers([...encounter.players, ...encounter.enemies]);
    }
  }, [encounter]);

  useEffect(() => {
    if (encounter !== undefined) {
      const { difficulty } = calcDifficulty(encounter);
      setDifficulty(difficulty);
    }
  }, [encounter]);

  const onChangePlayerField = (
    field: string,
    newField: string | number | boolean,
    oldPlayer: Player
  ) => {
    if (encounter !== undefined) {
      if (oldPlayer.isEnemy) {
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
    }
  };

  const killPlayer = (enemy: Player) => {
    onChangePlayerField("currentHp", 0, enemy);
  };

  const revicePlayer = (enemy: Player) => {
    onChangePlayerField("currentHp", 1, enemy);
  };

  const startEncounter = () => {
    if (encounter !== undefined) {
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
    }
  };

  const finishEncounter = () => {
    if (encounter !== undefined) {
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
    }
  };

  const nextPlayer = () => {
    if (encounter !== undefined) {
      let nextInit = (encounter.currentInit + 1) % players.length;
      let roundCounter = encounter.roundCounter;
      if ((encounter.currentInit + 1) % players.length === 0) {
        roundCounter++;
      }

      let counter = 0;
      while (players[nextInit].currentHp <= 0 || players[nextInit].isVisible) {
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
    }
  };

  const onChangePlayers = useCallback(
    (players: Player[]) => {
      if (encounter !== undefined) {
        if (players !== encounter.players) {
          let newPlayers: Player[] = [];
          players.forEach((player: Player) => {
            if (!player.isEnemy) {
              newPlayers.push(player);
            }
          });
          let newEnemies: Player[] = [];
          players.forEach((player: Player) => {
            if (player.isEnemy) {
              newEnemies.push(player);
            }
          });
          onEdit({ ...encounter, players: newPlayers, enemies: newEnemies });
        }
      }
    },
    [encounter, onEdit]
  );

  const onChangeDimension = (dimension: {
    width: number;
    height: number;
    size: number;
    zoom: number;
  }) => {
    if (dimension.zoom === encounter.dimension.zoom) {
      console.time("makeFogBoard");
      let newBoard: Slot[] = [...Array(dimension.width * dimension.height)].map(() => {
        return new Slot();
      });
      console.timeEnd("makeFogBoard");
      onEdit({ ...encounter, dimension: dimension, board: newBoard });
    } else {
      onEdit({ ...encounter, dimension: dimension });
    }
  };

  const getMap = useCallback(() => {
    if (encounter !== undefined) {
      if (
        encounter.mapBase64 !== "" &&
        encounter.mapBase64 !== null &&
        encounter.mapBase64 !== undefined
      ) {
        return encounter.mapBase64;
      } else if (encounter.map !== "" && encounter.map !== null && encounter.map !== undefined) {
        return encounter.map;
      }
    }
    return "";
  }, [encounter]);

  const showDamageDialog = (i: number) => {
    setDamageDialogIndex(i);
    setDamageDialog(true);
  };

  const toggleVisibility = (player: Player) => {
    onChangePlayerField("isVisible", !player.isVisible, player);
  };

  return (
    <>
      <CenterWrapper>
        {encounter && damageDialog && (
          <DamageDialog
            name={players[damageDialogIndex].name}
            damageText={"Damage"}
            damageClick={(currentHp) => {
              onChangePlayerField(
                "currentHp",
                players[damageDialogIndex].currentHp - currentHp,
                players[damageDialogIndex]
              );
              setDamageDialog(false);
            }}
            healText={"Heal"}
            healClick={(currentHp) => {
              onChangePlayerField(
                "currentHp",
                players[damageDialogIndex].currentHp + currentHp > players[damageDialogIndex].hp
                  ? players[damageDialogIndex].hp
                  : players[damageDialogIndex].currentHp + currentHp,
                players[damageDialogIndex]
              );
              setDamageDialog(false);
            }}
            abortText={"Back"}
            abortClick={() => {
              setDamageDialog(false);
            }}
          />
        )}
        <View
          mode={dmView ? 1 : 0}
          show={initTracker}
          window={encounter.map !== "" || encounter.mapBase64 !== ""}
        >
          <ScrollWrapper window={encounter.map !== "" || encounter.mapBase64 !== ""}>
            <Name>
              <b>{encounter?.name}</b>
            </Name>
            <PropWrapper>
              {dmView && (
                <PropElm>
                  <PropTitle>Difficulty: </PropTitle>
                  {difficulty}
                </PropElm>
              )}
              <PropElm>
                <PropTitle>Round: </PropTitle>
                {encounter?.roundCounter}
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
            {!encounter && <LoadingSpinner />}
            {encounter && (
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
                  {encounter &&
                    players
                      .sort((a: Player, b: Player) => {
                        if (b.init === a.init || !encounter.isPlaying) {
                          return a.name.localeCompare(b.name);
                        }
                        return b.init - a.init;
                      })
                      .filter((a) => !a.isVisible || dmView)
                      .map((player: Player, index: number) => {
                        return (
                          <Row
                            current={encounter.currentInit === index && encounter.isPlaying}
                            isDead={player.currentHp <= 0}
                            key={index}
                          >
                            <PropField>
                              <TinyNumberField
                                value={player.init}
                                onChange={(init) => onChangePlayerField("init", init, player)}
                              />
                            </PropField>
                            <Prop>
                              {player.pic !== "" && player.pic !== undefined ? (
                                <PlayerImage player={player}></PlayerImage>
                              ) : (
                                <></>
                              )}
                              {player.isMonster && (
                                <MainLink
                                  onClick={() =>
                                    history.push(`/monster-detail/name/${player.name}`)
                                  }
                                >
                                  {dmView
                                    ? `${player.name.split("|")[0]} ${index}`
                                    : `??? ${index}`}
                                </MainLink>
                              )}
                              {!player.isMonster && (
                                <MainLink
                                  onClick={() => history.push(`/char-detail/name/${player.name}`)}
                                >
                                  {player.name}
                                </MainLink>
                              )}
                            </Prop>
                            <PropRight>
                              <DamageButton onClick={() => showDamageDialog(index)}>
                                <GiBroadsword />
                                <GiHeartBottle />
                              </DamageButton>
                              {dmView && `${player.currentHp} / ${player.hp}`}
                            </PropRight>
                            {dmView && <Prop>{player.ac}</Prop>}
                            {/* <Prop>{player.tag}</Prop> */}
                            <Prop style={{ minWidth: "100px" }}>
                              {player.currentHp > 0 && (
                                <IconButton
                                  icon={faSkullCrossbones}
                                  onClick={() => killPlayer(player)}
                                />
                              )}
                              {player.currentHp <= 0 && (
                                <IconButton
                                  icon={faHandHoldingHeart}
                                  onClick={() => revicePlayer(player)}
                                />
                              )}
                              {player.isVisible && (
                                <IconButton
                                  icon={faEyeSlash}
                                  onClick={() => toggleVisibility(player)}
                                />
                              )}
                              {!player.isVisible && (
                                <IconButton icon={faEye} onClick={() => toggleVisibility(player)} />
                              )}
                            </Prop>
                          </Row>
                        );
                      })}
                </tbody>
              </Table>
            )}
          </ScrollWrapper>
          {(encounter.map !== "" || encounter.mapBase64 !== "") && (
            <MoveButton onClick={() => showInitTracker((i) => !i)}>
              <FontAwesomeIcon icon={initTracker ? faArrowAltCircleRight : faArrowAltCircleLeft} />
            </MoveButton>
          )}
        </View>
        {encounter && (encounter.map !== "" || encounter.mapBase64 !== "") && (
          <Board
            isHost={dmView}
            onChangePlayers={onChangePlayers}
            players={players}
            showName={dmView}
            dimension={
              encounter.dimension !== undefined
                ? encounter.dimension
                : { width: 20, height: 20, size: 20, zoom: 100 }
            }
            fogBoard={encounter.board}
            currentPlayerNumber={encounter.currentInit}
            onChangeDimension={(dimension) => onChangeDimension(dimension)}
            onChangeBoard={(board) => onEdit({ ...encounter, board: board })}
            img={getMap()}
          />
        )}
      </CenterWrapper>
    </>
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
  margin-right: 5px;
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
  player: Player;
}

const PlayerImage = ({ player }: $PlayerImageProps) => {
  return <Image pic={player.pic} />;
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
  mode: number;
  show: boolean;
  window: boolean;
};

const View = styled.div<viewType>`
  ${(props) => {
    if (props.window) {
      let css = "position: fixed;top: 120px;";
      if (!props.show) {
        css += "left: 100px;";
      } else {
        if (!props.mode) {
          css += "left: -360px;";
        } else {
          css += "left: -510px;";
        }
      }
      return (
        css +
        "transition: left 0.5s; z-index: 500; height: calc(100vh - 140px); overflow-x: visible; box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);"
      );
    } else {
      return "max-width: 600px;";
    }
  }}

  color: ${({ theme }) => theme.tile.color};

  font-size: 16px;
  ${(props) => {
    if (!props.mode) {
      return props.window ? "min-width: 450px;" : "width: 450px;";
    } else {
      return props.window ? "min-width: 600px;" : "width: 600px;";
    }
  }}
  padding: 5px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;
type wrapperType = {
  window: boolean;
};
const ScrollWrapper = styled.div<wrapperType>`
  ${(props) => {
    if (props.window) {
      return "width: 100%; height: 100%; overflow-y: auto; position: absolute; z-index: 500;";
    }
  }}
  background-color: ${({ theme }) => theme.main.backgroundColor};
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
  white-space: nowrap;
  display: table-cell;
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

const MoveButton = styled.div`
  position: absolute;
  top: 40vh;
  right: -40px;
  z-index: 400;

  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  transform: rotate(45deg);
  cursor: pointer;

  background-color: ${({ theme }) => theme.tile.backgroundColorLink};
  color: ${({ theme }) => theme.buttons.color};

  svg {
    transform: rotate(-45deg);
  }
`;
