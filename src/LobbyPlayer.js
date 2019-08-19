import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import ViewRole from './ViewRole';
import PlayerList from './PlayerList';

class LobbyMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: "wait", playerRole: ""};
        this.handleStatus = this.handleStatus.bind(this);
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
            </div>
        )
    }
}

export default LobbyMaster;