import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import Filter from "../../data/Filter";
import IEntity from "../../data/IEntity";
import { reciveAllFiltered } from "../../services/DatabaseService";

import { LoadingSpinner } from "../Loading";
import InfiniteScroll from "react-infinite-scroll-component";

import CampaignSearchBar from "../entities/campaigns/CampaignSearchBar";
import CharSearchBar from "../entities/chars/CharSearchBar";
import EncounterSearchBar from "../entities/encounters/EncounterSearchBar";
import EventSearchBar from "../entities/events/EventSearchBar";
import GearSearchBar from "../entities/gear/GearSearchBar";
import GroupSearchBar from "../entities/groups/GroupSearchBar";
import ItemSearchBar from "../entities/items/ItemSearchBar";
import LocationSearchBar from "../entities/locations/LocationSearchBar";
import MonsterSearchBar from "../entities/monsters/MonsterSearchBar";
import NpcSearchBar from "../entities/npcs/NpcSearchBar";
import QuestSearchBar from "../entities/quests/QuestSearchBar";
import RaceSearchBar from "../entities/races/RaceSearchBar";
import RandomTableSearchBar from "../entities/random_tables/RandomTableSearchBar";
import SelectionSearchBar from "../entities/selections/SelectionSearchBar";
import SpellSearchBar from "../entities/spells/SpellSearchBar";
import WorldSearchBar from "../entities/worlds/WorldSearchBar";
import ClassSearchBar from "../entities/classes/ClassSearchBar";
import BookSearchBar from "../entities/library/BookSearchBar";

import CampaignTile from "../entities/campaigns/CampaignTile";
import CharTile from "../entities/chars/CharTile";
import ClassTile from "../entities/classes/ClassTile";
import EncounterTile from "../entities/encounters/EncounterTile";
import EventTile from "../entities/events/EventTile";
import GearTile from "../entities/gear/GearTile";
import GroupTile from "../entities/groups/GroupTile";
import ItemTile from "../entities/items/ItemTile";
import BookTile from "../entities/library/BookTile";
import LocationTile from "../entities/locations/LocationTile";
import MonsterTile from "../entities/monsters/MonsterTile";
import NpcTile from "../entities/npcs/NpcTile";
import QuestTile from "../entities/quests/QuestTile";
import RaceTile from "../entities/races/RaceTile";
import RandomTableTile from "../entities/random_tables/RandomTableTile";
import SelectionTile from "../entities/selections/SelectionTile";
import SpellTile from "../entities/spells/SpellTile";
import WorldTile from "../entities/worlds/WorldTile";
import { useQuery } from "../../hooks/QueryHook";
import BackgroundSearchBar from "../entities/backgrounds/BackgroundSearchBar";
import BackgroundTile from "../entities/backgrounds/BackgroundTile";
import FeatSearchBar from "../entities/feats/FeatSearchBar";
import FeatTile from "../entities/feats/FeatTile";
import NoteSearchBar from "../entities/notes/NoteSearchBar";
import NoteTile from "../entities/notes/NoteTile";

const EntityOverview = ({ match }: RouteComponentProps) => {
  const rawFilters = useQuery().get("filter");
  const [entityName, setEntityName] = useState<string>("");
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allEntitys, setAllEntitys] = useState<IEntity[]>([]);
  const [entitys, setEntitys] = useState<IEntity[]>([]);
  const [scrollParam, setParam] = useState<{
    start: number;
    end: number;
    hasMore: boolean;
  }>({
    start: 100,
    end: 120,
    hasMore: true,
  });

  useEffect(() => {
    if (rawFilters !== null) setFilter(JSON.parse(rawFilters));
    else setFilter([]);
    setAllEntitys([]);
    setEntitys([]);
    setParam({
      start: 100,
      end: 120,
      hasMore: true,
    });
    let newMatch: string = match.path
      .split("/")
      .filter((match: string) => match.includes("-overview"))[0]
      .replaceAll("-overview", "");
    setEntityName(newMatch);
  }, [match, rawFilters]);

  useEffect(() => {
    if (entityName !== "")
      reciveAllFiltered(entityName + "s", filters, (results: any[]) => {
        setAllEntitys(results);
        setEntitys(results.slice(0, 100));
        if (results.length === 0) {
          setParam({
            start: 0,
            end: 0,
            hasMore: false,
          });
        }
      });
  }, [filters, entityName]);

  const fetchMoreData = () => {
    if (entitys.length === allEntitys.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setEntitys((s) => s.concat(allEntitys.slice(scrollParam.start, scrollParam.end)));
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  const searchbars = {
    campaign: CampaignSearchBar,
    classe: ClassSearchBar,
    event: EventSearchBar,
    gear: GearSearchBar,
    group: GroupSearchBar,
    item: ItemSearchBar,
    book: BookSearchBar,
    location: LocationSearchBar,
    monster: MonsterSearchBar,
    npc: NpcSearchBar,
    quest: QuestSearchBar,
    race: RaceSearchBar,
    randomTable: RandomTableSearchBar,
    selection: SelectionSearchBar,
    spell: SpellSearchBar,
    world: WorldSearchBar,
    char: CharSearchBar,
    encounter: EncounterSearchBar,
    feat: FeatSearchBar,
    background: BackgroundSearchBar,
    note: NoteSearchBar,
  };

  const tiles = {
    campaign: CampaignTile,
    classe: ClassTile,
    event: EventTile,
    gear: GearTile,
    group: GroupTile,
    item: ItemTile,
    book: BookTile,
    location: LocationTile,
    monster: MonsterTile,
    npc: NpcTile,
    quest: QuestTile,
    race: RaceTile,
    randomTable: RandomTableTile,
    selection: SelectionTile,
    spell: SpellTile,
    world: WorldTile,
    char: CharTile,
    encounter: EncounterTile,
    feat: FeatTile,
    background: BackgroundTile,
    note: NoteTile,
  };

  return (
    <>
      {entityName !== "" && React.createElement(searchbars[entityName], {})}
      <div id="scrollable" style={{ width: "100%" }}>
        <EntityContainer
          dataLength={entitys.length}
          next={fetchMoreData}
          hasMore={scrollParam.hasMore}
          loader={<LoadingSpinner />}
        >
          {entityName !== "" &&
            entitys.length > 0 &&
            entitys!.map((entity: IEntity, index: number) => {
              return React.createElement(tiles[entityName], {
                key: index,
                [entityName]: entity,
              });
            })}
        </EntityContainer>
      </div>
    </>
  );
};

export default EntityOverview;

const EntityContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;
