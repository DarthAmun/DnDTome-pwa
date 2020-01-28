import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import "../assets/css/RightNav.css";
import icon from "../assets/img/dice_icon_grey.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import SpellView from "./spell/SpellView";
import ItemView from "./item/ItemView";
import GearView from "./gear/GearView";

import EventEmitter from '../services/EventEmitter';

export default function RightNav() {
  const [shortWindows, setShortWindows] = useState([]);
  const [activeView, setActiveView] = useState({});
  const [showView, setShowView] = useState(false);

  const receiveResult = (result) => {
    let type = "";
    if (result.ritual !== undefined) {
      type = "spell";
    } else if (result.attunment !== undefined) {
      type = "item";
    } else if (result.weight !== undefined) {
      type = "gear";
    } else if (result.id !== undefined) {
      type = "race";
    } else if (result.id !== undefined) {
      type = "monster";
    } else if (result.id !== undefined) {
      type = "char";
    }
    console.log(type)

    let newWindow = { ...result, windowType: type };
    ReactDOM.unstable_batchedUpdates(() => {
      setShortWindows(shortWindows => [...shortWindows, newWindow]);
      setActiveView(newWindow);
      setShowView(true);
    });
  };

  const updateWindow = (result) => {
    let windows = shortWindows.map(shortWindow => {
      if (shortWindow.windowType === "spell" && result.ritual !== undefined && shortWindow.id === result.id) {
        return { ...result, windowType: "spell" };
      } else if (shortWindow.windowType === "item" && result.attunment !== undefined && shortWindow.id === result.id) {
        return { ...result, windowType: "item" };
      } else if (shortWindow.windowType === "gear" && result.weight !== undefined && shortWindow.id === result.id) {
        return { ...result, windowType: "gear" };
      } else if (shortWindow.windowType === "race" && result.race_id !== undefined && shortWindow.race_id === result.race_id) {
        return { ...result, windowType: "race" };
      } else if (shortWindow.windowType === "monster" && result.monster_id !== undefined && shortWindow.monster_id === result.monster_id) {
        return { ...result, windowType: "monster" };
      } else if (shortWindow.windowType === "char" && result.char_id !== undefined && shortWindow.char_id === result.char_id) {
        return { ...result, windowType: "char" };
      } else {
        return shortWindow;
      }
    });
    setShortWindows(windows);
  }
  const removeWindow = (result) => {
    let windows = shortWindows.filter(shortWindow => {
      if (shortWindow.windowType === "spell" && shortWindow.id === result.id) {
      } else if (shortWindow.windowType === "item" && shortWindow.id === result.id) {
      } else if (shortWindow.windowType === "gear" && shortWindow.id === result.id) {
      } else if (shortWindow.windowType === "race" && shortWindow.race_id === result.id) {
      } else if (shortWindow.windowType === "monster" && shortWindow.monster_id === result.id) {
      } else if (shortWindow.windowType === "char" && shortWindow.char_id === result.id) {
      } else {
        return shortWindow;
      }
    });
    ReactDOM.unstable_batchedUpdates(() => {
      setShortWindows(windows);
      setShowView(false);
    });
  }

  useEffect(() => {
    EventEmitter.subscribe("openView", receiveResult);
    EventEmitter.subscribe("closeActiveView", closeActiveView);
  }, []);

  useEffect(() => {
    EventEmitter.subscribe("updateWindow", updateWindow);
  }, [updateWindow]);
  useEffect(() => {
    EventEmitter.subscribe("removeWindow", removeWindow);
  }, [removeWindow]);

  const getSpellPicture = spell => {
    if (spell.pic === "" || spell.pic === null) {
      return icon;
    }
    return spell.pic;
  };
  const getMonsterPicture = monster => {
    if (monster.monster_pic === "" || monster.monster_pic === null) {
      return icon;
    }
    return monster.monster_pic;
  };
  const getItemPicture = item => {
    if (item.pic === "" || item.pic === null) {
      return icon;
    }
    return item.pic;
  };
  const getGearPicture = gear => {
    if (gear.pic === "" || gear.pic === null) {
      return icon;
    }
    return gear.pic;
  };
  const getCharPicture = char => {
    if (char.char_pic === "" || char.char_pic === null) {
      return icon;
    }
    return char.char_pic;
  };
  const getRacePicture = race => {
    if (race.race_pic === "" || race.race_pic === null) {
      return icon;
    }
    return race.race_pic;
  };

  const getView = () => {
    if (activeView.windowType === "spell") {
      return (
        <div className={`activeView ${showView ? 'show' : 'hide'}`}>
          <SpellView spell={activeView} />
        </div>
      );
    } else if (activeView.windowType === "item") {
      return (
        <div className={`activeView ${showView ? 'show' : 'hide'}`}>
          <ItemView item={activeView} />
        </div>
      );
    } else if (activeView.windowType === "gear") {
      return (
        <div className={`activeView ${showView ? 'show' : 'hide'}`}>
          <GearView gear={activeView} />
        </div>
      );
    }
    return "";
  };

  const showActiveView = window => {
    if (window === activeView && showView) {
      setShowView(false);
    } else {
      ReactDOM.unstable_batchedUpdates(() => {
        setActiveView(window);
        setShowView(true);
      });
    }
  };

  const closeActiveView = () => {
    setShowView(false);
  }

  const removeView = (windows) => {
    let wins = shortWindows.filter(window => window !== windows);
    ReactDOM.unstable_batchedUpdates(() => {
      setShortWindows(wins);
      setShowView(false);
    });
  }

  return (
    <div id="rightNav">
      {getView()}
      {shortWindows.map((window, index) => {
        if (window.windowType === "spell") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getSpellPicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
              <div className="windowToolTip">{window.name}</div>
            </div>
          );
        } else if (window.windowType === "item") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getItemPicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
              <div className="windowToolTip">{window.name}</div>
            </div>
          );
        } else if (window.windowType === "gear") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getGearPicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}></div>
              <div className="windowToolTip">{window.name}</div>
            </div>
          );
        } else if (window.windowType === "monster") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getMonsterPicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}></div>
              <div className="windowToolTip">{window.monster_name}</div>
            </div>
          );
        } else if (window.windowType === "race") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getRacePicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}></div>
              <div className="windowToolTip">{window.race_name}</div>
            </div>
          );
        } else if (window.windowType === "char") {
          return (
            <div className="windowContainer" key={index} >
              <div className="removeWindow" onClick={e => removeView(window)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="image" onClick={e => showActiveView(window)} style={{ backgroundImage: `url(${getCharPicture(window)})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}></div>
              <div className="windowToolTip">{window.char_name}</div>
            </div>
          );
        }
      })}
    </div>
  );
}
