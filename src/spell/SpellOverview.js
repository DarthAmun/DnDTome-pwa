import React, { Component } from 'react';
import '../assets/css/spell/SpellOverview.css';
import Spell from './Spell';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';
import spellsContext from '../services/spellsContext';




class SpellOverview extends Component {
    state = {
        currentSpellList: { spells: [] },
        currentSelectedSpell: null
    }

    receiveSpells = ( result) => {
        this.setState({
            ...this.state,
            currentSpellList: {
                spells: result
            }
        })
    }

    updateSpell = (evt, result) => {
        let { spellStep, spellStart } = result;
    }

    componentDidMount() {
       
    }
    componentWillUnmount() {

    }

    viewSpell = (spell) => {

    }

    render() {
        return (
            <div id="overview">
                <div id="spellOverview">
                    <SearchBar inputs={["name", "school", "level", "duration", "time", "range", "components", "text", "classes", "sources"]} queryName="sendSpellSearchQuery" />
                    <div id="spells">
                        {this.state.currentSpellList.spells.map((spell, index) => {
                            return <Spell delay={index} spell={spell} key={spell.spell_id} onClick={() => this.viewSpell(spell)} />;
                        })}
                    </div>
                </div>
                <Pagination name="Spell" />
            </div>
        )
    }
}

export default SpellOverview;