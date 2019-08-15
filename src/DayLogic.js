import React from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom';
import PlayerList from './PlayerList';
import DaySummary from './DaySummary';

class DayLogic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stage: "", pick: ""}
        this.handleVoteStage = this.handleVoteStage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllVoted = this.handleAllVoted.bind(this);
    }

    // Insert broadcast handler for temporary vote here

    handleVoteStage(e) {
        // Insert broadcast handler for vote stage here
        this.setState({stage: "vote"});
    }

    handleChange(e) {
        this.setState({pick: e});
    }

    handleSubmit(e) {
        // Insert submit selection to server here
        this.setState({stage: "voted"});
    }

    handleAllVoted(e) {
        ReactDOM.render(<DaySummary playerRole={this.props.playerRole}/>, document.getElementById("root"));
    }

    render() {
        if (this.state.stage === "vote") {
            return (
                <div>
                    {/* Could add timer probably? */}
                    <p>Vote who should be hanged:</p>
                    <PlayerList radio={true} handleChange={(e) => this.handleChange(e)}/>
                    <button onClick={this.handleSubmit}>Vote</button>
                    {/* Insert temporary vote results here */}
                </div>
            )
        } else if (this.state.stage === "voted") {
            return (
                <div>
                    {/* Could add timer probably? Or continue after all players voted*/}
                    <p>You have voted {this.state.pick} to be hanged.</p>
                    {/* Insert temporary vote results here */}
                    <button onClick={this.handleAllVoted}>Test AllVoted</button> {/* Test */}
                </div>
            )
        } else {
            return (
                <div>
                    <p>Discuss with all settlers who should be hanged.</p>
                    {/* Could add timer probably? */}
                    <button onClick={this.handleVoteStage}>Test Vote</button>
                </div>
            )
        }
    }
}

export default DayLogic;