import IEntity from "../data/IEntity";

export const upgradeTo28 = (entry: {
  tableName: string;
  newEntitiy: any;
}): { tableName: string; newEntitiy: IEntity } => {
  if (entry.tableName === "spells") {
    if (entry.newEntitiy.text && !Array.isArray(entry.newEntitiy.classes)) {
      let spell: any = entry.newEntitiy;
      spell.description = spell.text;
      delete spell.text;
      spell.classes = spell.classes.replaceAll(" ", "").split(",");
      return { ...entry, newEntitiy: spell };
    }
    return entry;
  }
  return entry;
};
