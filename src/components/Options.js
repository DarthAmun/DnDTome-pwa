import '../assets/css/Options.css';
import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPatreon, faDiscord } from '@fortawesome/free-brands-svg-icons';
import spellsContext from './services/spellsContext';

const fs = require('fs');

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
    spells: []
    }

  }

  receiveAllSpells = (result) => {
    this.setState({
      ...this.state,
      spells: result
    })
  }

  receiveAllItems = (evt, result) => {
    this.setState({
      ...this.state,
      items: result
    })
  }

  receiveAllMonsters = (evt, result) => {
    this.setState({
      ...this.state,
      monsters: result
    })
  }



  componentDidMount() {
    spellsContext.getAllSpells().then(res => {

      this.receiveAllSpells(res);
      console.log(this.state.spells);
    })


  }
  componentWillUnmount() {

  }

  toPatreon = () => {
  }
  toDiscord = () => {
  }

  exportSpells = (e) => {
    let content = JSON.stringify(this.state.spells);

    let fileName = this.state.appPath;
    if (!fs.existsSync(fileName)) {
      fs.mkdirSync(fileName);
      console.log("Export folder created!");
    }
    fileName = fileName + '\\spells.json';
    console.log(fileName);
    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        alert("An error ocurred creating the file " + err.message)
      }
      alert("The file has been succesfully saved");
    });
  }

  exportItems = (e) => {
    let content = JSON.stringify(this.state.items);

    let fileName = this.state.appPath;
    if (!fs.existsSync(fileName)) {
      fs.mkdirSync(fileName);
      console.log("Export folder created!");
    }
    fileName = fileName + '\\items.json';
    console.log(fileName);
    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        alert("An error ocurred creating the file " + err.message)
      }
      alert("The file has been succesfully saved");
    });
  }

  exportMonsters = (e) => {
    let content = JSON.stringify(this.state.monsters);

    let fileName = this.state.appPath;
    if (!fs.existsSync(fileName)) {
      fs.mkdirSync(fileName);
      console.log("Export folder created!");
    }
    fileName = fileName + '\\monsters.json';
    console.log(fileName);
    // fileName is a string that contains the path and filename created in the save file dialog.  
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        alert("An error ocurred creating the file " + err.message)
      }
      alert("The file has been succesfully saved");
    });
  }

  importSpells = e => {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)

    })





  }
  handleImportRead(){

  }

  importItems = (e) => {

  }

  importMonsters = (e) => {

  }


  deleteAllItems = () => {
  }
  deleteAllSpells = () => {
  }
  deleteAllMonsters = () => {
  }

  render() {
    return (
      <div id="overview">
        <div id="optionContent">
          <div id="options">
            <div className="optionSection">
              <h3>What to support me?</h3>
              <button className="patreon" onClick={this.toPatreon}><FontAwesomeIcon icon={faPatreon} /> Become a patron</button>
            </div>
            <div className="optionSection">
              <h3>Found some bugs? Or have some feedback?</h3>
              <button className="discord" onClick={this.toDiscord}><FontAwesomeIcon icon={faDiscord} /> Join the discord</button>
            </div>
            <div className="optionSection">
              <h3>Data Export</h3>
              <span>Path: {this.state.appPath}</span><br />
              <button onClick={this.exportSpells}>Export all Spells </button><br />
              <button onClick={this.exportItems}>Export all Items </button><br />
              <button onClick={this.exportMonsters}>Export all Monsters </button><br />
              {/* <button onClick={this.exportItems}>Export all Charakters </button> */}
            </div>
            <div className="optionSection">
              <input type='file' id='single' onChange={this.importSpells} />


              <button onClick={this.importItems}>Import Items </button><br />

              <button onClick={this.importMonsters}>Import Monsters </button>
              {/* <button onClick={this.importMonstersSRD}>Import Monsters (5e-SRD-Format)</button><br /> */}
              {/* <button onClick={this.importItems}>Import Charakters </button> */}
            </div>
            <div className="optionSection">
              <h3>Delete Data</h3>
              <button onClick={this.deleteAllSpells}>Delete all Spells </button><br />
              <button onClick={this.deleteAllItems}>Delete all Items </button><br />
              <button onClick={this.deleteAllMonsters}>Delete all Monsters </button>
              {/* <button onClick={this.importItems}>Delete all Charakters </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;