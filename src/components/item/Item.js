import React from 'react';
import '../../assets/css/item/Item.css';
import icon from '../../assets/img/dice_icon_grey.png';

export default function Item(props) {

    const getRarityClass = () => {
        let rarityClass = props.item.rarity;
        if(rarityClass !== null) {
            rarityClass = rarityClass.replace("A*", "").trim();
            rarityClass = rarityClass.replace(/\s/g, "");
            return rarityClass.toLowerCase();
        }
        return 'common';
    }

    const getPicture = () => {
        if (props.item.pic === "" || props.item.pic === null) {
            return icon;
        }
        return props.item.pic;
    }

    const style = {
        backgroundImage: `url(${getPicture()})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white'
    };

    return (
        <div className="item" style={{ animationDelay: `${props.delay * 50}ms` }} onClick={props.onClick} onContextMenu={props.onClick}>
            <div className={`itemIcon ${getRarityClass()}`} style={style}></div>
            <div className="itemComp">{props.item.name}</div>
            <div className="itemComp smallItemAttr">{props.item.type}</div>
            <div className="itemComp smallItemAttr">{props.item.rarity}</div>
        </div>
    )
}
