import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import PersonalPage from "./Pages/PersonalPage";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/lk" component={PersonalPage} />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
