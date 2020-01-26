import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/item/ItemOverview.css";
import Item from "./Item";
import { reciveItems, reciveItemCount } from "../../database/ItemService";
import ItemSearchBar from "./ItemSearchBar";
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

  const viewItem = item => {
    EventEmitter.dispatch("openView", item);
  };

  return (
    <div id="overview">
      <div id="itemsOverview">
        <ItemSearchBar updateItems={query => setQuery(query)} />
        <div id="items" ref={items}>
          {currentItemList.items.map((item, index) => {
            return <Item delay={0} item={item} key={item.id} onClick={() => viewItem(item)} />;
          })}
        </div>
      </div>
      <Link to={`/add-item`} className="button">
        <FontAwesomeIcon icon={faPlus} /> Add new Magic Item
      </Link>
    </div>
  );
}
