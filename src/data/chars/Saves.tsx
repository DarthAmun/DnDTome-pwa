export default class Saves {
  strSaveProf: number;
  dexSaveProf: number;
  conSaveProf: number;
  intSaveProf: number;
  wisSaveProf: number;
  chaSaveProf: number;

  constructor(
    strSaveProf?: number,
    dexSaveProf?: number,
    conSaveProf?: number,
    intSaveProf?: number,
    wisSaveProf?: number,
    chaSaveProf?: number
  ) {
    this.strSaveProf = strSaveProf || 0;
    this.dexSaveProf = dexSaveProf || 0;
    this.conSaveProf = conSaveProf || 0;
    this.intSaveProf = intSaveProf || 0;
    this.wisSaveProf = wisSaveProf || 0;
    this.chaSaveProf = chaSaveProf || 0;
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
