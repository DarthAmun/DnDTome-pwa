import React from 'react';
import '../../assets/css/gear/Gear.css';
import icon from '../../assets/img/dice_icon_grey.png';

export default function Gear(props) {

    const getPicture = () => {
        if (props.gear.pic === "" || props.gear.pic === null) {
            return icon;
        }
        return props.gear.pic;
    }

    const style = {
        backgroundImage: `url(${getPicture()})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white'
    };

    return (
        <div className="gear" style={{ animationDelay: `${props.delay * 50}ms` }} onClick={props.onClick} onContextMenu={props.onClick}>
            <div className="gearIcon" style={style}></div>
            <div className="gearComp">{props.gear.name}</div>
            <div className="gearComp smallGearAttr">{props.gear.type}</div>
        </div>
    )
}
