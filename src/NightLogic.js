import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import SeerObserve from './SeerObserve';
import PlayerList from './PlayerList';
import NightSummary from './NightSummary';
import socket from './api/socketConnect';

class NightLogic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: false, actionAt: "", firstNight: false};
        this.handleDayCycle = this.handleDayCycle.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDayCycle(e) {
        // Define day broadcast handler here..
        ReactDOM.render(<NightSummary playerRole={this.props.playerRole}/>, document.getElementById("root"))// render night summary
    }

    handleAction(e) {
        // Handle action state change received from server
        this.setState({action: true});
    }

    handleChange(e) {
        this.setState({actionAt: e})
    }

    handleSubmit(e) {
        // Insert submit selection to server here
        if (this.props.playerRole === "werewolf" || this.props.playerRole === "guardian") {
            // submit this.state.actionAt to server here
            this.setState({action: false}); // Move back to sleep
        } else if (this.props.playerRole === "seer") {
            // render observe result
            ReactDOM.render(<SeerObserve actionAt={this.state.actionAt} firstNight={this.state.firstNight}/>, document.getElementById("root"));
        }
    }

    componentDidMount() {
        // add listener for playing action sound
        socket.on('wake werewolf', () => {
            // play werewolf sound
        });
        socket.on('wake seer', () => {
            // play seer sound
        });
        socket.on('wake guardian', () => {
            // play guardian sound
        });

        // add listener for handle action state change received from server
        socket.on('action', () => {
            this.setState({action: true, firstNight: true});
        })
    }

    componentWillUnmount() {
        // remove listener
        socket.off('wake werewolf');
        socket.off('wake seer');
        socket.off('wake guardian');
        socket.off('action');
    }

    render() {
        if (this.props.playerRole === "werewolf" && this.state.action) {
            return (
                <div>
                    <p>Pick who do you want to attack:</p>
                    <PlayerList radio={true} handleChange={(e) => this.handleChange(e)}/>
                    <button onClick={this.handleSubmit}>Attack</button>
                </div>
            )
        } else if (this.props.playerRole === "seer" && this.state.action) {
            return (
                <div>
                    <p>Pick whose playerRole do you want to observe:</p>
                    <PlayerList radio={true} handleChange={(e) => this.handleChange(e)}/>
                    <button onClick={this.handleSubmit}>Observe</button>
                </div>
            )
        } else if (this.props.playerRole === "guardian" && this.state.action) {
            return (
                <div>
                    <p>Pick who do you want to guard:</p>
                    <PlayerList radio={true} handleChange={(e) => this.handleChange(e)}/>
                    <button onClick={this.handleSubmit}>Guard</button>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You are now sleeping. Close your eyes.</p>
                    <button onClick={this.handleAction}>Test Action</button> {/* Test */}
                    <button onClick={this.handleDayCycle}>Test Day Cycle</button> {/* Test */}
                </div>
            )
        }
    }
}

export default NightLogic;