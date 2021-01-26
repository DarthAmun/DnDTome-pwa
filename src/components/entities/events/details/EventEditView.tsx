import React from "react";
import styled from "styled-components";
import Event from "../../../../data/world/Event";

import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";

import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

interface $Props {
  event: Event;
  onEdit: (value: Event) => void;
}

const EventEditView = ({ event, onEdit }: $Props) => {
  return (
    <CenterWrapper>
      <View>
        <StringField
          value={event.name}
          label="Name"
          onChange={(name) => onEdit({ ...event, name: name })}
        />
        <StringField
          value={event.date}
          label="Date"
          onChange={(date) => onEdit({ ...event, date: date })}
        />
        <StringField
          value={event.sources}
          label="Sources"
          onChange={(sources) => onEdit({ ...event, sources: sources })}
        />
        <TextField
          value={event.description}
          label="Description"
          icon={faBookOpen}
          onChange={(description) => onEdit({ ...event, description: description })}
        />
      </View>
    </CenterWrapper>
  );
};

export default EventEditView;

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
