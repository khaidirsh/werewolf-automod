import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import Night from './Night';

class SeerObserve extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackToSleep = this.handleBackToSleep.bind(this);
    }
    
    handleBackToSleep(e) {
        ReactDOM.render(<Night playerRole="seer"/>, document.getElementById("root")); // get back to sleep
    }

    render() {
        return (
            <div className="base">
                <h1>{this.props.actionAt} is a "ROLE"</h1> {/* get "ROLE" from server */}
                <button onClick={this.handleBackToSleep}>Continue</button>
            </div>
        )
    }
}

export default SeerObserve;