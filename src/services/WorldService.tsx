import BuildWorld from "../data/world/BuildWorld";
import World from "../data/world/World";
import Location from "../data/world/Location";
import Event from "../data/world/Event";
import { recivePromiseByMultiAttribute } from "./DatabaseService";

export const buildWorld = async (world: World): Promise<BuildWorld> => {
  console.time("t");
  let events: Event[];
  let locations: Location[];
  let map: Location;

  console.time("load");
  let eventList: Promise<Event>[] = [];
  let locationList: Promise<Location>[] = [];

  world.events?.forEach((event: string) => {
    let [name, sources] = event.split("|");
    eventList.push(recivePromiseByMultiAttribute("events", { name: name, sources: sources }));
  });
  world.locations?.forEach((location: string) => {
    let [name, sources] = location.split("|");
    locationList.push(recivePromiseByMultiAttribute("locations", { name: name, sources: sources }));
  });
  events = await Promise.all(eventList);
  locations = await Promise.all(locationList);
  let [name, sources] = world.map.split("|");
  map = await recivePromiseByMultiAttribute("locations", { name: name, sources: sources });
  console.timeEnd("load");

  console.timeEnd("t");
  return new BuildWorld(world, locations, events, map);
};
