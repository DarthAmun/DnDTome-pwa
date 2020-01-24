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
  const [isFetching, setIsFetching] = useState(false);
  const [start, setStart] = useState(0);
  const [query, setQuery] = useState({});

  const receiveSpellsResult = result => {
    let newList = currentSpellList.spells;
    newList = newList.concat(result);

    ReactDOM.unstable_batchedUpdates(() => {
      setCurrentSpellList({ spells: newList });
      setStart(start + 10);
    });
  };

  useEffect(() => {
    ReactDOM.unstable_batchedUpdates(() => {
      setCurrentSpellList({ spells: [] });
      setStart(0);
    });
  }, [query]);

  useEffect(() => {
    if (isFetching) {
      fetchMoreListItems();
    }
  }, [isFetching]);

  useEffect(() => {
    setIsFetching(false);

    reciveSpellCount(query, function (result) {
      let spellCount = result;
      if (spellCount > currentSpellList.spells.length) {
        if (!currentSpellList.spells.length) {
          reciveSpells(10, start, query, function (result) {
            receiveSpellsResult(result);
          });
        }
        if (spells.current.scrollHeight == spells.current.clientHeight && currentSpellList.spells.length) {
          reciveSpells(10, start, query, function (spells) {
            receiveSpellsResult(spells);
          });
        }
      }
    });
  }, [currentSpellList]);

  const viewSpell = spell => {
    // ipcRenderer.send("openView", spell);
  };

  const fetchMoreListItems = () => {
    reciveSpells(10, start, query, function (result) {
      receiveSpellsResult(result);
    });
  };

  const handleScroll = () => {
    if (Math.round(spells.current.offsetHeight + spells.current.scrollTop) < spells.current.scrollHeight - 240) return;
    setIsFetching(true);
  };

  return (
    <div id="overview">
      <div id="spellOverview">
        <SpellSearchBar updateSpells={query => setQuery(query)}/>
        <div id="spells" onScroll={handleScroll} ref={spells}>
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
