import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './components/home';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter >
    );
  }
}

export default App;
