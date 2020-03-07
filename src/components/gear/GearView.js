import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/gear/GearView.css';
import { saveGear, deleteGear, addGearToChar } from '../../database/GearService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import EventEmitter from '../../services/EventEmitter';

export default function GearView({ gear }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [damage, setDamage] = useState("");
    const [weight, setWeight] = useState("");
    const [properties, setProperties] = useState("");
    const [type, setType] = useState("");
    const [sources, setSources] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const receiveGear = (result) => {
        ReactDOM.unstable_batchedUpdates(() => {
            console.time("receiveGear")
            let text = "";
            if (result.description !== null && result.description !== undefined) {
                text = result.description.replace(/\\n/gm, "\r\n");
            }
            setName(result.name);
            setId(result.id);
            setDescription(text);
            setPic(result.pic);
            setCost(result.cost);
            setDamage(result.damage);
            setWeight(result.weight);
            setProperties(result.properties);
            setType(result.type);
            setSources(result.sources);
            console.timeEnd("receiveGear")
        })
    }

    useEffect(() => {
        receiveGear(gear);
    }, [gear]);

    const saveGearAction = (e) => {
        let newGear = { id, name, pic, description, cost, weight, damage, properties, type, sources };
        saveGear(newGear);
        EventEmitter.dispatch('updateWindow', newGear);
    }

    const deleteGearAction = (e) => {
        let removeGear = { id, name, pic, description, cost, weight, damage, properties };
        deleteGear(removeGear);
        EventEmitter.dispatch('removeWindow', removeGear);
    }

    const style = {
        backgroundImage: `url(${pic})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div id="gearView">
            <div className="top">
                <label>Name:<input name="name" type="text" value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Type:<input name="type" type="text" value={type} onChange={e => setType(e.target.value)} /></label>
                <label>Pic:<input name="pic" type="text" value={pic} onChange={e => setPic(e.target.value)} /></label>
                <label>Props:<input name="props" type="text" value={properties} onChange={e => setProperties(e.target.value)} /></label>
            </div>
            <div className="top">
                <label>Weight:<input name="weight" type="weight" value={weight} onChange={e => setWeight(e.target.value)} /></label>
                <label>Damage:<input name="damage" type="damage" value={damage} onChange={e => setDamage(e.target.value)} /></label>
                <label>Sources:<input name="sources" type="text" value={sources} onChange={e => setSources(e.target.value)} /></label>
                <label>Cost:<input name="cost" type="text" value={cost} onChange={e => setCost(e.target.value)} /></label>
                <button className="delete" onClick={deleteGearAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                <button onClick={saveGearAction}><FontAwesomeIcon icon={faSave} /> Save</button>
            </div>
            <div className="image" style={style}></div>
            <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>
    )

}
