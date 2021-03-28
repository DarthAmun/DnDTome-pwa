import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import BuildEncounter from "../../../../data/encounter/BuildEncounter";
import BuildPlayer from "../../../../data/encounter/BuildPlayer";
import Player from "../../../../data/encounter/Player";
import Board from "../../../general_elements/board/Board";
import P2PEncounter from "../../../p2p/P2PEncounter";

const EncounterRoom = () => {
  let history = useHistory();
  const [encounter, onEdit] = useState<BuildEncounter>();

  const onChangePlayers = useCallback(
    (players: BuildPlayer[]) => {
      if (encounter !== undefined) {
        if (players !== encounter?.players) {
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

          onEdit({
            ...encounter,
            encounter: { ...encounter.encounter, players: newPlayers, enemies: newEnemies },
          });
        }
      }
    },
    [encounter, onEdit]
  );

  const getMap = useCallback(() => {
    if (encounter !== undefined) {
      if (
        encounter.encounter.mapBase64 !== "" &&
        encounter.encounter.mapBase64 !== null &&
        encounter.encounter.mapBase64 !== undefined
      ) {
        return encounter.encounter.mapBase64;
      } else if (
        encounter.encounter.map !== "" &&
        encounter.encounter.map !== null &&
        encounter.encounter.map !== undefined
      ) {
        return encounter.encounter.map;
      }
    }
    return "";
  }, [encounter]);

  return (
    <>
      <P2PEncounter encounter={encounter} onEdit={onEdit} isHost={false} />
      <CenterWrapper>
        <View mode={0}>
          <Name>
            <b>{encounter?.encounter?.name}</b>
          </Name>
          <PropWrapper>
            <PropElm>
              <PropTitle>Round: </PropTitle>
              {encounter?.encounter?.roundCounter}
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
                encounter.players.map((buildPlayer: BuildPlayer, index: number) => {
                  return (
                    <Row
                      current={
                        encounter.encounter.currentInit === index && encounter.encounter.isPlaying
                      }
                      isDead={buildPlayer.player.currentHp <= 0}
                      key={index}
                    >
                      <PropField>{buildPlayer.player.init}</PropField>
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
                            {"???"}
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
                    </Row>
                  );
                })}
            </tbody>
          </Table>
        </View>
        {encounter && getMap() !== "" && (
          <Board
            onChangePlayers={onChangePlayers}
            players={encounter.players}
            showName={false}
            dimension={
              encounter.encounter.dimension !== undefined
                ? encounter.encounter.dimension
                : { width: 20, height: 20, size: 20, zoom: 100 }
            }
            currentPlayerNumber={encounter.encounter.currentInit}
            onChangeDimension={() => {}}
            img={getMap()}
          ></Board>
        )}
      </CenterWrapper>
    </>
  );
};

export default EncounterRoom;

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
