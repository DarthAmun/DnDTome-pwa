import React, { useState } from "react";
import styled from "styled-components";
import World from "../../../../data/world/World";

import { faBookOpen, faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TabBar from "../../../general_elements/TabBar";
import StringField from "../../../form_elements/StringField";
import TextField from "../../../form_elements/TextField";
import IconButton from "../../../form_elements/IconButton";
import TextButton from "../../../form_elements/TextButton";
import DataSelectField from "../../../form_elements/DataSelectField";

interface $Props {
  world: World;
  onEdit: (value: World) => void;
}

const WorldEditView = ({ world, onEdit }: $Props) => {
  const [activeTab, setTab] = useState<string>("General");

  const removeLocation = (oldLocation: string) => {
    if (world !== undefined) {
      let newLocationlList = world.locations
        .filter((location: string) => location !== oldLocation)
        .map((location: string) => {
          return location;
        });
      onEdit({ ...world, locations: newLocationlList });
    }
  };
  const addNewLocation = () => {
    if (world !== undefined) {
      let newLocationlList = world.locations.map((location: string) => {
        return location;
      });
      newLocationlList.push("");
      onEdit({ ...world, locations: newLocationlList });
    }
  };
  const onChangeLocation = (newLocation: string, oldLocation: string) => {
    if (world !== undefined) {
      let newLocationlList = world.locations.map((location: string) => {
        if (location === oldLocation) {
          return newLocation;
        } else {
          return location;
        }
      });
      onEdit({ ...world, locations: newLocationlList });
    }
  };

  const removeEvent = (oldEvent: string) => {
    if (world !== undefined) {
      let newEventlList = world.events
        .filter((event: string) => event !== oldEvent)
        .map((event: string) => {
          return event;
        });
      onEdit({ ...world, events: newEventlList });
    }
  };
  const addNewEvent = () => {
    if (world !== undefined) {
      let newEventlList = world.events.map((event: string) => {
        return event;
      });
      newEventlList.push("");
      onEdit({ ...world, events: newEventlList });
    }
  };
  const onChangeEvent = (newEvent: string, oldEvent: string) => {
    if (world !== undefined) {
      let newEventlList = world.events.map((event: string) => {
        if (event === oldEvent) {
          return newEvent;
        } else {
          return event;
        }
      });
      onEdit({ ...world, events: newEventlList });
    }
  };

  return (
    <CenterWrapper>
      <TabBar
        children={["General", "Locations", "Events", "World Map"]}
        onChange={(tab: string) => setTab(tab)}
        activeTab={activeTab}
      />
      {activeTab === "General" && (
        <View>
          <StringField
            value={world.name}
            label="World Name"
            onChange={(name) => onEdit({ ...world, name: name })}
          />
          <StringField
            value={world.sources}
            label="Sources"
            icon={faLink}
            onChange={(sources) => onEdit({ ...world, sources: sources })}
          />
          <TextField
            value={world.description}
            label="Description"
            icon={faBookOpen}
            onChange={(description) => onEdit({ ...world, description: description })}
          />
        </View>
      )}
      {activeTab === "Locations" && (
        <>
          {world.locations.map((location: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["locations"]}
                  value={location}
                  label="Location"
                  onChange={(newLocation) => onChangeLocation(newLocation, location)}
                />
                <IconButton icon={faTrash} onClick={() => removeLocation(location)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Location"} icon={faPlus} onClick={() => addNewLocation()} />
        </>
      )}
      {activeTab === "Events" && (
        <>
          {world.events.map((event: string, index: number) => {
            return (
              <Container key={index}>
                <DataSelectField
                  optionTable={["events"]}
                  value={event}
                  label="Event"
                  onChange={(newEvent) => onChangeEvent(newEvent, event)}
                />
                <IconButton icon={faTrash} onClick={() => removeEvent(event)} />
              </Container>
            );
          })}
          <TextButton text={"Add new Event"} icon={faPlus} onClick={() => addNewEvent()} />
        </>
      )}
      {activeTab === "World Map" && (
        <Container>
          <DataSelectField
            optionTable={["locations"]}
            value={world.map}
            label="Map"
            onChange={(newMap) => onEdit({ ...world, map: newMap })}
          />
        </Container>
      )}
    </CenterWrapper>
  );
};

export default WorldEditView;

const CenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1 1 100%;
`;
