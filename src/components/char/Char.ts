export default class Char {
  id: number;
  name: string;
  player: string;
  prof: string;
  level: number;
  pic: string;
  classes: string;
  race: string;
  background: string;
  ac: number;
  hp: number;
  currentHp: number;
  hitDice: string;
  init: number;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
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
  actions: string;
  bonusActions: string;
  reactions: string;
  features: string;
  classFeatures: string;
  racialFeatures: string;
  profsLangs: string;
  senses: string;
  passivPerception: number;
  passivInsight: number;
  passivInvestigation: number;
  notesOne: string;
  notesTwo: string;
  notesThree: string;
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
  spellNotes: string;
  alignment: string;
  inspiration: number;
  castingHit: number;
  castingDC: number;

  constructor(
    id: number,
    name: string,
    player: string,
    prof: string,
    level: number,
    pic: string,
    classes: string,
    race: string,
    background: string,
    ac: number,
    hp: number,
    currentHp: number,
    hitDice: string,
    init: number,
    speed: string,
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number,
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
    chaSaveProf: number,
    actions: string,
    bonusActions: string,
    reactions: string,
    features: string,
    classFeatures: string,
    racialFeatures: string,
    profsLangs: string,
    senses: string,
    passivPerception: number,
    passivInsight: number,
    passivInvestigation: number,
    notesOne: string,
    notesTwo: string,
    notesThree: string,
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
    survivalProf: number,
    spellNotes: string,
    alignment: string,
    inspiration: number,
    castingHit: number,
    castingDC: number
  ) {
    this.id = id;
    this.name = name;
    this.player = player;
    this.prof = prof;
    this.level = level;
    this.pic = pic;
    this.classes = classes;
    this.race = race;
    this.background = background;
    this.ac = ac;
    this.hp = hp;
    this.currentHp = currentHp;
    this.hitDice = hitDice;
    this.init = init;
    this.speed = speed;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
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
    this.actions = actions;
    this.bonusActions = bonusActions;
    this.reactions = reactions;
    this.features = features;
    this.classFeatures = classFeatures;
    this.racialFeatures = racialFeatures;
    this.profsLangs = profsLangs;
    this.senses = senses;
    this.passivPerception = passivPerception;
    this.passivInsight = passivInsight;
    this.passivInvestigation = passivInvestigation;
    this.notesOne = notesOne;
    this.notesTwo = notesTwo;
    this.notesThree = notesThree;
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
    this.perceptionProf = persuasionProf;
    this.performanceProf = persuasionProf;
    this.persuasionProf = persuasionProf;
    this.religionProf = religionProf;
    this.sleightOfHandProf = sleightOfHandProf;
    this.stealthProf = stealthProf;
    this.survivalProf = survivalProf;
    this.spellNotes = spellNotes;
    this.alignment = alignment;
    this.inspiration = inspiration;
    this.castingHit = castingHit;
    this.castingDC = castingDC;
  }
}
