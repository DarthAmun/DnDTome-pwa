import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Location from "../../../../data/world/Location";
import styled from "styled-components";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../../../form_elements/TextButton";
import P2PSender from "../../../p2p/P2PSender";

import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface $Props {
  location: Location;
}

const LocationView = ({ location }: $Props) => {
  const mapWrap = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapHeight, setHeight] = useState<string>();
  const [send, setSend] = useState<boolean>(false);
  const [bounds, setBounds] = useState<any>();
  const position: any = [0, 0];

  const gcd = useCallback((a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
  }, []);

  const reduceBounds = (number: number[][]): number[][] => {
    const newBounds = [
      [number[0][0] * 0.5, number[0][1] * 0.5],
      [number[1][0] * 0.5, number[1][1] * 0.5],
    ];
    console.log("Fit those bounds: ", number, "to", newBounds);
    return newBounds;
  };

  useEffect(() => {
    if (
      location.dimension !== undefined &&
      location.map !== undefined &&
      location.map !== "" &&
      location.dimension !== { height: 0, width: 0 }
    ) {
      const divisor = gcd(location.dimension.width, location.dimension.height);
      const widthratio = location.dimension.width / divisor;
      const heightratio = location.dimension.height / divisor;
      const bounds: any = [
        [-(heightratio / 2), -(widthratio / 2)],
        [heightratio / 2, widthratio / 2],
      ];

      console.log(
        `${widthratio}:${heightratio}`,
        bounds,
        widthratio > heightratio ? heightratio : widthratio
      );
      setBounds(bounds);
    }
  }, [location, gcd]);

  useEffect(() => {
    if (map !== null && bounds) {
      map.fitBounds(reduceBounds(bounds));
    }
  }, [map, bounds]);

  useEffect(() => {
    if (mapWrap && mapWrap.current) {
      const height = mapWrap.current.clientHeight;
      setHeight(height + "px");
    }
  }, []);

  const getPicture = useCallback(() => {
    if (location !== undefined) {
      if (location.map === "" || location.map === null) {
        return "";
      }
      return location.map;
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

      <MapWrapper ref={mapWrap}>
        {location.map && mapHeight && bounds && (
          <MapContainer
            style={{ height: mapHeight, width: "100%" }}
            center={position}
            zoom={1}
            scrollWheelZoom={false}
            whenCreated={setMap}
          >
            <TileLayer url={""} />
            <ImageOverlay bounds={bounds} url={location.map} />
            {/* <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </MapContainer>
        )}
      </MapWrapper>
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

const MapWrapper = styled(PropWrapper)`
  height: calc(100vh - 265px);
  width: calc(100% - 6px);
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
