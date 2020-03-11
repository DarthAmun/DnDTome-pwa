import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/item/ItemOverview.css";
import Item from "./Item";
import ItemSearchBar from "./ItemSearchBar";
import ItemContextMenu from "./ItemContextMenu";
import { reciveItems, reciveItemCount } from "../../database/ItemService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EventEmitter from '../../services/EventEmitter';

export default function ItemOverview() {
  const [currentItemList, setCurrentItemList] = useState({ items: [] });
  const items = useRef(null);
  const [query, setQuery] = useState({});

  const updateItem = (result) => {
    let items = currentItemList.items.map(item => {
      if (item.id === result.id) {
        return result;
      } else {
        return item;
      }
    });
    setCurrentItemList({ items: items });
  };
  const removeWindow = (result) => {
    let items = currentItemList.items.filter(item => {
      if (item.id !== result.id) return item;
    });
    setCurrentItemList({ items: items });
  };

  useEffect(() => {
    reciveItems(query, function (result) {
      setCurrentItemList({ items: result });
    });
  }, [query]);

  useEffect(() => {
    EventEmitter.subscribe("updateWindow", updateItem);
  }, [updateItem]);

  useEffect(() => {
    EventEmitter.subscribe("removeWindow", removeWindow);
  }, [removeWindow]);

  const viewItem = (e,item) => {
    if (e.type === 'click') {
      EventEmitter.dispatch("openView", item);
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
      EventEmitter.dispatch("openItemContext", { item: item, top: menuTop, left: menuLeft });
    };
  };

  return (
    <div id="overview">
      <div id="itemsOverview">
        <ItemSearchBar updateItems={query => setQuery(query)} />
        <div id="items" ref={items}>
          {currentItemList.items.map((item, index) => {
            return <Item delay={0} item={item} key={item.id} onClick={(e) => viewItem(e, item)} />;
          })}
        </div>
        <ItemContextMenu />
      </div>
      <Link to={`/add-item`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Magic Item
      </Link>
    </div>
  );
}
