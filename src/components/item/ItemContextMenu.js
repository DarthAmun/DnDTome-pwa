import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import "../../assets/css/ContextMenu.css";
import { deleteItem, addItemToChar } from '../../database/ItemService';
import { reciveAllChars } from '../../database/CharacterService';
import EventEmitter from '../../services/EventEmitter';

export default function ItemContextMenu() {
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState();
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setVisible(false);
    });


    const deleteItemAction = (e) => {
        deleteItem(item);
        EventEmitter.dispatch('removeWindow', item);
        setVisible(false);
    }
    const addItemToCharAction = (e) => {
        addItemToChar(selectedChar, item, function () { });
        setVisible(false);
        EventEmitter.dispatch("updateCharItem");
    }

    const setValues = (value) => {
        const { item, top, left } = value;
        ReactDOM.unstable_batchedUpdates(() => {
            setVisible(true);
            setItem(item);
            setTop(top);
            setLeft(left);
        })
    }

    const receiveChars = (result) => {
        if(result.length !== 0) {
            setChars(result);
            setSelectedChar(result[0].id);
        }
    }

    useEffect(() => {
        EventEmitter.subscribe("openItemContext", setValues);
    }, []);

    useEffect(() => {
        reciveAllChars(function (result) {
            receiveChars(result)
        })
    }, [item]);

    return (
        visible && <div className="contextMenu" style={{ "left": left, "top": top }} ref={wrapperRef}>
            <select value={selectedChar} onChange={e => setSelectedChar(e.target.value)}>
                {chars.map((char, index) => {
                    return <option key={index} value={char.id}>{char.name}</option>;
                })}
            </select>
            <div className="contextOption" onClick={() => addItemToCharAction()}>Add to Char</div>
            <div className="contextOption" onClick={() => deleteItemAction()}>Delete Item</div>
        </div>
    );
}

function useOutsideAlerter(ref, callback) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}
