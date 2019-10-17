import React, { Component } from 'react';
import '../../assets/css/monster/MonsterOverview.css';
import Monster from './Monster';
import SearchBar from '../SearchBar';


class MonsterOverview extends Component {
    state = {
        currentMonsterList: { monsters: [] },
        currentSelectedMonster: null
    }

    receiveMonsters = (evt, result) => {
        this.setState({
            ...this.state,
            currentMonsterList: {
                monsters: result
            }
        })
    }

    updateMonster = (evt, result) => {
        let { monsterStep, monsterStart } = result;
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    viewMonster = (monster) => {

    }

    render() {
        return (
            <div id="overview">
                <div id="monsterOverview">
                    <SearchBar inputs={["name", "type", "subtype", "cr", "alignment", "speed", "damage", "senses", "ability", "action"]} queryName="sendMonsterSearchQuery" />
                    <div id="monsters">
                        {this.state.currentMonsterList.monsters.map((monster, index) => {
                            return <Monster delay={index} monster={monster} key={monster.monster_id} onClick={() => this.viewMonster(monster)} />;
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default MonsterOverview;