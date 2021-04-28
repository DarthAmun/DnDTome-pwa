import Encounter from "../data/encounter/Encounter";
import Player from "../data/encounter/Player";

const crExpTable: { cr: number; exp: number }[] = [
  { cr: 0, exp: 0 },
  { cr: 0.125, exp: 25 },
  { cr: 0.25, exp: 50 },
  { cr: 0.5, exp: 100 },
  { cr: 1, exp: 200 },
  { cr: 2, exp: 450 },
  { cr: 3, exp: 700 },
  { cr: 4, exp: 1100 },
  { cr: 5, exp: 1800 },
  { cr: 6, exp: 2300 },
  { cr: 7, exp: 2900 },
  { cr: 8, exp: 3900 },
  { cr: 9, exp: 5000 },
  { cr: 10, exp: 5900 },
  { cr: 11, exp: 7200 },
  { cr: 12, exp: 8400 },
  { cr: 13, exp: 10000 },
  { cr: 14, exp: 11500 },
  { cr: 15, exp: 13000 },
  { cr: 16, exp: 15000 },
  { cr: 17, exp: 18000 },
  { cr: 18, exp: 20000 },
  { cr: 19, exp: 22000 },
  { cr: 20, exp: 25000 },
  { cr: 21, exp: 33000 },
  { cr: 22, exp: 41000 },
  { cr: 23, exp: 50000 },
  { cr: 24, exp: 62000 },
  { cr: 25, exp: 75000 },
  { cr: 26, exp: 90000 },
  { cr: 27, exp: 105000 },
  { cr: 28, exp: 120000 },
  { cr: 29, exp: 135000 },
  { cr: 30, exp: 155000 },
];

const expTable: {
  level: number;
  easy: number;
  medium: number;
  hard: number;
  deadly: number;
}[] = [
  { level: 1, easy: 25, medium: 50, hard: 75, deadly: 100 },
  { level: 2, easy: 50, medium: 100, hard: 150, deadly: 200 },
  { level: 3, easy: 75, medium: 150, hard: 225, deadly: 400 },
  { level: 4, easy: 125, medium: 250, hard: 375, deadly: 500 },
  { level: 5, easy: 250, medium: 500, hard: 750, deadly: 1100 },
  { level: 6, easy: 300, medium: 600, hard: 900, deadly: 1400 },
  { level: 7, easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  { level: 8, easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  { level: 9, easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  { level: 10, easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  { level: 11, easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  { level: 12, easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  { level: 13, easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  { level: 14, easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  { level: 15, easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  { level: 16, easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  { level: 17, easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  { level: 18, easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  { level: 19, easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  { level: 20, easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
];

export const calcDifficulty = (encounter: Encounter) => {
  console.time("calcDifficulty");
  let calcExp: {
    easy: number;
    medium: number;
    hard: number;
    deadly: number;
  } = { easy: 0, medium: 0, hard: 0, deadly: 0 };
  encounter.players.forEach((player: Player) => {
    if (expTable.length >= player.level) {
      if (player.isMonster) {
        crExpTable.forEach((crExp: { cr: number; exp: number }) => {
          if (player.level === crExp.cr) {
            calcExp.easy += crExp.exp;
            calcExp.medium += crExp.exp;
            calcExp.hard += crExp.exp;
            calcExp.deadly += crExp.exp;
          }
        });
      } else {
        calcExp.easy += expTable[player.level].easy;
        calcExp.medium += expTable[player.level].medium;
        calcExp.hard += expTable[player.level].hard;
        calcExp.deadly += expTable[player.level].deadly;
      }
    }
  });

  let enemyExp: number = 0;
  encounter.enemies.forEach((enemy: Player) => {
    crExpTable.forEach((crExp: { cr: number; exp: number }) => {
      if (enemy.level === crExp.cr) {
        enemyExp += crExp.exp;
      }
    });
  });

  if (encounter.enemies.length === 1) {
    enemyExp = enemyExp * 1;
  } else if (encounter.enemies.length <= 3) {
    enemyExp = enemyExp * 1.5;
  } else if (encounter.enemies.length <= 6) {
    enemyExp = enemyExp * 2;
  } else if (encounter.enemies.length <= 10) {
    enemyExp = enemyExp * 2.5;
  } else if (encounter.enemies.length <= 14) {
    enemyExp = enemyExp * 3;
  } else if (encounter.enemies.length > 14) {
    enemyExp = enemyExp * 4;
  }

  let difficulty = "";
  if (calcExp.easy + (calcExp.medium - calcExp.easy) / 2 > enemyExp) {
    difficulty = "Easy (" + enemyExp + " Exp)";
  } else if (calcExp.medium + (calcExp.hard - calcExp.medium) / 2 > enemyExp) {
    difficulty = "Medium (" + enemyExp + " Exp)";
  } else if (calcExp.hard + (calcExp.deadly - calcExp.hard) / 2 > enemyExp) {
    difficulty = "Hard (" + enemyExp + " Exp)";
  } else {
    difficulty = "Deadly (" + enemyExp + " Exp)";
  }

  console.timeEnd("calcDifficulty");
  return { difficulty: difficulty, calcExp: calcExp };
};
