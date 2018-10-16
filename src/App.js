import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home}></Route>
    </Switch>
  </BrowserRouter >
);