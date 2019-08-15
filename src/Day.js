import React from 'react';
import './styles/style.css';
import DayLogic from './DayLogic';

class Day extends React.Component {
    constructor(props) {
        super(props);
    }

    // Insert day counter handler here..

    render() {
        return (
            <div className="base">
                <h1>Day x</h1> {/* x supposed to be changed with counter from the server */}
                <DayLogic playerRole={this.props.playerRole}/>
            </div>
        )
    }
}

export default Day;