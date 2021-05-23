import { FlowElement } from "react-flow-renderer";
import IEntity from "../IEntity";
import Note from "./Note";

// campaigns: "++id, name, pic, description, world, quests, events, notes, sources, filename",
export default class Campaign implements IEntity {
  id?: number;
  name: string;
  pic: string;
  description: string;
  players: string[];
  logs: Note[];
  map: string;
  npcs: string[];
  notes: Note[];
  flow: FlowElement[];
  sources: string;
  filename?: string;
  picBase64: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    description?: string,
    players?: string[],
    logs?: Note[],
    map?: string,
    npcs?: string[],
    notes?: Note[],
    flow?: FlowElement[],
    sources?: string,
    filename?: string,
    picBase64?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.description = description || "";
    this.players = players || [];
    this.logs = logs || [];
    this.map = map || "";
    this.npcs = npcs || [];
    this.notes = notes || [];
    this.flow = flow || [];
    this.sources = sources || "";
    this.filename = filename || "";
  }
}

export function isCampaign(arg: any): arg is Campaign {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const mapCheck = arg.map !== undefined && typeof arg.map == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const playersCheck = arg.players !== undefined && Array.isArray(arg.players);
  const logsCheck = arg.logs !== undefined && Array.isArray(arg.logs);
  const npcsCheck = arg.npcs !== undefined && Array.isArray(arg.npcs);
  const notesCheck = arg.notes !== undefined && Array.isArray(arg.notes);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    descriptionCheck &&
    playersCheck &&
    logsCheck &&
    npcsCheck &&
    notesCheck &&
    mapCheck &&
    sourcesCheck
  );
}

export function findCampaignFormattError(arg: any): {
  nameCheck: boolean;
} {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return {
    nameCheck: nameCheck,
  };
}
