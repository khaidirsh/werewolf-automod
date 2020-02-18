import React from 'react';
import './styles/style.css';
import socket from './api/socketConnect';

class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {players: []}

        // request player list to server
        socket.emit('players', (list) => {
            this.setState({players: list})
        })
    }

    handleChange(e) {
        this.props.handleChange(e.target.value);
    }
    
    // Insert player list from server here.
    // Insert function to include or exclude self.
    // Insert formatting builder here for radio button, or just list.
    // Insert function to add "no one" to pick.

    render() {
        // Placeholder
        if(this.props.radio) {
            return (
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
            )
        } else {
            return (
                <ul>
                    <li>a</li> 
                    <li>b</li>
                    <li>c</li>
                </ul>
            )
        }
    }
}

export default PlayerList;