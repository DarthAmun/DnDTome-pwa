import React, { Component } from 'react';
import './assets/css/TopNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



class TopNav extends Component {

    closeMainWindow = () => {
    }

    render() {
        return (
            <div id="topNav">
                <div id="topBar"></div>
                <div id="close" onClick={() => this.closeMainWindow()}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        )
    }
}

export default TopNav;