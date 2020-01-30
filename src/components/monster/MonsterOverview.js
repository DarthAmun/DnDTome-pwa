import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/monster/MonsterOverview.css";
import Monster from "./Monster";
import MonsterSearchBar from "./MonsterSearchBar";
import { reciveMonsters, reciveMonsterCount } from "../../database/MonsterService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EventEmitter from '../../services/EventEmitter';

export default function MonsterOverview() {
  const [currentMonsterList, setCurrentMonsterList] = useState({ monsters: [] });
  const monsters = useRef(null);
  const [query, setQuery] = useState({});

  const updateMonster = (result) => {
    let monsters = currentMonsterList.monsters.map(monster => {
      if (monster.id === result.id) {
        return result;
      } else {
        return monster;
      }
    });
    setCurrentMonsterList({ monsters: monsters });
  };
  const removeWindow = (result) => {
    let monsters = currentMonsterList.monsters.filter(monster => {
      if (monster.id !== result.id) return monster;
    });
    setCurrentMonsterList({ monsters: monsters });
  };
  
  useEffect(() => {
    reciveMonsters(query, function (result) {
      setCurrentMonsterList({ monsters: result });
    });
  }, [query]);

  useEffect(() => {
    EventEmitter.subscribe("updateWindow", updateMonster);
  }, [updateMonster]);

  useEffect(() => {
    EventEmitter.subscribe("removeWindow", removeWindow);
  }, [removeWindow]);

  const viewMonster = monster => {
    EventEmitter.dispatch("openView", monster);
  };

  return (
    <div id="overview">
      <div id="monsterOverview">
        <MonsterSearchBar updateMonsters={query => setQuery(query)} />
        <div id="monsters" ref={monsters}>
          {currentMonsterList.monsters.map((monster, index) => {
            return (
              <Monster delay={0} monster={monster} key={monster.id} onClick={() => viewMonster(monster)} />
            );
          })}
        </div>
      </div>
      <Link to={`/add-monster`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Monster
      </Link>
    </div>
  );
}
