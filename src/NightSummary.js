import React from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom';
import Day from './Day';

class NightSummary extends React.Component {
    constructor(props) {
        super(props);
        this.handleContinue = this.handleContinue.bind(this);

        // Fetch killed person and their role from server
    }

    handleContinue(e) {
        ReactDOM.render(<Day playerRole={this.props.playerRole}/>, document.getElementById("root"));
    }

    render() {
        return (
            /* if (someoneKilled) {
                Someone is killed at night.
            } else {
                No one is killed at night.
            } */

            // Placeholder:
            <div className="base">
                <h1>X is killed at night. X is a xxx.</h1> {/* x supposed to be changed with condition from the server */}
                <button onClick={this.handleContinue}>Continue</button>
            </div>
        )
    }
}

export default NightSummary;