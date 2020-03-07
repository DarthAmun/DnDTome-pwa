import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import "../../assets/css/ContextMenu.css";
import { deleteMonster, addMonsterToChar } from '../../database/MonsterService';
import { reciveAllChars } from '../../database/CharacterService';
import EventEmitter from '../../services/EventEmitter';

export default function MonsterContextMenu() {
    const [visible, setVisible] = useState(false);
    const [monster, setMonster] = useState();
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setVisible(false);
    });


    const deleteMonsterAction = (e) => {
        deleteMonster(monster);
        EventEmitter.dispatch('removeWindow', monster);
        setVisible(false);
    }
    const addMonsterToCharAction = (e) => {
        addMonsterToChar(selectedChar, monster, function () { });
        setVisible(false);
        EventEmitter.dispatch("updateCharMonster");
    }

    const setValues = (value) => {
        const { monster, top, left } = value;
        ReactDOM.unstable_batchedUpdates(() => {
            setVisible(true);
            setMonster(monster);
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
        EventEmitter.subscribe("openMonsterContext", setValues);
    }, []);

    useEffect(() => {
        reciveAllChars(function (result) {
            receiveChars(result)
        })
    }, [monster]);

    return (
        visible && <div className="contextMenu" style={{ "left": left, "top": top }} ref={wrapperRef}>
            <select value={selectedChar} onChange={e => setSelectedChar(e.target.value)}>
                {chars.map((char, index) => {
                    return <option key={index} value={char.id}>{char.name}</option>;
                })}
            </select>
            <div className="contextOption" onClick={() => addMonsterToCharAction()}>Add to Char</div>
            <div className="contextOption" onClick={() => deleteMonsterAction()}>Delete Monster</div>
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
