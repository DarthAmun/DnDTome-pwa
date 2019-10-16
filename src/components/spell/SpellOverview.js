import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/spell/SpellOverview.css';
import Spell from './Spell';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';

import db from '../services/dbContext';

export default function SpellOverview() {
    const [currentSpellList, setCurrentSpellList] = useState([]);
    const spells = useRef(null);
    const [isFetching, setIsFetching] = useState(false);
    const [step, setStep] = useState(10);


    const receiveSpells = (evt, result) => {
        const newList = currentSpellList.concat(result);
        setCurrentSpellList(newList);
    }

    // const updateSpell = (evt, result) => {
    //     let { spellStep, spellStart } = result;
    //     ipcRenderer.send('getSearchSpells', { step: spellStep, start: spellStart });
    // }

    useEffect( () => {
        const spellsContext = {
            async getAllSpells(){
                return await db.spells.toArray();
            }
        }
        spellsContext.getAllSpells().then(res => {
            setCurrentSpellList(res);
        });
    }, []);

    useEffect(() => {
        if (isFetching) {
            fetchMoreListItems(step + 10);
            setStep(step + 10);
        };
    }, [isFetching]);

    useEffect(() => {
        setIsFetching(false);
        if (spells.current.scrollHeight == spells.current.clientHeight) {
            setStep(step + 10);
            // ipcRenderer.send('getSearchSpells', { step: step, start: step - 10 });
        }
    }, [currentSpellList]);

    const fetchMoreListItems = (currentStep) => {
        // ipcRenderer.send('getSearchSpells', { step: currentStep, start: step - 10 });
    }

    const handleScroll = () => {
        if (Math.round(spells.current.offsetHeight + spells.current.scrollTop) !== spells.current.scrollHeight) return;
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
                        return <Spell delay={(index - (step - 10))} spell={spell} key={index} onClick={() => viewSpell(spell)} />;
                    })}
                </div>
            </div>
            <Pagination name="Spell" />
        </div>
    )
}
