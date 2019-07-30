import React from 'react';
import './styles/App.css';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: "wait"};
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(e) {
        // If server sends status to start the game:
        this.setState({status: "start"});
    }

    render() {
        let title = "";
        if (this.state.status === "wait") {
            title = "Waiting for players...";
        } else {
            title =  "Starting game...";
        }
        return (
            <div className="base">
                <h1>{title}</h1>
                <ul>
                    {/* Player list from server */}
                </ul>
                <button onClick={this.handleStatus}>Test Start</button> {/* Test */}
            </div>
        )
    }
}

export default Lobby;