import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import ViewRole from './ViewRole';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: "wait", role: ""};
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(e) {
        // If server sends status to start the game:
        this.setState({status: "start", role: e.target.value /* Change to role received from server */});
    }

    render() {
        let title = "";
        if (this.state.status === "wait") {
            title = "Waiting for server to start...";
        } else {
            title =  "Starting game...";
            setTimeout(() => {
                ReactDOM.render(<ViewRole role={this.state.role}/>, document.getElementById("root"))
            }, 3000)
        }
        return (
            <div className="base">
                <h1>{title}</h1>
                <p>Player list:</p>
                <ul>
                    {/* Player list from server */}
                </ul>
                <button onClick={this.handleStatus} value="werewolf">Test Start as Werewolf</button> {/* Test */}
                <button onClick={this.handleStatus} value="seer">Test Start as Seer</button> {/* Test */}
                <button onClick={this.handleStatus} value="villager">Test Start as Villager</button> {/* Test */}
            </div>
        )
    }
}

export default Lobby;