export default class Skills {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
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
    acrobatics: number,
    animalHandling: number,
    arcana: number,
    athletics: number,
    deception: number,
    history: number,
    insight: number,
    intimidation: number,
    investigation: number,
    medicine: number,
    nature: number,
    perception: number,
    performance: number,
    persuasion: number,
    religion: number,
    sleightOfHand: number,
    stealth: number,
    survival: number,
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
    this.acrobatics = acrobatics;
    this.arcana = arcana;
    this.animalHandling = animalHandling;
    this.athletics = athletics;
    this.deception = deception;
    this.history = history;
    this.insight = insight;
    this.intimidation = intimidation;
    this.investigation = investigation;
    this.medicine = medicine;
    this.nature = nature;
    this.perception = perception;
    this.performance = performance;
    this.persuasion = persuasion;
    this.religion = religion;
    this.sleightOfHand = sleightOfHand;
    this.stealth = stealth;
    this.survival = survival;
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
  const acrobaticsCheck =
    arg.acrobatics !== undefined && typeof arg.acrobatics == "number";
  const arcanaCheck = arg.arcana !== undefined && typeof arg.arcana == "number";
  const animalHandlingCheck =
    arg.animalHandling !== undefined && typeof arg.animalHandling == "number";
  const athleticsCheck =
    arg.athletics !== undefined && typeof arg.athletics == "number";
  const deceptionCheck =
    arg.deception !== undefined && typeof arg.deception == "number";
  const historyCheck =
    arg.history !== undefined && typeof arg.history == "number";
  const insightCheck =
    arg.insight !== undefined && typeof arg.insight == "number";
  const intimidationCheck =
    arg.intimidation !== undefined && typeof arg.intimidation == "number";
  const investigationCheck =
    arg.investigation !== undefined && typeof arg.investigation == "number";
  const medicineCheck =
    arg.medicine !== undefined && typeof arg.medicine == "number";
  const natureCheck = arg.nature !== undefined && typeof arg.nature == "number";
  const perceptionCheck =
    arg.perception !== undefined && typeof arg.perception == "number";
  const performanceCheck =
    arg.performance !== undefined && typeof arg.performance == "number";
  const persuasionCheck =
    arg.persuasion !== undefined && typeof arg.persuasion == "number";
  const religionCheck =
    arg.religion !== undefined && typeof arg.religion == "number";
  const sleightOfHandCheck =
    arg.sleightOfHand !== undefined && typeof arg.sleightOfHand == "number";
  const stealthCheck =
    arg.stealth !== undefined && typeof arg.stealth == "number";
  const survivalCheck =
    arg.survival !== undefined && typeof arg.survival == "number";
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
    acrobaticsCheck &&
    arcanaCheck &&
    animalHandlingCheck &&
    athleticsCheck &&
    deceptionCheck &&
    historyCheck &&
    insightCheck &&
    intimidationCheck &&
    investigationCheck &&
    medicineCheck &&
    natureCheck &&
    perceptionCheck &&
    performanceCheck &&
    persuasionCheck &&
    religionCheck &&
    sleightOfHandCheck &&
    stealthCheck &&
    survivalCheck &&
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
