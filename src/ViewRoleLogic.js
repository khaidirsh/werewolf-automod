import React from 'react';
import './styles/style.css';

class ViewRoleLogic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {viewed: false};
        this.handleShowRole = this.handleShowRole.bind(this);
        this.handleReady = this.handleReady.bind(this);
    }

    handleShowRole(e) {
        this.setState({viewed: true});
    }

    handleReady(e) {
        this.props.ready(true); // Change ViewRole ready state
    }

    render() {
        let playerRole = {};
        switch(this.props.role) {
            case "werewolf":
                playerRole.name = "Werewolf";
                playerRole.desc = "You are allowed to kill 1 person each night. You have to stay alive until the end of the game to win. Deceive other people to make them believe that you are one of them.";
                break;
            case "seer":
                playerRole.name = "Seer";
                playerRole.desc = "You are allowed to see the role of 1 person each night. Persuade other commoners to make them believe that you know who is whom. Don't let Werewolf know that you are Seer, or your life will be in danger.";
                break;
            case "villager":
                playerRole.name = "Villager";
                playerRole.desc = "Just a commoner. Participate in voting, but be careful you might kill another Villager or even the key role Seer."
                break;
            default:
                throw Error;
        };

        if (this.state.viewed) {
            return (
                <div className="base">
                    <h1>You are a {playerRole.name}</h1>
                    <p>{playerRole.desc}</p>
                    <button onClick={this.handleReady}>OK</button>
                </div>
            )
        } else {
            return (
                <div className="base">
                    <h1>You have received your role.</h1>
                    <button onClick={this.handleShowRole}>Show my role</button>
                </div>
            )
        }
    }
}

export default ViewRoleLogic;