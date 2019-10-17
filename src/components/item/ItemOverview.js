import React, { Component } from 'react';
import '../../assets/css/item/ItemOverview.css';
import Item from './Item';
import SearchBar from '../SearchBar';


class ItemOverview extends Component {
    state = {
        currentItemList: { items: [] },
        currentSelectedItem: null
    }

    receiveItems = (evt, result) => {
        this.setState({
            ...this.state,
            currentItemList: {
                items: result
            }
        })
    }

    updateItem = (evt, result) => {
        let { itemStep, itemStart } = result;
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    viewItem = (item) => {

    }

    render() {
        return (
            <div id="overview">
                <div id="itemsOverview">
                    <SearchBar inputs={["name", "description", "rarity", "type", "source"]} queryName="sendItemSearchQuery" />
                    <div id="items">
                        {this.state.currentItemList.items.map((item, index) => {
                            return <Item delay={index} item={item} key={item.item_id} onClick={() => this.viewItem(item)} />;
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemOverview;