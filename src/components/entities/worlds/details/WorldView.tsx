import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import World from "../../../../data/world/World";
import Location from "../../../../data/world/Location";
import Event from "../../../../data/world/Event";
import BuildWorld from "../../../../data/world/BuildWorld";
import { buildWorld } from "../../../../services/WorldService";

import FormatedText from "../../../general_elements/FormatedText";
import TabBar from "../../../general_elements/TabBar";
import Map from "../../../general_elements/map/Map";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "../../../Loading";
import LocationTile from "../../locations/LocationTile";
import EventTile from "../../events/EventTile";

interface $Props {
  world: World;
  onEdit: (value: World) => void;
}

const WorldView = ({ world, onEdit }: $Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedWorld, setLoadedWorld] = useState<BuildWorld>(new BuildWorld());
  const [activeTab, setTab] = useState<string>("General");

  useEffect(() => {
    buildWorld(world).then((buildWorld) => {
      setLoadedWorld(buildWorld);
      setLoading(false);
    });
  }, [world, setLoadedWorld]);

  const getPicture = useCallback(() => {
    if (loadedWorld !== undefined) {
      if (
        loadedWorld.map.mapBase64 !== "" &&
        loadedWorld.map.mapBase64 !== null &&
        loadedWorld.map.mapBase64 !== undefined
      ) {
        return loadedWorld.map.mapBase64;
      } else if (
        loadedWorld.map.map !== "" &&
        loadedWorld.map.map !== null &&
        loadedWorld.map.map !== undefined
      ) {
        return loadedWorld.map.map;
      }
    }
    return "";
  }, [loadedWorld]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && loadedWorld && (
        <CenterWrapper>
          <Header>
            <View>
              {getPicture() !== "" ? (
                <ImageName>
                  <Image pic={getPicture()}></Image>
                  <b>{loadedWorld.world.name}</b>
                </ImageName>
              ) : (
                <Name>
                  <b>{loadedWorld.world.name}</b>
                </Name>
              )}
            </View>
          </Header>
          <TabBar
            children={["General", "Locations", "Events", "World Map"]}
            onChange={(tab: string) => setTab(tab)}
            activeTab={activeTab}
          />
          {activeTab === "General" && (
            <View>
              <Text>
                <PropTitle>Description</PropTitle>
                <FormatedText text={loadedWorld.world.description} />
              </Text>
              <PropWrapper>
                <Prop>
                  <Icon icon={faLink} />
                  {loadedWorld.world.sources}
                </Prop>
              </PropWrapper>
            </View>
          )}
          {activeTab === "Locations" && (
            <PropWrapper>
              {loadedWorld.locations.map((location: Location, index: number) => {
                return <LocationTile location={location} key={index} />;
              })}
            </PropWrapper>
          )}
          {activeTab === "Events" && (
            <PropWrapper>
              {loadedWorld.events
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event: Event, index: number) => {
                  return <EventTile event={event} key={index} />;
                })}
            </PropWrapper>
          )}
          {activeTab === "World Map" && <Map editable={false} location={loadedWorld.map} />}
        </CenterWrapper>
      )}
    </>
  );
};

export default WorldView;

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

const Header = styled.div`
  position: relative;
  z-index: 200;
  width: 100%;
  height: 70px;
  margin-bottom: -5px;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`;

const ImageName = styled.div`
  height: 30px;
  float: left;
  padding: 10px;
  margin: 5px 5px 10px 5px;
  width: calc(100% - 30px);
  color: var(--card-title-color);
  text-align: center;
  border-radius: 50px 5px 5px 50px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
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

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.tile.backgroundColorLink};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Prop = styled.div`
  flex: 1 1 auto;
  color: ${({ theme }) => theme.tile.color};
  max-width: 100%;
  height: auto;
  margin: 2px;
  float: left;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Text = styled.div`
  height: auto;
  width: calc(100% - 30px);
  margin: 10px 5px 5px 5px;
  float: left;
  line-height: 18px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.tile.backgroundColor};
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

interface $ImageProps {
  pic: string;
}

const Image = ({ pic }: $ImageProps) => {
  const style = {
    backgroundImage: `url('${pic}')`,
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
  margin: -10px 5px -10px -10px;
  height: 47px;
  width: 47px;
  float: left;
  border-radius: 100px;
  border: 3px solid ${({ theme }) => theme.main.highlight};
  box-shadow: 0px 0px 10px 0px rgba(172, 172, 172, 0.2);
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
