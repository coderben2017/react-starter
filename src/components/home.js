import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Button, Breadcrumb } from 'antd';

import { NavTabs } from './nav-tabs';
import School from './school';
import Student from './student';
import User from './user';

import '../styles/base.css';
import logo from '../logo.svg';

const { Header, Content }  = Layout;

export const Home = () => (
  <Layout>
    <Header className="header">
      <div><img src={logo} alt="logo" /><h1><a href="#top">学校管理系统</a></h1></div>
      <NavTabs className="nav" path={window.location.pathname.slice(1)}></NavTabs>
      <Button type="ghost" size="large">Logout</Button>
    </Header>
    <Content className="content">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Switch>
        <Route exact path="/school" component={School}></Route>
        <Route exact path="/student" component={Student}></Route>
        <Route exact path="/user" component={User}></Route>
        <Redirect from="/" to="/school"></Redirect>
      </Switch>
    </Content>
  </Layout>
);