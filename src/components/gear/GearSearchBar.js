import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/SearchBar.css';
import { reciveAttributeSelection } from '../../database/GearService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

import Select from 'react-select';

export default function GearSearchBar({updateGears}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [damage, setDamage] = useState("");
    const [sources, setSources] = useState("");
    const [weight, setWeight] = useState("");
    const [properties, setProperties] = useState("");
    const [type, setType] = useState("");
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        reciveAttributeSelection("type", function (result) {
            let types = result.map(type => {
                if(type === "") {
                    return { value: type, label: "Empty" };
                }
                return { value: type, label: type };
            })
            setTypeList(types);
        })
    }, []);

    useEffect(() => {
        updateGears({ query: { name, description, sources, cost, weight, damage, properties, type } });
    }, [name, description, sources, cost, weight, damage, properties, type]);

    const resetSearch = () => {
        ReactDOM.unstable_batchedUpdates(() => {
            setName("");
            setDescription("");
            setCost("");
            setDamage("");
            setWeight("");
            setProperties("");
            setType("");
            setSources("");
        });
    };

    const customStyles = {
        container: (provided) => ({
            ...provided,
            minWidth: 130,
            float: 'left',
            margin: 5,
        }),
        control: (provided) => ({
            ...provided,
            minWidth: 130,
            height: 40,
            border: 'none',
            boxShadow: 'var(--boxshadow)',
            backgroundColor: 'var(--pagination-input-background-color)',
        }),
        input: (provided) => ({
            ...provided,
            color: 'var(--pagination-input-color)',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--pagination-input-background-color)',
            zIndex: 10000,
        }),
    }

    return (
        <div id="searchBar">
            <input type="text" name={name} placeholder="Name..." value={name} onChange={e => setName(e.target.value)} />
            <Select
                value={type}
                onChange={type => setType(type)}
                options={typeList}
                isMulti={true}
                styles={customStyles}
                placeholder="Type..."
            />
            <input type="text" name={weight} placeholder="Weight..." value={weight} onChange={e => setWeight(e.target.value)} />
            <input type="text" name={damage} placeholder="Damage..." value={damage} onChange={e => setDamage(e.target.value)} />
            <input type="text" name={properties} placeholder="Properties..." value={properties} onChange={e => setProperties(e.target.value)} />
            <input type="text" name={description} placeholder="Description..." value={description} onChange={e => setDescription(e.target.value)} />
            <input type="text" name={sources} placeholder="Sources..." value={sources} onChange={e => setSources(e.target.value)} />
            <button onClick={resetSearch}>
                <FontAwesomeIcon icon={faUndo} /> Reset
            </button>
        </div>
    );
}