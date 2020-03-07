import React from 'react';
import '../../assets/css/spell/Spell.css';
import icon from '../../assets/img/dice_icon_grey.png';

export default function Spell(props) {

    const formatTime = (value) => {
        let words = value.split(',');
        return words[0];
    }

    const formatLevel = (value) => {
        if (value === "0") {
            return <b>C</b>;
        }
        return value;
    }

    const hasRitual = (value) => {
        if (value === 1) {
            return <div className="icon">R</div>;
        }
        return "";
    }

    const hasConcentration = (value) => {
        let search = value.toLowerCase();
        if (search.includes("concentration")) {
            return <div className="icon">C</div>;
        }
        return "";
    }

    const formatComponents = (value) => {
        let words = value.split('(');
        if (words.length > 1) {
            return words[0] + "*";
        }
        return words[0];
    }

    const formatDuration = (value) => {
        let search = value.toLowerCase();
        if (search.includes("concentration")) {
            if (search.includes("concentration, ")) {
                let words = value.replace("Concentration, ", "");
                return words;
            } else {
                let words = value.replace("Concentration", "");
                return words;
            }
        }
        return value;
    }

    const getPicture = () => {
        if (props.spell.pic === "" || props.spell.pic === null) {
            return icon;
        }
        return props.spell.pic;
    }

    const style = {
        backgroundImage: `url(${getPicture()})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div className="spell" style={{ animationDelay: `${props.delay * 50}ms` }} onClick={props.onClick} onContextMenu={props.onClick}>
            <div className={`spellSchool spellAttr ${props.spell.school}`}>{props.spell.school}</div>
            <div className="spellLevel spellAttr">{formatLevel(props.spell.level)}</div>
            {hasRitual(props.spell.ritual)}
            {hasConcentration(props.spell.duration)}

            <div className="spellName spellAttr">
                <div className="image" style={style}></div>
                <b>{props.spell.name}</b>
            </div>

            <div className="spellTime smallSpellAttr"><b>Time: </b>{formatTime(props.spell.time)}</div>
            <div className="spellDuration smallSpellAttr"><b>Duration: </b>{formatDuration(props.spell.duration)}</div>
            <div className="spellRange smallSpellAttr"><b>Range: </b>{props.spell.range}</div>
            <div className="spellComp smallSpellAttr"><b>Comp.: </b>{formatComponents(props.spell.components)}</div>
        </div>
    )
}
