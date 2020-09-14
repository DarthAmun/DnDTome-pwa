export default class ClassSet {
    classe: string;
    level: number;
    subclasse: string;
  
    constructor(
        classe: string,
        level: number,
        subclasse: string,
    ) {
        this.level = level;
        this.classe = classe;
        this.subclasse = subclasse;
    }
  }
  
  export function isClassSet(arg: any): arg is ClassSet {
    const classeCheck = arg.classe !== undefined && typeof arg.classe == "string";
    const levelCheck = arg.level !== undefined && typeof arg.level == "number";
    const subclasseCheck = arg.subclasse !== undefined && typeof arg.subclasse == "string";
    return (
      arg &&
      levelCheck &&
      classeCheck &&
      subclasseCheck
    );
  }
  