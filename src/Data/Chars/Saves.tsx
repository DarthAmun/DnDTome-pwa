export default class Saves {
  strSave: number;
  dexSave: number;
  conSave: number;
  intSave: number;
  wisSave: number;
  chaSave: number;
  strSaveProf: number;
  dexSaveProf: number;
  conSaveProf: number;
  intSaveProf: number;
  wisSaveProf: number;
  chaSaveProf: number;

  constructor(
    strSave: number,
    dexSave: number,
    conSave: number,
    intSave: number,
    wisSave: number,
    chaSave: number,
    strSaveProf: number,
    dexSaveProf: number,
    conSaveProf: number,
    intSaveProf: number,
    wisSaveProf: number,
    chaSaveProf: number
  ) {
    this.strSave = strSave;
    this.dexSave = dexSave;
    this.conSave = conSave;
    this.intSave = intSave;
    this.wisSave = wisSave;
    this.chaSave = chaSave;
    this.strSaveProf = strSaveProf;
    this.dexSaveProf = dexSaveProf;
    this.conSaveProf = conSaveProf;
    this.intSaveProf = intSaveProf;
    this.wisSaveProf = wisSaveProf;
    this.chaSaveProf = chaSaveProf;
  }
}

export function isSaves(arg: any): arg is Saves {
  const strSaveCheck =
    arg.strSave !== undefined && typeof arg.strSave == "number";
  const dexSaveCheck =
    arg.dexSave !== undefined && typeof arg.dexSave == "number";
  const conSaveCheck =
    arg.conSave !== undefined && typeof arg.conSave == "number";
  const intSaveCheck =
    arg.intSave !== undefined && typeof arg.intSave == "number";
  const wisSaveCheck =
    arg.wisSave !== undefined && typeof arg.wisSave == "number";
  const chaSaveCheck =
    arg.chaSave !== undefined && typeof arg.chaSave == "number";
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
    strSaveCheck &&
    dexSaveCheck &&
    conSaveCheck &&
    intSaveCheck &&
    wisSaveCheck &&
    chaSaveCheck &&
    strSaveProfCheck &&
    dexSaveProfCheck &&
    conSaveProfCheck &&
    intSaveProfCheck &&
    wisSaveProfCheck &&
    chaSaveProfCheck
  );
}
