import React from "react";
import styled from "styled-components";
import { useTheme } from "./MyThemeProvider";
import { darkTheme, lightTheme } from "./Theme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import Spell from "../Data/Spell";
import { saveNewSpells } from "../Database/SpellService";

const Options = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  };

  const importSpells = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const files = Array.from(e.target.files);

      files.forEach((file, i) => {
        let fileReader = new FileReader();
        fileReader.onloadend = function () {
          handleSpellFileRead(fileReader, file.name);
        };
        fileReader.readAsText(file);
      });
    }
  };
  const handleSpellFileRead = (fileReader: FileReader, filename: string) => {
    const content = fileReader.result;
    if (content !== null) {
      let spellsJson: Spell[] = JSON.parse(content.toString());
      saveNewSpells(spellsJson, filename);
    }
  };

  return (
    <App>
      Options
      <button onClick={() => toggleTheme()}>Toggle Style</button>
      <input
        type="file"
        name="spellfile"
        id="spellfile"
        className="inputfile"
        onChange={importSpells}
      />
      <label htmlFor="spellfile">
        <FontAwesomeIcon icon={faFileImport} /> Import Spells{" "}
      </label>
      <br />
    </App>
  );
};

export default Options;

const App = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.main.backgroundColor};
`;
