import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/spell/SpellOverview.css";
import Spell from "./Spell";
import SpellSearchBar from "./SpellSearchBar";
import SpellContextMenu from "./SpellContextMenu";
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

  const viewSpell = (e, spell) => {
    if (e.type === 'click') {
      EventEmitter.dispatch("openView", spell);
    } else if (e.type === 'contextmenu') {
      e.preventDefault();

      const clickX = e.clientX;
      const clickY = e.clientY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rootW = 200;
      const rootH = 90;

      const right = (screenW - clickX) > rootW;
      const left = !right;
      const top = (screenH - clickY) > rootH;
      const bottom = !top;

      let menuLeft;
      let menuTop;

      if (right) {
        menuLeft = `${clickX + 5}px`;
      }

      if (left) {
        menuLeft = `${clickX - rootW - 5}px`;
      }

      if (top) {
        menuTop = `${clickY + 5}px`;
      }

      if (bottom) {
        menuTop = `${clickY - rootH - 5}px`;
      }
      EventEmitter.dispatch("openSpellContext", { spell: spell, top: menuTop, left: menuLeft });
    };
  }

  return (
    <div id="overview">
      <div id="spellOverview">
        <SpellSearchBar updateSpells={query => setQuery(query)} />
        <div id="spells" ref={spells}>
          {currentSpellList.spells.map((spell, index) => {
            return <Spell delay={0} spell={spell} key={spell.id} onClick={(e) => viewSpell(e, spell)} />;
          })}
        </div>
        <SpellContextMenu />
      </div>
      <Link to={`/add-spell`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Spell
      </Link>
    </div>
  );
}
