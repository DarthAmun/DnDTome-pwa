import React, { useCallback, useState } from "react";
import Location from "../../../../data/world/Location";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../form_elements/TextButton";
import Map from "../../../general_elements/map/Map";
import P2PSender from "../../../p2p/P2PSender";

import "leaflet/dist/leaflet.css";

interface $Props {
  location: Location;
}

const LocationView = ({ location }: $Props) => {
  const [send, setSend] = useState<boolean>(false);

  const getPicture = useCallback(() => {
    if (location !== undefined) {
      if (
        location.mapBase64 !== "" &&
        location.mapBase64 !== null &&
        location.mapBase64 !== undefined
      ) {
        return location.mapBase64;
      } else if (location.map !== "" && location.map !== null && location.map !== undefined) {
        return location.map;
      }
    }
    return "";
  }, [location]);

  return (
    <CenterWrapper>
      <View>
        {getPicture() !== "" ? (
          <ImageName>
            <Image pic={getPicture()}></Image>
            <b>{location.name}</b>
          </ImageName>
        ) : (
          <Name>
            <b>{location.name}</b>
          </Name>
        )}
      </View>

      <Map editable={false} location={location} />
      <View>
        <PropWrapper>
          {!send && (
            <TextButton
              text={`Send ${location.name}`}
              icon={faPaperPlane}
              onClick={() => setSend(true)}
            />
          )}
          {!!send && <P2PSender data={location} mode={"THIS"} />}
        </PropWrapper>
      </View>
    </CenterWrapper>
  );
};

export default LocationView;

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
  background-color: white;
  overflow: hidden;
`;
const Empty = styled.div``;
