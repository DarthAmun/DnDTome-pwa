import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/gear/GearOverview.css";
import Gear from "./Gear";
import GearSearchBar from "./GearSearchBar";
import GearContextMenu from "./GearContextMenu";
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

  const viewGear = (e, gear) => {
    if (e.type === 'click') {
      EventEmitter.dispatch("openView", gear);
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
      EventEmitter.dispatch("openGearContext", { gear: gear, top: menuTop, left: menuLeft });
    };
  };

  return (
    <div id="overview">
      <div id="itemsOverview">
        <GearSearchBar updateGears={query => setQuery(query)} />
        <div id="items" ref={gears}>
          {currentGearList.gears.map((gear, index) => {
            return <Gear delay={0} gear={gear} key={gear.id} onClick={(e) => viewGear(e,gear)} />;
          })}
        </div>
        <GearContextMenu />
      </div>
      <Link to={`/add-gear`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Gear
      </Link>
    </div>
  );
}
