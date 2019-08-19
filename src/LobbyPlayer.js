import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import ViewRole from './ViewRole';
import PlayerList from './PlayerList';

import socket from './api/socketConnect';

class LobbyMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: "wait", playerRole: ""};
    }

    componentDidMount() {
        // Add socket listener for game status
        socket.on('player role', (roleFromServer) => {
            this.setState({status: "start", playerRole: roleFromServer});
        })
    }

    componentWillUnmount() {
        // Remove socket listener
        socket.off('player role');
    }

    render() {
        let title = "";
        if (this.state.status === "wait") {
            title = "Waiting for the game to start...";
        } else {
            title =  "Starting game...";
            setTimeout(() => {
                ReactDOM.render(<ViewRole playerRole={this.state.playerRole}/>, document.getElementById("root"))
            }, 3000)
        }
        return (
            <div className="base">
                <h1>{title}</h1>
                <p>Player list:</p>
                <PlayerList />
            </div>
        )
    }
}

export default LobbyMaster;