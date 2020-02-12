import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import "../../assets/css/ContextMenu.css";
import { deleteSpell, addSpellToChar } from '../../database/SpellService';
import { reciveAllChars } from '../../database/CharacterService';
import EventEmitter from '../../services/EventEmitter';

export default function SpellContextMenu() {
    const [visible, setVisible] = useState(false);
    const [spell, setSpell] = useState();
    const [top, setTop] = useState("");
    const [left, setLeft] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setVisible(false);
    });


    const deleteSpellAction = (e) => {
        deleteSpell(spell);
        EventEmitter.dispatch('removeWindow', spell);
        setVisible(false);
    }
    const addSpellToCharAction = (e) => {
        addSpellToChar(selectedChar, spell, function () { });
        setVisible(false);
        EventEmitter.dispatch("updateCharSpell");
    }

    const setValues = (value) => {
        const { spell, top, left } = value;
        console.log(value)
        ReactDOM.unstable_batchedUpdates(() => {
            setVisible(true);
            setSpell(spell);
            setTop(top);
            setLeft(left);
        })
    }

    const receiveChars = (result) => {
        console.log(result)
        if(result.length !== 0) {
            setChars(result);
            setSelectedChar(result[0].id);
        }
    }

    useEffect(() => {
        EventEmitter.subscribe("openSpellContext", setValues);
    }, []);

    useEffect(() => {
        reciveAllChars(function (result) {
            receiveChars(result)
        })
    }, [spell]);

    return (
        visible && <div className="contextMenu" style={{ "left": left, "top": top }} ref={wrapperRef}>
            <select value={selectedChar} onChange={e => setSelectedChar(e.target.value)}>
                {chars.map((char, index) => {
                    return <option key={index} value={char.id}>{char.name}</option>;
                })}
            </select>
            <div className="contextOption" onClick={() => addSpellToCharAction()}>Add to Char</div>
            <div className="contextOption" onClick={() => deleteSpellAction()}>Delete Spell</div>
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
