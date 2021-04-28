export default class Player {
  name: string;
  hp: number;
  currentHp: number;
  initBonus: number;
  init: number;
  ac: number;
  tag: string;
  isEnemy: boolean;
  isMonster: boolean;
  isNpc: boolean;
  isVisible: boolean;
  level: number;
  cord: number;
  pic: string;
  size: string;

  constructor(
    name?: string,
    hp?: number,
    tempHp?: number,
    init?: number,
    initBonus?: number,
    ac?: number,
    tag?: string,
    isEnemy?: boolean,
    isMonster?: boolean,
    isNpc?: boolean,
    isVisible?: boolean,
    level?: number,
    cord?: number,
    pic?: string,
    size?: string
  ) {
    this.name = name || "";
    this.hp = hp || 0;
    this.currentHp = tempHp || 0;
    this.initBonus = initBonus || 0;
    this.init = init || -1;
    this.ac = ac || 0;
    this.tag = tag || "";
    this.isEnemy = isEnemy || false;
    this.isMonster = isMonster || false;
    this.isNpc = isNpc || false;
    this.isVisible = isVisible || true;
    this.level = level || 0;
    this.cord = cord || 0;
    this.pic = pic || "";
    this.size = size || "";
  }
}

export function isPlayer(arg: any): arg is Player {
  const nameCheck = arg.name !== undefined && typeof arg.name == "string";
  const hpCheck = arg.hp !== undefined && typeof arg.hp == "number";
  const tempHpCheck = arg.tempHp !== undefined && typeof arg.tempHp == "number";
  const initCheck = arg.init !== undefined && typeof arg.init == "number";
  const initBonusCheck = arg.initBonus !== undefined && typeof arg.initBonus == "number";
  const acCheck = arg.ac !== undefined && typeof arg.ac == "number";
  const tagCheck = arg.tag !== undefined && typeof arg.tag == "string";
  const levelCheck = arg.level !== undefined && typeof arg.level == "number";
  const picCheck = arg.pic !== undefined && typeof arg.pic == "string";
  const sizeCheck = arg.size !== undefined && typeof arg.size == "string";
  return (
    arg &&
    nameCheck &&
    hpCheck &&
    tempHpCheck &&
    initCheck &&
    initBonusCheck &&
    acCheck &&
    tagCheck &&
    levelCheck &&
    picCheck &&
    sizeCheck
  );
}
