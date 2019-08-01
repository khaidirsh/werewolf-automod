import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import SeerObserve from './SeerObserve';

class NightLogic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: false, actionAt: ""};
        this.handleDayCycle = this.handleDayCycle.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDayCycle(e) {
        // Define day broadcast handler here..
        // render night summary
    }

    handleAction(e) {
        // Handle action state change received from server
        this.setState({action: true});
    }

    handleChange(e) {
        this.setState({actionAt: e.target.value})
    }

    handleSubmit(e) {
        // Insert submit selection to server here
        if (this.props.role === "werewolf") {
            // submit this.state.actionAt to server here
            this.setState({action: false}); // Move back to sleep
        } else if (this.props.role === "seer") {
            // render observe result
            ReactDOM.render(<SeerObserve actionAt={this.state.actionAt} backToSleep={(e) => this.setState({action: e})}/>, document.getElementById("root"));
        }
    }

    render() {
        if (this.props.role === "werewolf" && this.state.action) {
            return (
                <div>
                    <p>Pick who do you want to kill:</p>
                    {/* Insert player list from server here. This should be separated. */}
                    <div>
                        <label>
                            <input type="radio" name="player" value="a" onChange={this.handleChange} /> a
                        </label>
                    
                        <label>
                            <input type="radio" name="player" value="b" onChange={this.handleChange} /> b
                        </label>
                    
                        <label>
                            <input type="radio" name="player" value="c" onChange={this.handleChange} /> c
                        </label>
                    </div>
                    <button onClick={this.handleSubmit}>Kill</button>
                </div>
            )
        } else if (this.props.role === "seer" && this.state.action) {
            return (
                <div>
                    <p>Pick whose role do you want to observe:</p>
                    {/* Insert player list from server here. This should be separated */}
                    <div>
                        <label>
                            <input type="radio" name="player" value="a" onChange={this.handleChange} /> a
                        </label>
                    
                        <label>
                            <input type="radio" name="player" value="b" onChange={this.handleChange} /> b
                        </label>
                    
                        <label>
                            <input type="radio" name="player" value="c" onChange={this.handleChange} /> c
                        </label>
                    </div>
                    <button onClick={this.handleSubmit}>Observe</button>
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