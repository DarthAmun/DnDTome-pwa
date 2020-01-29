import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/item/ItemView.css';
import { saveItem, deleteItem, addItemToChar } from '../../database/ItemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import EventEmitter from '../../services/EventEmitter';

export default function ItemView({ item }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [description, setDescription] = useState("");
    const [rarity, setRarity] = useState("");
    const [type, setType] = useState("");
    const [sources, setSources] = useState("");
    const [attunment, setAttunment] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const receiveItem = (result) => {
        ReactDOM.unstable_batchedUpdates(() => {
            console.time("receiveItem")
            let text = "";
            if (result.description !== null) {
                text = result.description.replace(/\\n/gm, "\r\n");
            }
            setName(result.name);
            setId(result.id);
            setDescription(text);
            setPic(result.pic);
            setRarity(result.rarity);
            setType(result.type);
            setSources(result.source);
            setAttunment(result.attunment);
            console.timeEnd("receiveItem")
        })
    }

    const receiveChars = (result) => {
        setChars(result);
        setSelectedChar(result[0].char_id);
    }

    useEffect(() => {
        receiveItem(item);
    }, [item]);

    const saveItemAction = (e) => {
        let newItem = { id, name, pic, type, rarity, sources, attunment, description };
        saveItem(newItem);
        EventEmitter.dispatch('updateWindow', newItem);
    }

    const deleteItemAction = (e) => {
        let removeItem = { id, name, pic, type, rarity, sources, description };
        deleteItem(removeItem);
        EventEmitter.dispatch('removeWindow', removeItem);
    }

    const style = {
        backgroundImage: `url(${pic})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div id="itemView">
            <div className="top">
                <label>Name:<input name="name" type="text" value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Sources:<input name="sources" type="text" value={sources} onChange={e => setSources(e.target.value)} /></label>
                <label>Pic:<input name="pic" type="text" value={pic} onChange={e => setPic(e.target.value)} /></label>
            </div>
            <div className="top">
                <label>Rarity:<input name="rarity" type="text" value={rarity} onChange={e => setRarity(e.target.value)} /></label>
                <label>Type:<input name="type" type="text" value={type} onChange={e => setType(e.target.value)} /></label>
                <label className="checkbox-label">
                    <div className="labelText">Attuned:</div>
                    <input name="type" type="checkbox" checked={attunment} onChange={e => setAttunment(e.target.checked)} />
                    <span className="checkbox-custom circular"></span>
                </label>
            </div>
            <div className="top" style={{ width: "120px" }}>
                <button className="delete" onClick={deleteItemAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                <button onClick={saveItemAction}><FontAwesomeIcon icon={faSave} /> Save</button>
            </div>

            <div className="top" style={{ width: "100%" }}>
                <div className="image" style={style}></div>
                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
        </div>
    )

}
