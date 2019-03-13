import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { message } from 'antd';

import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

const casUser = sessionStorage.getItem('casUser');

/**
 * 私有路由组件
 */
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {
        props => Auth.isAuthenticated ? <Component {...props} /> : <Redirect to={{pathname: '/login',}}/>
      }
    />
  )
};

/**
 * 权限控制
 */
export const Auth = {
  isAuthenticated: Boolean(casUser),

  authenticate(callback = () => {}) {
    this.isAuthenticated = true;
    callback();
  },

  signout(callback = () => {}) {
    this.isAuthenticated = false;
    callback();
  }
};

const App = () => {
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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </BrowserRouter >
  )
};

export default App;
