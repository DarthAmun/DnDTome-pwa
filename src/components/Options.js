import '../assets/css/Options.css';
import React, { useState } from 'react';
import { reciveAllSpells, saveNewSpells, deleteAllSpells } from '../database/SpellService';
import { reciveAllItems, saveNewItems, deleteAllItems } from '../database/ItemService';
import { reciveAllGears, saveNewGears, deleteAllGear } from '../database/GearService';
import { reciveAllMonsters, saveNewMonsters, deleteAllMonsters } from '../database/MonsterService';
import { saveNewCharFromJson, deleteAllCharacters, reciveAllChars, reciveCharSpells } from '../database/CharacterService';
import { Line } from 'rc-progress';
import ThemeService from '../services/ThemeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faFileExport, faFileImport, faTrashAlt, faPalette } from '@fortawesome/free-solid-svg-icons';

let fileReader;

export default function Options() {
  const [spellsImported, setSpellsImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [itemsImported, setItemsImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [gearsImported, setGearsImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [monstersImported, setMonstersImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [importing, setImporting] = useState("none");

  const updateSpellImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setSpellsImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }
  const updateItemImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setItemsImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }
  const updateGearImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setGearsImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }
  const updateMonsterImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setMonstersImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }

  const importSpells = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleSpellFileRead;
      fileReader.readAsText(file);
    })
  }
  const handleSpellFileRead = (e) => {
    const content = fileReader.result;
    let spellsJson = JSON.parse(content);
    saveNewSpells(spellsJson, function (result) {
      updateSpellImport(result);
    });
  }

  const importItems = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleItemFileRead;
      fileReader.readAsText(file);
    })
  }
  const handleItemFileRead = (e) => {
    const content = fileReader.result;
    let itemsJson = JSON.parse(content);
    saveNewItems(itemsJson, function (result) {
      updateItemImport(result);
    });
  }

  const importGears = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleGearFileRead;
      fileReader.readAsText(file);
    })
  }
  const handleGearFileRead = (e) => {
    const content = fileReader.result;
    let gearJson = JSON.parse(content);
    saveNewGears(gearJson, function (result) {
      updateGearImport(result);
    });
  }

  const importMonsters = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleMonsterFileRead;
      fileReader.readAsText(file);
    })
  }
  const handleMonsterFileRead = (e) => {
    const content = fileReader.result;
    let monsterJson = JSON.parse(content);
    saveNewMonsters(monsterJson, function (result) {
      updateMonsterImport(result);
    });
  }

  const importChar = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleCharFileRead;
      fileReader.readAsText(file);
    })
  }
  const handleCharFileRead = (e) => {
    const content = fileReader.result;
    let charJson = JSON.parse(content);
    saveNewCharFromJson(charJson);
  }

  const exportSpells = (e) => {
    reciveAllSpells(function (result) {
      exportToJson(result, 'spells_export.json');
    });
  }
  const exportItems = (e) => {
    reciveAllItems(function (result) {
      exportToJson(result, 'items_export.json');
    });
  }
  const exportGears = (e) => {
    reciveAllGears(function (result) {
      exportToJson(result, 'gears_export.json');
    });
  }
  const exportMonsters = (e) => {
    reciveAllMonsters(function (result) {
      exportToJson(result, 'monsters_export.json');
    });
  }
  const exportChars = (e) => {
    reciveAllChars(function (result) {
      result.forEach(char => {
        console.log(char)
        reciveCharSpells(char.id, function (spells) {
          let completeChar = { char, spells };
          console.log(spells)
          exportToJson(completeChar, char.name + '_export.json');
          // reciveCharItems(char.char_id, function (items) {
          //   reciveCharMonsters(char.char_id, function (monsters) {
          //     let completeChar = { char, monsters, spells, items };
          //     let content = JSON.stringify(completeChar);

          //     options.defaultPath = options.defaultPath + '/' + char.char_name + '_export.json';
          //     dialog.showSaveDialog(null, options, (path) => {

          //       // fileName is a string that contains the path and filename created in the save file dialog.  
          //       fs.writeFile(path, content, (err) => {
          //         if (err) {
          //           ipcRenderer.send('displayMessage', { type: `Chars exported`, message: `Chars export failed` });
          //         }
          //         ipcRenderer.send('displayMessage', { type: `Chars exported`, message: `Chars export successful` });
          //       });
          //     });
          //   });
          // });
        });
      });
    });
  }

  const exportToJson = (objectData, filename) => {
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  const deleteAllSpellsAction = () => {
    deleteAllSpells();
  }
  const deleteAllItemsAction = () => {
    deleteAllItems();
  }
  const deleteAllGearsAction = () => {
    deleteAllGear();
  }
  const deleteAllMonstersAction = () => {
    deleteAllMonsters();
  }
  const deleteAllCharsAction = () => {
    deleteAllCharacters();
  }

  const darkMode = () => {
    if (ThemeService.getTheme() === 'light') {
      localStorage.setItem('theme', 'dark');
      ThemeService.applyTheme('dark');
      ThemeService.setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      ThemeService.applyTheme('light');
      ThemeService.setTheme('light');
    }
  }

  return (
    <div id="overview">
      <div id="optionContent">
        <div id="options">
          <div className="optionSection">
            <h3>Want to support me?</h3>
            <a href="https://www.patreon.com/bePatron?u=25310394" target="_blank" className="patreon"><FontAwesomeIcon icon={faPatreon} /> Become a patron</a>
          </div>
          <div className="optionSection">
            <h3>Found some bugs? Or have some feedback?</h3>
            <a href="https://discord.gg/2KB3tzG" target="_blank" className="discord"><FontAwesomeIcon icon={faDiscord} /> Join the discord</a>
          </div>
          <div className="optionSection">
            <h3>Theme</h3>
            <button onClick={darkMode}><FontAwesomeIcon icon={faPalette} /> Change Theme</button>
          </div>
          <div className="optionSection">
            <h3>Data Import</h3>
            <input type="file" name="spellfile" id="spellfile" className="inputfile" onChange={importSpells} />
            <label htmlFor="spellfile"><FontAwesomeIcon icon={faFileImport} /> Import Spells </label><br />
            <input type="file" name="itemfile" id="itemfile" className="inputfile" onChange={importItems} />
            <label htmlFor="itemfile"><FontAwesomeIcon icon={faFileImport} /> Import Magic Items </label><br />
            <input type="file" name="gearfile" id="gearfile" className="inputfile" onChange={importGears} />
            <label htmlFor="gearfile"><FontAwesomeIcon icon={faFileImport} /> Import Gear </label><br />
            <input type="file" name="monsterfile" id="monsterfile" className="inputfile" onChange={importMonsters} />
            <label htmlFor="monsterfile"><FontAwesomeIcon icon={faFileImport} /> Import Monsters </label><br />
            <input type="file" name="charfile" id="charfile" className="inputfile" onChange={importChar} />
            <label htmlFor="charfile"><FontAwesomeIcon icon={faFileImport} /> Import Char </label><br />
          </div>
          <div className="optionSection">
            <h3>Data Export</h3>
            <button onClick={exportSpells}><FontAwesomeIcon icon={faFileExport} /> Export all Spells </button><br />
            <button onClick={exportItems}><FontAwesomeIcon icon={faFileExport} /> Export all Magic Items </button><br />
            <button onClick={exportGears}><FontAwesomeIcon icon={faFileExport} /> Export all Gear </button><br />
            <button onClick={exportMonsters}><FontAwesomeIcon icon={faFileExport} /> Export all Monsters </button><br />
            <button onClick={exportChars}><FontAwesomeIcon icon={faFileExport} /> Export all Chars </button><br />
          </div>
          <div className="optionSection">
            <h3>Delete Data</h3>
            <button onClick={deleteAllSpellsAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Spells </button><br />
            <button onClick={deleteAllItemsAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Magic Items </button><br />
            <button onClick={deleteAllGearsAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Gear </button><br />
            <button onClick={deleteAllMonstersAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Monsters </button><br />
            <button onClick={deleteAllCharacters}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Characters </button><br />
          </div>
        </div>
      </div>
      <div className="loadingScreen" style={{ display: importing }}>
        <div className="loadingTab">
          {spellsImported.percent !== 0 && spellsImported.percent !== 100 ?
            (<div>Imported {spellsImported.percent}% ({spellsImported.now}/{spellsImported.full}) of spells.
              <Line percent={spellsImported.percent} strokeWidth="1" trailWidth="1" strokeColor="#8000ff" />
              Importing {spellsImported.name} ...
              </div>) : (<div></div>)
          }
          {itemsImported.percent !== 0 && itemsImported.percent !== 100 ?
            (<div>Imported {itemsImported.percent}% ({itemsImported.now}/{itemsImported.full}) of magic items.
              <Line percent={itemsImported.percent} strokeWidth="1" trailWidth="1" strokeColor="#8000ff" />
              Importing {itemsImported.name} ...
              </div>) : (<div></div>)
          }
          {gearsImported.percent !== 0 && gearsImported.percent !== 100 ?
            (<div>Imported {gearsImported.percent}% ({gearsImported.now}/{gearsImported.full}) of gear.
              <Line percent={gearsImported.percent} strokeWidth="1" trailWidth="1" strokeColor="#8000ff" />
              Importing {gearsImported.name} ...
              </div>) : (<div></div>)
          }
          {monstersImported.percent !== 0 && monstersImported.percent !== 100 ?
            (<div>Imported {monstersImported.percent}% ({monstersImported.now}/{monstersImported.full}) of monsters.
              <Line percent={monstersImported.percent} strokeWidth="1" trailWidth="1" strokeColor="#8000ff" />
              Importing {monstersImported.name} ...
              </div>) : (<div></div>)
          }
        </div>
      </div>
    </div>
  );

}
