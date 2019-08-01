import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import ViewRoleLogic from './ViewRoleLogic';
import Night from './Night';

class ViewRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ready: false, allReady: false};
        this.handleReady = this.handleReady.bind(this);
        this.handleAllReady = this.handleAllReady.bind(this);
    }

    handleReady(e) {
        this.setState({ready: e});
    }

    handleAllReady(e) {
        // If server sends "all players ready" signal
        this.setState({allReady: true});
    }

    componentDidUpdate() {
        if (this.state.ready && this.state.allReady) {
            ReactDOM.render(<Night role={this.props.role} />, document.getElementById("root"));
        }
    }

    render() {
        if (this.state.ready) {
            return (
                <div className="base">
                    {/* Wait for "all players ready" signal to continue */}
                    <h1>Waiting for other players...</h1>
                    <button onClick={this.handleAllReady}>Test All Ready</button> {/* Test */}
                </div>
            )
        } else {
            return (
                <ViewRoleLogic role={this.props.role} ready={(e) => this.handleReady(e)} />
            )
        }
    }
}

export default ViewRole;