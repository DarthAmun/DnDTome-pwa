import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import "../../assets/css/spell/SpellOverview.css";
import Spell from "./Spell";
import SpellSearchBar from "./SpellSearchBar";
import { reciveSpells, reciveSpellCount } from "../../database/SpellService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function SpellOverview() {
  const [currentSpellList, setCurrentSpellList] = useState({ spells: [] });
  const spells = useRef(null);
  const [query, setQuery] = useState({});


  useEffect(() => {
    reciveSpells(query, function (result) {
      setCurrentSpellList({ spells: result });
    });
  }, [query]);

  const viewSpell = spell => {
    // ipcRenderer.send("openView", spell);
  };

  return (
    <div id="overview">
      <div id="spellOverview">
        <SpellSearchBar updateSpells={query => setQuery(query)} />
        <div id="spells" ref={spells}>
          {currentSpellList.spells.map((spell, index) => {
            return <Spell delay={0} spell={spell} key={spell.id} onClick={() => viewSpell(spell)} />;
          })}
        </div>
      </div>
      <Link to={`/add-spell`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Spell
      </Link>
    </div>
  );
}
