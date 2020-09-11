import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/SearchBar.css';
import { reciveAttributeSelection } from '../../database/SpellService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

import Select from 'react-select';

export default function SpellSearchBar({updateSpells}) {
    const [name, setName] = useState("");
    const [school, setSchool] = useState([]);
    const [schoolList, setSchoolList] = useState([]);
    const [level, setLevel] = useState("");
    const [levelList, setLevelList] = useState([]);
    const [ritual, setRitual] = useState(false);
    const [time, setTime] = useState("");
    const [range, setRange] = useState("");
    const [duration, setDuration] = useState("");
    const [components, setComponents] = useState("");
    const [text, setText] = useState("");
    const [classes, setClasses] = useState("");
    const [sources, setSources] = useState("");

    useEffect(() => {
        reciveAttributeSelection("school", function (result) {
            let schools = result.map(school => {
                if (school === "") {
                    return { value: school, label: "Empty" };
                }
                return { value: school, label: school };
            })
            setSchoolList(schools);
        })
        reciveAttributeSelection("level", function (result) {
            let levels = result.map(level => {
                if (level === "") {
                    return { value: level, label: "Empty" };
                }
                return { value: level, label: level };
            })
            setLevelList(levels);
        })
    }, []);

    useEffect(() => {
        updateSpells({query: { name, school, level, time, range, duration, components, text, classes, sources, ritual } });
    }, [name, school, level, time, range, duration, components, text, classes, sources, ritual]);

    const resetSearch = () => {
        ReactDOM.unstable_batchedUpdates(() => {
            setName("");
            setSchool("");
            setLevel("");
            setRitual("");
            setTime("");
            setRange("");
            setDuration("");
            setComponents("");
            setText("");
            setClasses("");
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
            <label className="smaller left checkbox-label">
                <div className="labelText">Ritual:</div>
                <input name="ritual" type="checkbox" checked={ritual} onChange={e => setRitual(e.target.checked)} />
                <span className="checkbox-custom circular"></span>
            </label>
            <input type="text" name={name} placeholder="Name..." value={name} onChange={e => setName(e.target.value)} />
            <Select
                value={school}
                onChange={school => setSchool(school)}
                options={schoolList}
                isMulti={true}
                styles={customStyles}
                placeholder="School..."
            />
            <Select
                value={level}
                onChange={level => setLevel(level)}
                options={levelList}
                isMulti={true}
                styles={customStyles}
                placeholder="Level..."
            />
            <input type="text" name={time} placeholder="Casting time..." value={time} onChange={e => setTime(e.target.value)} />
            <input type="text" name={range} placeholder="Range..." value={range} onChange={e => setRange(e.target.value)} />
            <input type="text" name={duration} placeholder="Duration..." value={duration} onChange={e => setDuration(e.target.value)} />
            <input type="text" name={components} placeholder="Components..." value={components} onChange={e => setComponents(e.target.value)} />
            <input type="text" name={text} placeholder="Text..." value={text} onChange={e => setText(e.target.value)} />
            <input type="text" name={classes} placeholder="Classes..." value={classes} onChange={e => setClasses(e.target.value)} />
            <input type="text" name={sources} placeholder="Sources..." value={sources} onChange={e => setSources(e.target.value)} />
            <button onClick={resetSearch}>
                <FontAwesomeIcon icon={faUndo} /> Reset
            </button>
        </div>
    );
}