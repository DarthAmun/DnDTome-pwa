export default interface IEntity {
  id?: number;
  name: string;
  sources?: string;
}

export function isIEntity(arg: any): arg is IEntity {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";

  return arg && nameCheck;
}
