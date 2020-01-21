import '../assets/css/Options.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faDiscord } from '@fortawesome/free-brands-svg-icons';
import {writeSpells} from './services/spellService';

//import {writeSpells} from './services/database';

export default function Options() {
  let fileReader;

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
    let spells = JSON.parse(content);
    writeSpells(spells);
  }

  return (
    <div id="overview">
      <div id="optionContent">
        <div id="options">
          {/* <div className="optionSection">
              <h3>What to support me?</h3>
              <button className="patreon" onClick={this.toPatreon}><FontAwesomeIcon icon={faPatreon} /> Become a patron</button>
            </div>
            <div className="optionSection">
              <h3>Found some bugs? Or have some feedback?</h3>
              <button className="discord" onClick={this.toDiscord}><FontAwesomeIcon icon={faDiscord} /> Join the discord</button>
            </div> */}
          {/* <div className="optionSection">
            <h3>Data Export</h3>
            <button onClick={this.exportSpells}>Export all Spells </button><br />
            <button onClick={this.exportItems}>Export all Items </button><br />
            <button onClick={this.exportMonsters}>Export all Monsters </button><br />
            <button onClick={this.exportItems}>Export all Charakters </button>
          </div> */}
          <div className="optionSection">
            <input type='file' id='single' onChange={importSpells} />
            {/* <button onClick={importItems}>Import Items </button><br /> */}

            {/* <button onClick={this.importMonsters}>Import Monsters </button>
            <button onClick={this.importMonstersSRD}>Import Monsters (5e-SRD-Format)</button><br />
            <button onClick={this.importItems}>Import Charakters </button> */}
          </div>
          {/* <div className="optionSection">
            <h3>Delete Data</h3>
            <button onClick={this.deleteAllSpells}>Delete all Spells </button><br />
            <button onClick={this.deleteAllItems}>Delete all Items </button><br />
            <button onClick={this.deleteAllMonsters}>Delete all Monsters </button>
            <button onClick={this.importItems}>Delete all Charakters </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
