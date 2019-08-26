import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';
import './styles/style.css';
import socket from './api/socketConnect';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nick: "", master: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleMaster = this.handleMaster.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ nick: e.target.value })
    }

    handleMaster(e) {
        this.setState({ master: e });
        console.log(`Your master status: ${this.state.master}`);
        ReactDOM.render(<Lobby master={this.state.master} />, document.getElementById('root'));
    }

    handleSubmit(e) {
        if (this.state.nick) {
            // send nick to server
            socket.emit("nick", this.state.nick);

            e.preventDefault();
        } else {
            alert("You have to enter your nickname.");
            e.preventDefault();
        }
    }

    componentDidMount() {
        // add listener to retreive admin previleges from server
        socket.on('master', this.handleMaster);
    }

    componentWillUnmount() {
        // remove listener
        socket.off('master');
    }

    render() {
        return (
            <div className="base">
                <h1>Werewolf Automod</h1>
                <p>Enter your nickname</p>
                <form>
                    <input id="nick" onChange={this.handleChange} />
                    <input type="submit" value="Enter" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default App;
