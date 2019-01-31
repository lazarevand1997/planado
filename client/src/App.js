import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/admin" component={HomePage} />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
