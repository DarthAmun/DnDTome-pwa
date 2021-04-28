import { Icon, LatLng } from "leaflet";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { ImageOverlay, MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import styled from "styled-components";
import Location from "../../../data/world/Location";
import FormatedText from "../FormatedText";
import MarkerEditDialog from "./MarkerEditDialog";

import marker2x from "./marker-icon-2x.png";
import marker from "./marker-icon.png";
import markerShadow from "./marker-shadow.png";

interface $Props {
  location: Location;
  editable: boolean;
  onEdit?: (value: Location) => void;
}

const Map = ({ location, editable, onEdit }: $Props) => {
  const [showEditDialog, setEditDialaog] = useState<boolean>(false);
  const [activeElement, setActive] = useState<number>();

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
      setBounds(bounds);
    }
  }, [location.map, location.dimension, gcd]);

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

  const onSave = (element: { position: LatLng; text: string }) => {
    if (editable && onEdit !== undefined && activeElement !== undefined) {
      let markerList = [...location.markers];
      markerList[activeElement] = element;
      onEdit({
        ...location,
        markers: markerList,
      });
    }
  };

  const onDelete = () => {
    if (editable && onEdit !== undefined && activeElement !== undefined) {
      let markerList = [...location.markers];
      markerList.splice(activeElement, 1);
      setEditDialaog(false);
      setActive(undefined);
      onEdit({
        ...location,
        markers: markerList,
      });
    }
  };

  return (
    <MapWrapper ref={mapWrap}>
      {showEditDialog && activeElement !== undefined && (
        <MarkerEditDialog
          activeElement={location.markers[activeElement]}
          onSave={onSave}
          onDelete={onDelete}
          onClose={() => setEditDialaog(false)}
        ></MarkerEditDialog>
      )}
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
          <Markers
            markerPositions={location.markers}
            location={location}
            editable={editable}
            onEdit={onEdit}
            setActive={setActive}
            setEditDialaog={setEditDialaog}
          />
        </MapContainer>
      )}
    </MapWrapper>
  );
};

export default Map;

interface $MarkersProps {
  location: Location;
  editable: boolean;
  markerPositions: { position: LatLng; text: string }[];
  onEdit?: (value: Location) => void;
  setActive: (value: number) => void;
  setEditDialaog: (value: boolean) => void;
}

const Markers = ({
  location,
  editable,
  markerPositions,
  onEdit,
  setActive,
  setEditDialaog,
}: $MarkersProps) => {
  useMapEvents({
    click(e) {
      if (editable && onEdit !== undefined) {
        onEdit({
          ...location,
          markers: [...location.markers, { position: e.latlng, text: "New" }],
        });
      }
    },
  });

  const editMarker = (index: number) => {
    if (editable && onEdit !== undefined) {
      setActive(index);
      setEditDialaog(true);
    }
  };

  let icon = new Icon({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <>
      {markerPositions &&
        markerPositions.map((marker: { position: LatLng; text: string }, index: number) => {
          return (
            <Marker key={index} position={marker.position} icon={icon}>
              <Popup autoPan={true} minWidth={120} onOpen={() => editMarker(index)}>
                <FormatedText text={marker.text} />
              </Popup>
            </Marker>
          );
        })}
    </>
  );
};

const MapWrapper = styled.div`
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;

  height: calc(100vh - 265px);
  width: calc(100% - 6px);

  & .leaflet-popup {
    .leaflet-popup-content-wrapper {
      background-color: ${({ theme }) => theme.tile.backgroundColor};
      color: ${({ theme }) => theme.tile.color};
    }
    .leaflet-popup-tip {
      background-color: ${({ theme }) => theme.tile.backgroundColor};
    }
  }
`;
