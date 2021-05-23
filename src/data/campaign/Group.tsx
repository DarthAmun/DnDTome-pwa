import { FlowElement } from "react-flow-renderer";
import IEntity from "../IEntity";
import Note from "./Note";

export default class Group implements IEntity {
  id?: number;
  name: string;
  pic: string;
  picBase64: string;
  description: string;
  notes: Note[];
  players: string[];
  npcs: string[];
  monsters: string[];
  flow: FlowElement[];
  sources: string;
  filename?: string;

  constructor(
    id?: number,
    name?: string,
    pic?: string,
    picBase64?: string,
    description?: string,
    notes?: Note[],
    players?: string[],
    npcs?: string[],
    monsters?: string[],
    flow?: FlowElement[],
    sources?: string,
    filename?: string
  ) {
    this.id = id;
    this.name = name || "";
    this.pic = pic || "";
    this.picBase64 = picBase64 || "";
    this.description = description || "";
    this.notes = notes || [];
    this.players = players || [];
    this.npcs = npcs || [];
    this.monsters = monsters || [];
    this.flow = flow || [];
    this.sources = sources || "";
    this.filename = filename || "";
  }
}

export function isGroup(arg: any): arg is Group {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const picBase64Check = arg.picBase64 !== undefined && typeof arg.picBase64 == "string";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const descriptionCheck = arg.description !== undefined && typeof arg.description == "string";
  const notesCheck = arg.notes !== undefined && Array.isArray(arg.notes);
  const playersCheck = arg.players !== undefined && Array.isArray(arg.players);
  const npcsCheck = arg.npcs !== undefined && Array.isArray(arg.npcs);
  const monstersCheck = arg.monsters !== undefined && Array.isArray(arg.monsters);
  const flowCheck = arg.flow !== undefined && Array.isArray(arg.flow);
  const sourcesCheck = arg.sources !== undefined && typeof arg.sources == "string";

  return (
    arg &&
    nameCheck &&
    (picCheck || picBase64Check) &&
    descriptionCheck &&
    notesCheck &&
    playersCheck &&
    npcsCheck &&
    monstersCheck &&
    flowCheck &&
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
