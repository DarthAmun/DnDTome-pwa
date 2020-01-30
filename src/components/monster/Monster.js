import React from 'react';
import '../../assets/css/monster/Monster.css';
import icon from '../../assets/img/dice_icon_grey.png';

export default function Monster(props) {
    const formatType = (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const formatSubType = (value) => {
        if (value == "") {
            return "";
        } else {
            return " (" + value + ")";
        }
    }

    const getPicture = () => {
        if (props.monster.pic === "" || props.monster.pic === null) {
            return icon;
        }
        return props.monster.pic;
    }

    const style = {
        backgroundImage: `url(${getPicture()})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white'
    };

    return (
        <div className="monster" style={{ animationDelay: `${props.delay * 50}ms` }} onClick={props.onClick}>
            <div className="monsterAttr monsterType">
                <b>{formatType(props.monster.type)}</b>
                {formatSubType(props.monster.subtype)}
            </div>
            <div className="monsterAttr monsterLevel">{props.monster.cr}</div>
            <div className="monsterIcon" style={style}></div>

            <div className="monsterAttr monsterName"><b>{props.monster.name}</b></div>

            <div className="smallMonsterAttr"><b>Alignment: </b>{props.monster.alignment}</div>
            <div className="smallMonsterAttr"><b>Size: </b>{props.monster.size}</div>
        </div>
    )

}
