import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import "../../assets/css/ContextMenu.css";
import { deleteGear, addGearToChar } from '../../database/GearService';
import { reciveAllChars } from '../../database/CharacterService';
import EventEmitter from '../../services/EventEmitter';

export default function GearContextMenu() {
    const [visible, setVisible] = useState(false);
    const [gear, setGear] = useState();
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setVisible(false);
    });


    const deleteGearAction = (e) => {
        deleteGear(gear);
        EventEmitter.dispatch('removeWindow', gear);
        setVisible(false);
    }
    const addGearToCharAction = (e) => {
        addGearToChar(selectedChar, gear, function () { });
        setVisible(false);
        EventEmitter.dispatch("updateCharItem");
    }

    const setValues = (value) => {
        const { gear, top, left } = value;
        ReactDOM.unstable_batchedUpdates(() => {
            setVisible(true);
            setGear(gear);
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
        EventEmitter.subscribe("openGearContext", setValues);
    }, []);

    useEffect(() => {
        reciveAllChars(function (result) {
            receiveChars(result)
        })
    }, [gear]);

    return (
        visible && <div className="contextMenu" style={{ "left": left, "top": top }} ref={wrapperRef}>
            <select value={selectedChar} onChange={e => setSelectedChar(e.target.value)}>
                {chars.map((char, index) => {
                    return <option key={index} value={char.id}>{char.name}</option>;
                })}
            </select>
            <div className="contextOption" onClick={() => addGearToCharAction()}>Add to Char</div>
            <div className="contextOption" onClick={() => deleteGearAction()}>Delete Gear</div>
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
