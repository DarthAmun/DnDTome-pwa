import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/gear/GearOverview.css";
import Gear from "./Gear";
import GearSearchBar from "./GearSearchBar";
import { reciveGears, reciveGearCount } from "../../database/GearService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EventEmitter from '../../services/EventEmitter';

export default function GearOverview() {
  const [currentGearList, setCurrentGearList] = useState({ gears: [] });
  const gears = useRef(null);
  const [query, setQuery] = useState({});

  const updateGear = (result) => {
    let gears = currentGearList.gears.map(gear => {
      if (gear.id === result.id) {
        return result;
      } else {
        return gear;
      }
    });
    setCurrentGearList({ gears: gears });
  };
  const removeWindow = (result) => {
    let gears = currentGearList.gears.filter(gear => {
      if (gear.id !== result.id) return gear;
    });
    setCurrentGearList({ gears: gears });
  };

  useEffect(() => {
    reciveGears(query, function (result) {
      setCurrentGearList({ gears: result });
    });
  }, [query]);

  useEffect(() => {
    EventEmitter.subscribe("updateWindow", updateGear);
  }, [updateGear]);

  useEffect(() => {
    EventEmitter.subscribe("removeWindow", removeWindow);
  }, [removeWindow]);

  const viewGear = gear => {
    EventEmitter.dispatch("openView", gear);
  };

  return (
    <div id="overview">
      <div id="itemsOverview">
        <GearSearchBar updateGears={query => setQuery(query)}/>
        <div id="items" ref={gears}>
          {currentGearList.gears.map((gear, index) => {
            return <Gear delay={0} gear={gear} key={gear.id} onClick={() => viewGear(gear)} />;
          })}
        </div>
      </div>
      <Link to={`/add-gear`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Gear
      </Link>
    </div>
  );
}
