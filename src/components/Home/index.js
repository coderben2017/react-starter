import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Button, Dropdown, message, Popconfirm } from 'antd';

import Nav from '../Nav';
import SiderLeft from '../SiderLeft';
import School from '../School';
import Student from '../Student';
import User from '../User';
import Page404 from '../Page404';

import './index.css';
import logo from '../../assets/logo.png';

const { Header, Content } = Layout;

/**
 * 退出登录确定按钮点击事件
 */
function handleLogoutConfirm() {
  window.location.href = '/login';
}

/**
 * 账户下拉菜单点击事件
 * @param e 事件对象
 */
function handleAccountMenuClick(e) {
  message.info(e.key);
}

/**
 * 账户下拉菜单
 */
const AccountMenu = (
  <Menu onClick={handleAccountMenuClick}>
    <Menu.Item key="1">
      <Icon type="snippets" />账户信息
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" />
      <Popconfirm placement="top" title="确定退出登录吗？" onConfirm={handleLogoutConfirm} okText="确定" cancelText="取消">
        退出
      </Popconfirm>
    </Menu.Item>
  </Menu>
);

export default ({location}) => (
  <Layout style={{ minHeight: window.innerHeight }}>
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Nav path={location.pathname.slice(1)}></Nav>
      <div className="account">
        <Dropdown overlay={AccountMenu}>
          <Button type="dashed" size="large">
            <Icon type="user" /> 管理员 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </Header>
    <Layout>
      <SiderLeft/>
      <Layout className="layout-content">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="content">
          <Switch>
            <Redirect exact from="/" to="/school"></Redirect>
            <Route exact path="/school" component={School}></Route>
            <Route exact path="/student" component={Student}></Route>
            <Route exact path="/user" component={User}></Route>
            <Route component={Page404}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
)
