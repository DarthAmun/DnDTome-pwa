import React, { useState, useEffect } from "react";
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

    const deleteSpellAction = (e) => {
        deleteSpell(spell);
        EventEmitter.dispatch('removeWindow', spell);
    }
    const addSpellToCharAction = (e) => {
        addSpellToChar(selectedChar, spell, function () { });
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
        setChars(result);
        setSelectedChar(result[0].id);
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
        visible && <div className="contextMenu" style={{ "left": left, "top": top }}>
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
