import { faArrowAltCircleRight, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Encounter from "../../../../data/encounter/Encounter";
import Player from "../../../../data/encounter/Player";
import TinyNumberField from "../../../form_elements/TinyNumberField";
import Board from "../../../general_elements/board/Board";
import P2PEncounter from "../../../p2p/P2PEncounter";

const EncounterRoom = () => {
  let history = useHistory();
  const [encounter, onEdit] = useState<Encounter>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [initTracker, showInitTracker] = useState<boolean>(false);

  useEffect(() => {
    if (encounter !== undefined) {
      setPlayers([...encounter.players, ...encounter.enemies]);
    }
  }, [encounter]);

  const onChangePlayers = useCallback(
    (players: Player[]) => {
      if (encounter !== undefined) {
        if (players !== encounter?.players) {
          let newPlayers: Player[] = [];
          players.forEach((player: Player) => {
            if (!player.isEnemy) {
              newPlayers.push(player);
            }
          });
          if (JSON.stringify(encounter.players) !== JSON.stringify(newPlayers))
            onEdit({
              ...encounter,
              players: newPlayers,
            });
        }
      }
    },
    [encounter, onEdit]
  );

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

  return (
    <>
      <P2PEncounter encounter={encounter} onEdit={onEdit} isHost={false} />
      <CenterWrapper>
        <View mode={0} show={initTracker}>
          <ScrollWrapper>
            <Name>
              <b>{encounter?.name}</b>
            </Name>
            <PropWrapper>
              <PropElm>
                <PropTitle>Round: </PropTitle>
                {encounter?.roundCounter}
              </PropElm>
            </PropWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Init</th>
                  <th>Name</th>
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
                    .filter((a) => !a.isVisible)
                    .map((player: Player, index: number) => {
                      return (
                        <Row
                          current={encounter.currentInit === index && encounter.isPlaying}
                          isDead={player.currentHp <= 0}
                          key={index}
                        >
                          <PropField>
                            <TinyNumberField value={player.init} onChange={() => undefined} />
                          </PropField>
                          <Prop>
                            {player.pic !== "" && player.pic !== undefined ? (
                              <PlayerImage player={player}></PlayerImage>
                            ) : (
                              <></>
                            )}
                            {player.isMonster && <MainLink>{"???"}</MainLink>}
                            {!player.isMonster && (
                              <MainLink
                                onClick={() => history.push(`/char-detail/name/${player.name}`)}
                              >
                                {player.name}
                              </MainLink>
                            )}
                          </Prop>
                        </Row>
                      );
                    })}
              </tbody>
            </Table>
          </ScrollWrapper>
          <MoveButton onClick={() => showInitTracker((i) => !i)}>
            <FontAwesomeIcon icon={initTracker ? faArrowAltCircleRight : faArrowAltCircleLeft} />
          </MoveButton>
        </View>
        {encounter && (
          <Board
            isHost={false}
            onChangePlayers={onChangePlayers}
            players={players}
            showName={false}
            dimension={
              encounter.dimension !== undefined
                ? encounter.dimension
                : { width: 20, height: 20, size: 20, zoom: 100 }
            }
            fogBoard={encounter.board}
            currentPlayerNumber={encounter.currentInit}
            onChangeDimension={() => {}}
            onChangeBoard={() => {}}
            img={getMap()}
          />
        )}
      </CenterWrapper>
    </>
  );
};

export default EncounterRoom;

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
};

const View = styled.div<viewType>`
  position: fixed;
  top: 120px;
  ${(props) => {
    if (!props.show) {
      return "left: 100px;";
    } else {
      if (!props.mode) {
        return "left: -360px;";
      } else {
        return "left: -510px;";
      }
    }
  }}
  transition: left 0.5s;
  z-index: 500;

  height: calc(100vh - 140px);
  overflow-x: visible;

  color: ${({ theme }) => theme.tile.color};
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);

  font-size: 16px;
  ${(props) => {
    if (!props.mode) {
      return "width: 450px;";
    } else {
      return "width: 600px;";
    }
  }}
  padding: 5px;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  background-color: ${({ theme }) => theme.main.backgroundColor};
  z-index: 500;
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
  display: table-cell;
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
