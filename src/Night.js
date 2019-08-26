import React from 'react';
import './styles/style.css';
import NightLogic from './NightLogic'
import socket from './api/socketConnect'

class Night extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: ""};

        // request round counter
        socket.emit('counter', 'night', (count) => {
            this.setState({counter: count});
        });

        // play night sound
    }

    render() {
        return (
            <div className="base">
                <h1>Night {this.state.counter}</h1>
                <NightLogic playerRole={this.props.playerRole} />
            </div>
        )
    }
}

export default Night;