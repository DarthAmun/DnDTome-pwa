import React, { useRef, useState, useCallback, useEffect } from "react";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Location from "../../data/world/Location";

interface $Props {
  location: Location;
}

const Map = ({ location }: $Props) => {
  const mapWrap = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapHeight, setHeight] = useState<string>();
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

  return (
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
  );
};

export default Map;

const MapWrapper = styled.div`
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  height: calc(100vh - 265px);
  width: calc(100% - 6px);
`;
