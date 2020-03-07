import React from 'react';
import '../../assets/css/char/Char.css';
import icon from '../../assets/img/dice_icon_grey.png';

export default function Char(props) {

    const getPicture = () => {
        if (props.char.pic === "") {
            return icon;
        }
        return props.char.pic;
    }

    const style = {
        backgroundImage: `url(${getPicture()})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white'
    };
    return (
        <div className="char" style={{ animationDelay: `${props.delay * 50}ms` }} onClick={props.onClick}>
            <div className="leftChar">
                <div className="charIcon" style={style}></div>
                <div className="charComp">{props.char.name}</div>
                <div className="charComp smallText">by {props.char.player}</div>
            </div>
            <div className="rightChar">
                <div className="charComp">{props.char.classes}</div>
                <div className="charComp">{props.char.race}</div>
                <div className="charComp">{props.char.background}</div>
                <div className="charComp">Level: {props.char.level}</div>
            </div>
        </div>
    )

}
