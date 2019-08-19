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

    /* handleStatus(e) {
        // For testing buttons:
        this.setState({status: "start", playerRole: e.target.value});
    } */

    componentDidMount() {
        // Add socket listener for game status
        socket.on('insufficient', () => {
            alert('There has to be minimum 5 players to start the game.')
        })

        socket.on('player role', (roleFromServer) => {
            this.setState({status: "start", playerRole: roleFromServer});
        })
    }

    componentWillUnmount() {
        // Remove socket listener
        socket.off('insufficient');
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

                 {/* Testing buttons */}
                {/* <button onClick={this.handleStatus} value="werewolf">Test as Werewolf</button>
                <button onClick={this.handleStatus} value="seer">Test as Seer</button>
                <button onClick={this.handleStatus} value="guardian">Test as Guardian</button>
                <button onClick={this.handleStatus} value="villager">Test as Villager</button> */}

                <button onClick={this.handleStartServer}>Start the game</button>
            </div>
        )
    }
}

export default LobbyMaster;