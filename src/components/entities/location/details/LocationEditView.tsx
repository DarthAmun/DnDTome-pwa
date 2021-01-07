import React, { useEffect } from "react";
import styled from "styled-components";
import Location from "../../../../data/world/Location";

import StringField from "../../../form_elements/StringField";
import Map from "../../../general_elements/map/Map";

import { faLink, faImage } from "@fortawesome/free-solid-svg-icons";
import NumberField from "../../../form_elements/NumberField";

interface $Props {
  location: Location;
  onEdit: (value: Location) => void;
}

const LocationEditView = ({ location, onEdit }: $Props) => {
  useEffect(() => {
    if (location.map !== undefined && location.map !== "") {
      let url = require("url");
      let http = require("http");
      let sizeOf = require("image-size");

      let options = url.parse(location.map);
      http.get(options, function (response: any) {
        let chunks: any = [];
        response
          .on("data", function (chunk: any) {
            chunks.push(chunk);
          })
          .on("end", function () {
            let buffer = Buffer.concat(chunks);
            let size = sizeOf(buffer);
            console.log(size);
            onEdit({ ...location, dimension: { height: size.height, width: size.width } });
          });
      });
    }
  }, [location.map]);

  return (
    <CenterWrapper>
      <View>
        <StringField
          value={location.name}
          label="Name"
          onChange={(name) => onEdit({ ...location, name: name })}
        />

        <StringField
          value={location.map}
          label="Picture"
          icon={faImage}
          onChange={(pic) => onEdit({ ...location, map: pic })}
        />
        <NumberField
          value={location.dimension.width}
          label="Map width"
          onChange={(width) =>
            onEdit({ ...location, dimension: { ...location.dimension, width: width } })
          }
        />
        <NumberField
          value={location.dimension.height}
          label="Map height"
          onChange={(height) =>
            onEdit({ ...location, dimension: { ...location.dimension, height: height } })
          }
        />
        <StringField
          value={location.sources}
          label="Sources"
          icon={faLink}
          onChange={(sources) => onEdit({ ...location, sources: sources })}
        />
      </View>
      <Map editable={true} location={location} onEdit={onEdit} />
    </CenterWrapper>
  );
};

export default LocationEditView;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.tile.color};
  font-size: 16px;
  padding: 5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
