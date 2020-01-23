import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/spell/SpellView.css';
import { saveSpell, deleteSpell, addSpellToChar } from '../../database/SpellService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function SpellView({ spell }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [level, setLevel] = useState("");
    const [ritual, setRitual] = useState(0);
    const [time, setTime] = useState("");
    const [range, setRange] = useState("");
    const [duration, setDuration] = useState("");
    const [components, setComponents] = useState("");
    const [text, setText] = useState("");
    const [classes, setClasses] = useState("");
    const [sources, setSources] = useState("");
    const [pic, setPic] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const receiveSpell = (result) => {
        ReactDOM.unstable_batchedUpdates(() => {
            console.time("receiveSpell")

            let text = "";
            if (result.spell_text !== null) {
                text = result.spell_text.replace(/\\n/gm, "\r\n");
            }
            let sources = "";
            if (result.spell_sources !== null) {
                sources = result.spell_sources.replace(/\\n/gm, "\r\n");
            }

            setName(result.spell_name);
            setSchool(result.spell_school);
            setLevel(result.spell_level);
            setRitual(result.spell_ritual);
            setTime(result.spell_time);
            setRange(result.spell_range);
            setDuration(result.spell_duration);
            setComponents(result.spell_components);
            setText(text);
            setClasses(result.spell_classes);
            setSources(sources);
            setId(result.spell_id);
            setPic(result.spell_pic);

            if (result.spell_pic === null) {
                setPic("");
            }

            console.timeEnd("receiveSpell")
        })
    }

    useEffect(() => {
        receiveSpell(spell);
    }, [spell]);

    const saveSpellAction = (e) => {
        saveSpell({ id, name, school, level, ritual, time, range, duration, components, text, classes, sources, pic });
    }
    
    const deleteSpellAction = (e) => {
        deleteSpell({ id, name, school, ritual, level, time, range, duration, components, text, classes, sources });
    }

    const style = {
        backgroundImage: `url(${pic})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div id="spellView">
            <div className="top">
                <label>Name:<input name="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." /></label>
                <label>School:<input name="school" type="text" value={school} onChange={e => setSchool(e.target.value)} placeholder="School..." /></label>
                <div className="spellImgBlock">
                    <label className="smallSpellLabel">Level:<input name="level" type="number" value={level} onChange={e => setLevel(e.target.value)} /></label>
                    <label className="smallerSpellLabel left checkbox-label">
                        <div className="labelText">Ritual:</div>
                        <input name="ritual" type="checkbox" checked={ritual} onChange={e => setRitual(e.target.checked)} />
                        <span className="checkbox-custom circular"></span>
                    </label>
                    <div className="image" style={style}></div>
                    <label className="smallPic">Pic:<input name="pic" type="text" value={pic} onChange={e => setPic(e.target.value)} /></label>
                </div>
                <label>Casting Time:<input name="time" type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="Casting Time..." /></label>
                <label>Range:<input name="range" type="text" value={range} onChange={e => setRange(e.target.value)} placeholder="Range..." /></label>
                <label>Duration:<input name="duration" type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration..." /></label>
                <label>Components:<input name="components" type="text" value={components} onChange={e => setComponents(e.target.value)} placeholder="Components..." /></label>
                <label>Classes:<input name="classes" type="text" value={classes} onChange={e => setClasses(e.target.value)} placeholder="Classes..." /></label>
                <label>Sources:<input name="sources" type="text" value={sources} onChange={e => setSources(e.target.value)} placeholder="Sources..." /></label>
            </div>
            <div className="top">
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Describtion..."></textarea>
                <button onClick={saveSpellAction}><FontAwesomeIcon icon={faSave} /> Save</button>
                <button onClick={deleteSpellAction} className="delete" style={{ float: "right" }}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
            </div>
        </div>
    )
}
