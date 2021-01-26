import BuildWorld from "../data/world/BuildWorld";
import World from "../data/world/World";
import Location from "../data/world/Location";
import Event from "../data/world/Event";
import { recivePromiseByAttribute } from "./DatabaseService";

export const buildWorld = async (world: World): Promise<BuildWorld> => {
  console.time("t");
  let events: Event[];
  let locations: Location[];
  let map: Location;

  console.time("load");
  let eventList: Promise<Event>[] = [];
  let locationList: Promise<Location>[] = [];

  world.events.forEach((event: string) => {
    eventList.push(recivePromiseByAttribute("events", "name", event));
  });
  world.locations.forEach((location: string) => {
    locationList.push(recivePromiseByAttribute("locations", "name", location));
  });
  events = await Promise.all(eventList);
  locations = await Promise.all(locationList);
  map = await recivePromiseByAttribute("locations", "name", world.map);
  console.timeEnd("load");

  console.timeEnd("t");
  return new BuildWorld(world, locations, events, map);
};
