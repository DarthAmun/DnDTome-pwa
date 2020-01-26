import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
import "../../assets/css/spell/SpellOverview.css";
import Spell from "./Spell";
import SpellSearchBar from "./SpellSearchBar";
import { reciveSpells, reciveSpellCount } from "../../database/SpellService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EventEmitter from '../../services/EventEmitter';

export default function SpellOverview() {
  const [currentSpellList, setCurrentSpellList] = useState({ spells: [] });
  const spells = useRef(null);
  const [query, setQuery] = useState({});

  const updateSpell = (result) => {
    let spells = currentSpellList.spells.map(spell => {
      if (spell.id === result.id) {
        return result;
      } else {
        return spell;
      }
    });
    setCurrentSpellList({ spells: spells });
  };
  const removeWindow = (result) => {
    let spells = currentSpellList.spells.filter(spell => {
      if (spell.id !== result.id) return spell;
    });
    setCurrentSpellList({ spells: spells });
  };

  useEffect(() => {
    reciveSpells(query, function (result) {
      setCurrentSpellList({ spells: result });
    });
  }, [query]);

  useEffect(() => {
    EventEmitter.subscribe("updateWindow", updateSpell);
  }, [updateSpell]);

  useEffect(() => {
    EventEmitter.subscribe("removeWindow", removeWindow);
  }, [removeWindow]);

  const viewSpell = spell => {
    EventEmitter.dispatch("openView", spell);
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
