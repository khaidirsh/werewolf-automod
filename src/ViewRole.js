import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import ViewRoleLogic from './ViewRoleLogic';
import Night from './Night';

import socket from './api/socketConnect';

class ViewRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, allReady: false};
        this.handleReady = this.handleReady.bind(this);

        // For test button
        // this.handleAllReady = this.handleAllReady.bind(this);
    }

    handleReady(e) {
        this.setState({ready: e});
        socket.emit('ready');
    }

    // For test button
    /* handleAllReady(e) {
        // If server sends "all players ready" signal
        this.setState({allReady: true});
    } */

    componentDidMount() {
        // Add socket listener for all player ready
        socket.on('all ready', () => {
            this.setState({allReady: true})
        })
    }

    componentDidUpdate() {
        if (this.state.ready && this.state.allReady) { // check if all other players including the player itself ready
            setTimeout(() => {
                ReactDOM.render(<Night playerRole={this.props.playerRole} />, document.getElementById("root")); // move to Night stage
            }, 3000)
        }
    }

    componentWillUnmount() {
        // Remove socket listener
        socket.off('all ready');
    }

    render() {
        if (this.state.ready) {
            return (
                <div className="base">
                    <h1>Waiting for other players...</h1>
                    {/* Test button */}
                    {/* <button onClick={this.handleAllReady}>Test All Ready</button>*/}
                </div>
            )
        } else {
            return (
                <ViewRoleLogic playerRole={this.props.playerRole} ready={(e) => this.handleReady(e)} />
            )
        }
    }
}

export default ViewRole;