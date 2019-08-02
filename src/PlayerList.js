import React from 'react';
import './styles/style.css';

class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Insert player list from server here.
    // Insert function to include or exclude self.
    // Insert formatting builder here for radio button, or just list.

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