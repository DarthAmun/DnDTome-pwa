export default class Skills {
  acrobaticsProf: number;
  animalHandlingProf: number;
  arcanaProf: number;
  athleticsProf: number;
  deceptionProf: number;
  historyProf: number;
  insightProf: number;
  intimidationProf: number;
  investigationProf: number;
  medicineProf: number;
  natureProf: number;
  perceptionProf: number;
  performanceProf: number;
  persuasionProf: number;
  religionProf: number;
  sleightOfHandProf: number;
  stealthProf: number;
  survivalProf: number;

  constructor(
    acrobaticsProf: number,
    animalHandlingProf: number,
    arcanaProf: number,
    athleticsProf: number,
    deceptionProf: number,
    historyProf: number,
    insightProf: number,
    intimidationProf: number,
    investigationProf: number,
    medicineProf: number,
    natureProf: number,
    perceptionProf: number,
    performanceProf: number,
    persuasionProf: number,
    religionProf: number,
    sleightOfHandProf: number,
    stealthProf: number,
    survivalProf: number
  ) {
    this.acrobaticsProf = acrobaticsProf;
    this.animalHandlingProf = animalHandlingProf;
    this.arcanaProf = arcanaProf;
    this.athleticsProf = athleticsProf;
    this.deceptionProf = deceptionProf;
    this.historyProf = historyProf;
    this.insightProf = insightProf;
    this.intimidationProf = intimidationProf;
    this.investigationProf = investigationProf;
    this.medicineProf = medicineProf;
    this.natureProf = natureProf;
    this.perceptionProf = perceptionProf;
    this.performanceProf = performanceProf;
    this.persuasionProf = persuasionProf;
    this.religionProf = religionProf;
    this.sleightOfHandProf = sleightOfHandProf;
    this.stealthProf = stealthProf;
    this.survivalProf = survivalProf;
  }
}

export function isSkills(arg: any): arg is Skills {
  const acrobaticsProfCheck =
    arg.acrobaticsProf !== undefined && typeof arg.acrobaticsProf == "number";
  const arcanaProfCheck =
    arg.arcanaProf !== undefined && typeof arg.arcanaProf == "number";
  const animalHandlingProfCheck =
    arg.animalHandlingProf !== undefined &&
    typeof arg.animalHandlingProf == "number";
  const athleticsProfCheck =
    arg.athleticsProf !== undefined && typeof arg.athleticsProf == "number";
  const deceptionProfCheck =
    arg.deceptionProf !== undefined && typeof arg.deceptionProf == "number";
  const historyProfCheck =
    arg.historyProf !== undefined && typeof arg.historyProf == "number";
  const insightProfCheck =
    arg.insightProf !== undefined && typeof arg.insightProf == "number";
  const intimidationProfCheck =
    arg.intimidationProf !== undefined &&
    typeof arg.intimidationProf == "number";
  const investigationProfCheck =
    arg.investigationProf !== undefined &&
    typeof arg.investigationProf == "number";
  const medicineProfCheck =
    arg.medicineProf !== undefined && typeof arg.medicineProf == "number";
  const natureProfCheck =
    arg.natureProf !== undefined && typeof arg.natureProf == "number";
  const perceptionProfCheck =
    arg.perceptionProf !== undefined && typeof arg.perceptionProf == "number";
  const performanceProfCheck =
    arg.performanceProf !== undefined && typeof arg.performanceProf == "number";
  const persuasionProfCheck =
    arg.persuasionProf !== undefined && typeof arg.persuasionProf == "number";
  const religionProfCheck =
    arg.religionProf !== undefined && typeof arg.religionProf == "number";
  const sleightOfHandProfCheck =
    arg.sleightOfHand !== undefined && typeof arg.sleightOfHand == "number";
  const stealthProfCheck =
    arg.stealthProf !== undefined && typeof arg.stealthProf == "number";
  const survivalProfCheck =
    arg.survivalProf !== undefined && typeof arg.survivalProf == "number";
  return (
    arg &&
    acrobaticsProfCheck &&
    arcanaProfCheck &&
    animalHandlingProfCheck &&
    athleticsProfCheck &&
    deceptionProfCheck &&
    historyProfCheck &&
    insightProfCheck &&
    intimidationProfCheck &&
    investigationProfCheck &&
    medicineProfCheck &&
    natureProfCheck &&
    perceptionProfCheck &&
    performanceProfCheck &&
    persuasionProfCheck &&
    religionProfCheck &&
    sleightOfHandProfCheck &&
    stealthProfCheck &&
    survivalProfCheck
  );
}
