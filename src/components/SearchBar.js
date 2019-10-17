import React, { useState } from 'react';
import '../assets/css/SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';



export default function SearchBar({ inputs, queryName }) {
    const initialState = () => inputs.reduce((acc, curr) => ((acc[curr] = ''), acc), {});
    const [query, setQuery] = useState(initialState());

    const sendQuery = e => {
        if (e.key === 'Enter') {
        }
    };

    const handleChange = e => setQuery({ ...query, [e.target.name]: e.target.value });

    const resetSearch = () => {
        setQuery({ ...initialState() });
    };

    return (
        <div id="searchBar" onKeyDown={sendQuery}>
            {inputs.map(item => (
                <input type="text" key={item} name={item} placeholder={item} value={query[item]} onChange={handleChange} />
            ))}
            <button onClick={resetSearch}>
                <FontAwesomeIcon icon={faUndo} /> Reset
            </button>
        </div>
    );
}