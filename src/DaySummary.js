import React from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom';
import Night from './Night';

class DaySummary extends React.Component {
    constructor(props) {
        super(props);
        this.handleContinue = this.handleContinue.bind(this);

        // Fetch vote result from server.
        // Fetch killed person and their role from server
    }

    handleContinue(e) {
        ReactDOM.render(<Night playerRole={this.props.playerRole}/>, document.getElementById("root"));
    }

    componentDidMount() {
        /* if (tiebreaker) {
            setState({tiebreaker: true})
        } */
    }

    render() {
        /* if (this.state.tiebreaker) {
            return <Tiebreaker />
        } else {*/
        return (
            // Placeholder:
            <div className="base">
                <h1>X is hanged. X is a xxx</h1> {/* x supposed to be changed with name and role from server */}
                <button onClick={this.handleContinue}>Continue</button>
            </div>
        )
    }
}

export default DaySummary;