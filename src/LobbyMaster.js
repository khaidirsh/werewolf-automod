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
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStartServer(e) {
        // Instruct server to start the game
        socket.emit("start game")
    }

    handleStatus(e) {
        // If server sends status to start the game:
        this.setState({status: "start", playerRole: e.target.value /* Change to playerRole received from server */});
    }

    render() {
        let title = "";
        if (this.state.status === "wait") {
            title = "Waiting for the game to start...";
        } else {
            title =  "Starting game...";
            setTimeout(() => {
                ReactDOM.render(<ViewRole playerRole={this.state.playerRole}/>, document.getElementById("root"))
            }, 1000)
        }
        return (
            <div className="base">
                <h1>{title}</h1>
                <p>Player list:</p>
                <PlayerList />
                <button onClick={this.handleStatus} value="werewolf">Test as Werewolf</button> {/* Test */}
                <button onClick={this.handleStatus} value="seer">Test as Seer</button> {/* Test */}
                <button onClick={this.handleStatus} value="guardian">Test as Guardian</button> {/* Test */}
                <button onClick={this.handleStatus} value="villager">Test as Villager</button> {/* Test */}
                <button onClick={this.handleStartServer}>Start the game</button>
            </div>
        )
    }
}

export default LobbyMaster;