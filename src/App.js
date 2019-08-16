import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';
import './styles/style.css';
import socket from './api/socketConnect';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nick: "", admin: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ nick: e.target.value })
    }

    handleAdmin(e) {
        this.setState({ admin: e });
        console.log(`Your admin status: ${this.state.admin}`);
        ReactDOM.render(<Lobby nick={this.state.nick} admin={this.state.admin} />, document.getElementById('root'));
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
        // retreive admin previleges from server
        socket.on('admin', this.handleAdmin)
    }

    render() {
        return (
            <div className="base">
                <h1>Werewolf Automod</h1>
                <p>Enter your nickname</p>
                <input id="nick" onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Enter</button>
            </div>
        );
    }
}

export default App;
