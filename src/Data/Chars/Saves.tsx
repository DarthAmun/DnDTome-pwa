export default class Saves {
  strSaveProf: number;
  dexSaveProf: number;
  conSaveProf: number;
  intSaveProf: number;
  wisSaveProf: number;
  chaSaveProf: number;

  constructor(
    strSaveProf: number,
    dexSaveProf: number,
    conSaveProf: number,
    intSaveProf: number,
    wisSaveProf: number,
    chaSaveProf: number
  ) {
    this.strSaveProf = strSaveProf;
    this.dexSaveProf = dexSaveProf;
    this.conSaveProf = conSaveProf;
    this.intSaveProf = intSaveProf;
    this.wisSaveProf = wisSaveProf;
    this.chaSaveProf = chaSaveProf;
  }
}

export function isSaves(arg: any): arg is Saves {
  const strSaveProfCheck =
    arg.strSaveProf !== undefined && typeof arg.strSaveProf == "number";
  const dexSaveProfCheck =
    arg.dexSaveProf !== undefined && typeof arg.dexSaveProf == "number";
  const conSaveProfCheck =
    arg.conSaveProf !== undefined && typeof arg.conSaveProf == "number";
  const intSaveProfCheck =
    arg.intSaveProf !== undefined && typeof arg.intSaveProf == "number";
  const wisSaveProfCheck =
    arg.wisSaveProf !== undefined && typeof arg.wisSaveProf == "number";
  const chaSaveProfCheck =
    arg.chaSaveProf !== undefined && typeof arg.chaSaveProf == "number";

  return (
    arg &&
    strSaveProfCheck &&
    dexSaveProfCheck &&
    conSaveProfCheck &&
    intSaveProfCheck &&
    wisSaveProfCheck &&
    chaSaveProfCheck
  );
}
