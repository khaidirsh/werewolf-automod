import React from 'react';
import './styles/style.css';
import NightLogic from './NightLogic'

class Night extends React.Component {
    constructor(props) {
        super(props);
    }
    
    // Insert night counter handler here..

    render() {
        return (
            <div className="base">
                <h1>Night x</h1> {/* x supposed to be changed with counter from the server */}
                <NightLogic playerRole={this.props.playerRole} />
            </div>
        )
    }
}

export default Night;