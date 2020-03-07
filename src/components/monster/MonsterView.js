import React, { useState, useEffect } from 'react';
import * as ReactDOM from "react-dom";
import '../../assets/css/monster/MonsterView.css';
import { saveMonster, deleteMonster, addMonsterToChar } from '../../database/MonsterService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import EventEmitter from '../../services/EventEmitter';

export default function MonsterView({ monster }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [subtype, setSubtype] = useState("");
    const [alignment, setAlignment] = useState("");
    const [ac, setAc] = useState("");
    const [hp, setHp] = useState("");
    const [speed, setSpeed] = useState("");
    const [cr, setCr] = useState("");
    const [source, setSource] = useState("");
    const [str, setStr] = useState("");
    const [dex, setDex] = useState("");
    const [con, setCon] = useState("");
    const [int, setInt] = useState("");
    const [wis, setWis] = useState("");
    const [cha, setCha] = useState("");
    const [savingThrows, setSavingThrows] = useState("");
    const [skills, setSkills] = useState("");
    const [senses, setSenses] = useState("");
    const [lang, setLang] = useState("");
    const [dmgVulnerabilitie, setDmgVulnerabilitie] = useState("");
    const [dmgResistance, setDmgResistance] = useState("");
    const [dmgImmunities, setDmgImmunities] = useState("");
    const [conImmunities, setConImmunities] = useState("");
    const [sAblt, setSAblt] = useState("");
    const [ablt, setAblt] = useState("");
    const [lAblt, setLAblt] = useState("");

    const [chars, setChars] = useState([]);
    const [selectedChar, setSelectedChar] = useState(0);

    const receiveMonster = (result) => {
        ReactDOM.unstable_batchedUpdates(() => {
            console.time("receiveMonster")

            let text_sAblt = "";
            if (result.sAblt !== null) {
                text_sAblt = result.sAblt.replace(/\\r\\n/gm, "\r\n");
            }
            let text_ablt = "";
            if (result.ablt !== null) {
                text_ablt = result.ablt.replace(/\\r\\n/gm, "\r\n");
            }
            let text_lAblt = ""
            if (result.lAblt !== null) {
                text_lAblt = result.lAblt.replace(/\\r\\n/gm, "\r\n");
            }

            setId(result.id);
            setName(result.name);
            setType(result.type);
            setSubtype(result.subtype);
            setPic(result.pic);
            setSize(result.size);
            setType(result.type);
            setAlignment(result.alignment);
            setAc(result.ac);
            setHp(result.hp);
            setSpeed(result.speed);
            setCr(result.cr);
            setSource(result.source);
            setStr(result.str);
            setDex(result.dex);
            setCon(result.con);
            setInt(result.int);
            setWis(result.wis);
            setCha(result.cha);
            setSavingThrows(result.savingThrows);
            setSkills(result.skills);
            setSenses(result.senses);
            setLang(result.lang);
            setDmgVulnerabilitie(result.dmgVulnerabilities);
            setDmgResistance(result.dmgResistance);
            setDmgImmunities(result.dmgImmunities);
            setConImmunities(result.conImmunities);
            setSAblt(text_sAblt);
            setAblt(text_ablt);
            setLAblt(text_lAblt);
            console.timeEnd("receiveMonster")
        })
    }

    useEffect(() => {
        receiveMonster(monster);
    }, [monster]);

    const formatScore = (score) => {
        let mod = Math.floor((score - 10) / 2);
        if (mod >= 0) {
            return "+" + mod;
        } else {
            return mod;
        }
    }

    const saveMonsterAction = (e) => {
        let newMonster = {
            id, name, type, subtype, cr, ac, hp, str, dex, con,
            int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance,
            dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment
        };
        saveMonster(newMonster);
        EventEmitter.dispatch('updateWindow', newMonster);
    }

    const deleteMonsterAction = (e) => {
        let removeMonster = {
            id, name, type, subtype, cr, ac, hp, str, dex, con,
            int, wis, cha, senses, lang, speed, source, skills, savingThrows, dmgImmunities, dmgResistance,
            dmgVulnerabilitie, conImmunities, sAblt, ablt, lAblt, pic, size, alignment
        };
        deleteMonster(removeMonster);
        EventEmitter.dispatch('removeWindow', removeMonster);
    }

    const style = {
        backgroundImage: `url(${pic})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div id="monsterView">
            <div className="image" style={style}></div>
            <div className="top">
                <label>Name:<input name="name" type="text" value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Type:<input name="type" type="text" value={type} onChange={e => setType(e.target.value)} /></label>
                <label>Subtype:<input name="subtype" type="text" value={subtype} onChange={e => setSubtype(e.target.value)} /></label>
                <label>Pic:<input name="pic" type="text" value={pic} onChange={e => setPic(e.target.value)} /></label>
                <label>Source:<input name="source" type="text" value={source} onChange={e => setSource(e.target.value)} /></label>
            </div>
            <div className="top">
                <label className="smallLabel">Cr:<input name="cr" type="text" value={cr} onChange={e => setCr(e.target.value)} /></label>
                <label className="smallLabel">AC:<input name="ac" type="number" value={ac} onChange={e => setAc(e.target.value)} /></label>
                <label>Alignment:<input name="alignment" type="text" value={alignment} onChange={e => setAlignment(e.target.value)} /></label>
                <label>Hit Points:<input name="hp" type="text" value={hp} onChange={e => setHp(e.target.value)} /></label>
                <label>Speed:<input name="speed" type="text" value={speed} onChange={e => setSpeed(e.target.value)} /></label>
                <label>Size:<input name="size" type="text" value={size} onChange={e => setSize(e.target.value)} /></label>
                <button className="delete" onClick={deleteMonsterAction}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                <button onClick={saveMonsterAction}><FontAwesomeIcon icon={faSave} /> Save</button>
            </div>
            <div className="abilityScores">
                <div className="score">
                    <label>Strength: <input type="number" value={str} onChange={e => setStr(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(str)}</div>
                </div>
                <div className="score">
                    <label>Dexterity: <input type="number" value={dex} onChange={e => setDex(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(dex)}</div>
                </div>
                <div className="score">
                    <label>Constitution: <input type="number" value={con} onChange={e => setCon(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(con)}</div>
                </div>
                <div className="score">
                    <label>Intelligence: <input type="number" value={int} onChange={e => setInt(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(int)}</div>
                </div>
                <div className="score">
                    <label>Wisdom: <input type="number" value={wis} onChange={e => setWis(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(wis)}</div>
                </div>

                <div className="score">
                    <label>Charisma: <input type="number" value={cha} onChange={e => setCha(e.target.value)}></input></label>
                    <div className="abilityBonus">{formatScore(cha)}</div>
                </div>
            </div>
            <div className="top">
                <textarea className="small" value={savingThrows} onChange={e => setSavingThrows(e.target.value)} placeholder="Saving Throws..."></textarea>
                <div className="textareaTip">Saving Throws</div>
                <textarea className="small" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Skills..."></textarea>
                <div className="textareaTip">Skills</div>
                <textarea className="small" value={senses} onChange={e => setSenses(e.target.value)} placeholder="Senses..."></textarea>
                <div className="textareaTip">Senses</div>
                <textarea className="small" value={lang} onChange={e => setLang(e.target.value)} placeholder="Languages..."></textarea>
                <div className="textareaTip">Languages</div>
            </div>
            <div className="top">
                <textarea className="small" value={dmgVulnerabilitie} onChange={e => setDmgVulnerabilitie(e.target.value)} placeholder="Vulnerabilities..."></textarea>
                <div className="textareaTip">Vulnerabilities</div>
                <textarea className="small" value={dmgResistance} onChange={e => setDmgResistance(e.target.value)} placeholder="Resistances..."></textarea>
                <div className="textareaTip">Resistances</div>
                <textarea className="small" value={dmgImmunities} onChange={e => setDmgImmunities(e.target.value)} placeholder="Damage immunities..."></textarea>
                <div className="textareaTip">Damage immunities</div>
                <textarea className="small" value={conImmunities} onChange={e => setConImmunities(e.target.value)} placeholder="Condition immunities..."></textarea>
                <div className="textareaTip">Condition immunities</div>
            </div>
            <textarea value={sAblt} onChange={e => setSAblt(e.target.value)} placeholder="Special abilities..."></textarea>
            <textarea value={ablt} onChange={e => setAblt(e.target.value)} placeholder="Actions..."></textarea>
            <textarea value={lAblt} onChange={e => setLAblt(e.target.value)} placeholder="Legendary Actions..."></textarea>
        </div>
    )
}
