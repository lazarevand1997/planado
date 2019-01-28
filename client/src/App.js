import React, { Component } from 'react';
import './App.css';

class App extends Component {
    state = {
        text: ''
      }

    fetchString = async () => {
        const response = await fetch(`/api`);
        const initial = await response.json()
        const hitext = initial.text;
        this.setState({ text: hitext });
      }

    componentDidMount() {
      this.fetchString();
    }

  render() {
    return (
      <div className="App">
        Hello, this is my react front.<br/>
        <code>{this.state.text}</code>
      </div>
    );
  }
}

export default App;
