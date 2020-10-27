import { Interface } from "readline";

export default interface IEntity {
    id?: number;
    name: string;
}

export function isIEntity(arg: any): arg is IEntity {
    const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  
    return (
      arg &&
      nameCheck 
    );
  }