import React, { Component } from 'react';
import '../assets/css/Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';



class SpellPagination extends Component {
    state = {
        currentPage: 1,
        pageStep: 10,
        spellCount: 0,
        currentSpellList: { spells: [] },
        maxPages: 0
    }

    receiveSpellCount = (evt, result) => {
        this.setState({
            ...this.state,
            spellCount: result[0].count,
            currentPage: 1,
            maxPages: Math.ceil(result[0].count / this.state.pageStep)
        })
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    pageUp = () => {
        let count = this.state.maxPages;
        let newCount = this.state.currentPage + 1;
        if (newCount <= count) {
            this.setState({
                ...this.state,
                currentPage: (this.state.currentPage + 1)
            });
        }
    }
    pageDown = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                ...this.state,
                currentPage: this.state.currentPage - 1
            });
        }
    }
    pageJumpTo = (event) => {
        if (!isNaN(event.target.value)) {
            if (event.target.value > 0 && event.target.value <= this.state.maxPages) {
                this.setState({
                    ...this.state,
                    currentPage: parseInt(event.target.value)
                });
            }
        }
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        }
    }

    changeStep = (e) => {
        this.setState({
            ...this.state,
            pageStep: parseInt(e.target.value),
            currentPage: 1,
            maxPages: Math.ceil(this.state.itemCount / parseInt(e.target.value))
        });
    }

    render() {
        return (
            <div id="pagination">
                <div className="pageDown" onClick={this.pageDown}>
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </div>
                <div id="pages">
                    <input id="pageInput" type="number" value={this.state.currentPage} min="1"
                        max={this.state.maxPages}
                        onChange={this.pageJumpTo}
                        onKeyDown={this.handleKeyDown} />
                    / {Math.ceil(this.state.spellCount / this.state.pageStep)}
                </div>
                <div className="pageUp" onClick={this.pageUp}>
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </div>
                <div id="step">
                    <select name="stepSelect" onChange={this.changeStep} defaultValue="10">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>
            </div >
        )
    }
}

export default SpellPagination;