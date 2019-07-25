import React from 'react';
import './App.css';

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
    alert(`You've submitted ${this.state.nick}.`)
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <h1>Werewolf Automod</h1>
        <p>Enter your nickname</p>
        <form onSubmit={this.handleSubmit}>
          <input id="nick" onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
