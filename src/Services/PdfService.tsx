import { PDFDocument, PDFField } from "pdf-lib";
import Char from "../Data/Chars/Char";
import ClassSet from "../Data/Chars/ClassSet";

const fillTemplate = async (template: string | ArrayBuffer, char: Char) => {
  // Load a PDF with form fields
  const pdfDoc = await PDFDocument.load(template);

  // Get the form containing all the fields
  const form = pdfDoc.getForm();

  const nameField = form.getTextField("CharacterName");
  nameField.setText(char.name);
  const playerNameField = form.getTextField("PlayerName");
  playerNameField.setText(char.player);
  const alignmentField = form.getTextField("Alignment");
  alignmentField.setText(char.alignment);
  const acField = form.getTextField("AC");
  acField.setText("" + char.ac);
  const initiativeField = form.getTextField("Initiative");
  initiativeField.setText("" + char.init);
  const speedField = form.getTextField("Speed");
  speedField.setText(char.speed);
  const hpMaxField = form.getTextField("HPMax");
  hpMaxField.setText("" + char.hp);
  const hpCurrentField = form.getTextField("HPCurrent");
  hpCurrentField.setText("" + char.currentHp);
  const hdField = form.getTextField("HD");
  const hdTotalField = form.getTextField("HDTotal");
  const backgroundField = form.getTextField("Background");
  backgroundField.setText(char.background);
  const xpField = form.getTextField("XP");
  xpField.setText("Milestone");

  const raceField = form.getTextField("Race");
  raceField.setText(char.race.race + " (" + char.race.subrace + ")");
  const classLevelField = form.getTextField("ClassLevel");
  let classes = "";
  char.classes.forEach((classSet: ClassSet) => {
    classes += `${classSet.classe} ${classSet.level} (${classSet.subclasse}), `;
  });
  classLevelField.setText(classes);

  const cpField = form.getTextField("CP");
  cpField.setText(""+char.money.copper);
  const spField = form.getTextField("SP");
  spField.setText(""+char.money.silver);
  const epField = form.getTextField("EP");
  epField.setText(""+char.money.electrum);
  const gpField = form.getTextField("GP");
  gpField.setText(""+char.money.gold);
  const ppField = form.getTextField("PP");
  ppField.setText(""+char.money.platinum);

  const strField = form.getTextField("STR");
  strField.setText(""+char.str);
  const strmodField = form.getTextField("STRmod");
  const dexField = form.getTextField("DEX");
  dexField.setText(""+char.dex);
  const dexmodField = form.getTextField("DEXmod");
  const conField = form.getTextField("CON");
  conField.setText(""+char.con);
  const conmodField = form.getTextField("CONmod");
  const intField = form.getTextField("INT");
  intField.setText(""+char.int);
  const intmodField = form.getTextField("INTmod");
  const wisField = form.getTextField("WIS");
  wisField.setText(""+char.wis);
  const wismodField = form.getTextField("WISmod");
  const chaField = form.getTextField("CHA");
  chaField.setText(""+char.cha);
  const chamodField = form.getTextField("CHAmod");

  const equipmentField = form.getTextField("Equipment");
  const featTraitsField = form.getTextField("Feat+Traits");
  const featTraits2Field = form.getTextField("Features and Traits");
  const treasureField = form.getTextField("Treasure");

  const spellSaveDCField = form.getTextField("SpellSaveDC  2");
  const spellAtkBonusDCField = form.getTextField("SpellAtkBonus 2");
  const spellcastingAbilityDCField = form.getTextField("SpellcastingAbility 2");
  const spellcastingClassField = form.getTextField("Spellcasting Class 2");

  // Serialize the PDFDocument to bytes (a Uint8Array)
  return pdfDoc.save();
};

const downloadFilledPdf = (pdfBytes: Uint8Array, filename: string) => {
  let contentType = "application/json;charset=utf-8;";
  const blob = new Blob([pdfBytes], { type: contentType });

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var pdfURL = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.download = filename;
    a.href = pdfURL;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const exportPdf = async (char: Char) => {
  const template =

  fillTemplate(template, char).then((filledArray) => {
    downloadFilledPdf(filledArray, char.name + ".pdf");
  });
};