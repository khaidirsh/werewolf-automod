import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';
import './styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={nick: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({nick: e.target.value})
  }

  handleSubmit(e) {
    if (this.state.nick) {
      ReactDOM.render(<Lobby nick={this.state.nick} />, document.getElementById('root'));
      e.preventDefault();
    } else {
      alert("You have to enter your nickname.");
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="base">
        <h1>Werewolf Automod</h1>
        <p>Enter your nickname</p>
        <input id="nick" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Enter</button>
      </div>
    );
  }
}

export default App;
