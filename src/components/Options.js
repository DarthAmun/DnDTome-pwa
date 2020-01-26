import '../assets/css/Options.css';
import React, { useState } from 'react';
import { reciveAllSpells, saveNewSpells, deleteAllSpells } from '../database/SpellService';
import { Line } from 'rc-progress';
import ThemeService from '../services/ThemeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faFileExport, faFileImport, faTrashAlt, faPalette } from '@fortawesome/free-solid-svg-icons';

let fileReader;

export default function Options() {
  const [spellsImported, setSpellsImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [importing, setImporting] = useState("none");

  const updateSpellImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setSpellsImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }

  const importSpells = e => {
    const files = Array.from(e.target.files)

    files.forEach((file, i) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    })
  }

  const handleFileRead = (e) => {
    const content = fileReader.result;
    let spellsJson = JSON.parse(content);
    saveNewSpells(spellsJson, function (result) {
      updateSpellImport(result);
    });
  }

  const exportSpells = (e) => {
    reciveAllSpells(function (result) {
      exportToJson(result, 'spells_export.json');
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
            <input type="file" name="file" id="file" className="inputfile" onChange={importSpells} />
            <label for="file"><FontAwesomeIcon icon={faFileImport} /> Import Spells </label>
          </div>
          <div className="optionSection">
            <h3>Data Export</h3>
            <button onClick={exportSpells}><FontAwesomeIcon icon={faFileExport} /> Export all Spells </button><br />
          </div>
          <div className="optionSection">
            <h3>Delete Data</h3>
            <button onClick={deleteAllSpellsAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete all Spells </button><br />
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
        </div>
      </div>
    </div>
  );

}
