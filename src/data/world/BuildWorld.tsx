import Location from "./Location";
import Event from "./Event";
import World from "./World";

export default class BuildWorld {
  world: World;
  locations: Location[];
  events: Event[];
  map: Location;

  constructor(world?: World, locations?: Location[], events?: Event[], map?: Location) {
    this.world = world || new World();
    this.locations = locations || [];
    this.events = events || [];
    this.map = map || new Location();
  }
}
