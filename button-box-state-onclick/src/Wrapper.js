import React, { Component } from 'react'
import ClickBtn from './ClickBtn';
import Box from './Box'

export class Wrapper extends Component {

    constructor(props, state) {
        super(props, state);
        this.state = { isOn: false };
    }

    clicker = () => {
        this.setState(prevState => ({ isOn: !prevState.isOn }));
    }

    render() {
        const { isOn } = this.state;
        return (
            <div className="wrapper bg-light p-5">

                <ClickBtn clicker={this.clicker} isOn={isOn} />

                <Box isOn={isOn} />

            </div>
        );
    }
}

export default Wrapper
