import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { message } from 'antd';

import './App.css';
import Login from './components/Login';
import Home from './components/Home';

/**
 * 权限控制
 */
export const Auth = {
  isAuthenticated: false,

  authenticate(callback = () => {}) {
    this.isAuthenticated = true;
    callback();
  },

  signout(callback = () => {}) {
    this.isAuthenticated = false;
    callback();
  }
};

/**
 * 私有路由组件
 */
function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render = {props =>
        Auth.isAuthenticated
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
      }
    />
  );
}

export default class App extends Component {
  componentWillMount() {
    // 配置schoolCode
    const boorSchoolCode = sessionStorage.getItem('schoolcode');
    if (boorSchoolCode) {
      sessionStorage.setItem('schoolCode', boorSchoolCode);
    } else {
      const href = window.location.href;
      const idx = href.indexOf('sc=') + 3;
      const sc = href.slice(idx);
      sessionStorage.setItem('schoolCode', Number(sc) ? sc : '');
    }

    // 配置message提示
    message.config({
      maxCount: 3, // 最大提示条数
      duration: 2  // 消失延迟时间（秒）
    });
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </BrowserRouter >
    );
  }
}