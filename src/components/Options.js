import '../assets/css/Options.css';
import React, { useState } from 'react';
import { reciveAllSpells, saveNewSpells, deleteAllSpells } from '../database/SpellService';
import { Line } from 'rc-progress';
import ThemeService from '../services/ThemeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faFileImport, faTrashAlt, faPalette } from '@fortawesome/free-solid-svg-icons';

let fileReader;

export default function Options() {
  const [spellsImported, setSpellsImported] = useState({ percent: 0, now: 0, full: 0, name: "" });
  const [importing, setImporting] = useState("none");

  const updateSpellImport = (result) => {
    let percent = Math.round((result.now / result.full) * 100);
    percent !== 0 && percent !== 100 ? setImporting("block") : setImporting("none");
    setSpellsImported({ percent: percent, now: result.now, full: result.full, name: result.name });
  }

  const toPatreon = () => {
  }
  const toDiscord = () => {
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
            <button className="patreon" onClick={toPatreon}><FontAwesomeIcon icon={faPatreon} /> Become a patron</button>
          </div>
          <div className="optionSection">
            <h3>Found some bugs? Or have some feedback?</h3>
            <button className="discord" onClick={toDiscord}><FontAwesomeIcon icon={faDiscord} /> Join the discord</button>
          </div>
          <div className="optionSection">
            <h3>Theme</h3>
            <button onClick={darkMode}><FontAwesomeIcon icon={faPalette} /> Change Theme</button>
          </div>
          <div className="optionSection">
            <h3>Data Import</h3>
            <input type='file' id='single' onChange={importSpells}></input><br />
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
