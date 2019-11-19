import React, { useState, useEffect, useRef } from 'react';
import '../../assets/css/spell/SpellOverview.css';
import Spell from './Spell';
import SearchBar from '../SearchBar';

import { SpellService } from "../services/spellService";

export default function SpellOverview() {
    const [currentSpellList, setCurrentSpellList] = useState([]);
    const spells = useRef(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        loadSpellsFromDb();
    }, []);

    useEffect(() => {
        console.log(currentSpellList);
    }, [currentSpellList]);

    async function loadSpellsFromDb() {
        const service = new SpellService();
        try {
            const spells = await service.getSpells()
            setCurrentSpellList(spells);
        }
        catch (ex) {
            console.error(ex);
        }
    }


    return (
        <div id="overview">
            <div id="spellOverview">
                <SearchBar inputs={["spell_name", "spell_school", "spell_level", "spell_duration", "spell_time", "spell_range", "spell_components", "spell_text", "spell_classes", "spell_sources"]} queryName="sendSpellSearchQuery" />
                <div id="spells" ref={spells}>
                    {currentSpellList.map((spell, index) => {
                        return <Spell delay={index - (step - 20)} spell={spell} key={index} />;
                    })}
                </div>
            </div>
        </div>
    )
}
