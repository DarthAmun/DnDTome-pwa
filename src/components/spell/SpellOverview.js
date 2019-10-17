import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/spell/SpellOverview.css';
import Spell from './Spell';
import SearchBar from '../SearchBar';

import {readSpellsByStep} from '../services/DnDTomeDatabase';

export default function SpellOverview() {
    const [currentSpellList, setCurrentSpellList] = useState([]);
    const spells = useRef(null);
    const [isFetching, setIsFetching] = useState(false);
    const [step, setStep] = useState(0);


    const receiveSpells = (result) => {
        const newList = currentSpellList.concat(result);
        setCurrentSpellList(newList);
    }

    useEffect(() => {
        fetchMoreListItems(step);
    }, []);

    useEffect(() => {
        if (isFetching) {
            fetchMoreListItems(step + 10);
            setIsFetching(false);
        };
    }, [isFetching]);

    useEffect(() => {
        if (spells.current.scrollHeight == spells.current.clientHeight) {
            fetchMoreListItems(step);
        }
    }, [currentSpellList]);

    const fetchMoreListItems = (currentStep) => {
        readSpellsByStep(currentStep).then(spells => {
            if(spells === []) return;
            receiveSpells(spells);
            setStep(step + 10);
        })
    }

    const handleScroll = () => {
        if ((Math.round(spells.current.offsetHeight + spells.current.scrollTop) + 10) < spells.current.scrollHeight) return;
        setIsFetching(true);
    }

    const viewSpell = (spell) => {
        // ipcRenderer.send('openSpellView', spell);
    }

    return (
        <div id="overview">
            <div id="spellOverview">
                <SearchBar inputs={["name", "school", "level", "duration", "time", "range", "components", "text", "classes", "sources"]} queryName="sendSpellSearchQuery" />
                <div id="spells" onScroll={handleScroll} ref={spells}>
                    {currentSpellList.map((spell, index) => {
                        return <Spell delay={index - (step - 20)} spell={spell} key={index} onClick={() => viewSpell(spell)} />;
                    })}
                </div>
            </div>
        </div>
    )
}
