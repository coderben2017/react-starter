import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Button, Dropdown, Popconfirm } from 'antd';

import './Home.css';
import logo from '../../assets/logo.png';
import { Auth } from '../../App';

import Nav from '../Nav/Nav';
import SiderLeft from '../SiderLeft/SiderLeft';
import School from '../School/School';
import Student from '../Student/Student';
import User from '../User/User';
import Page404 from '../Page404/Page404';

const { Header, Content } = Layout;

/**
 * 退出登录确定按钮点击事件
 */
function handleLogoutConfirm() {
  Auth.signout(() => {
    const schoolCode = sessionStorage.getItem('schoolCode');
    sessionStorage.clear();
    window.location.href = `/login?sc=${schoolCode}`;
    // window.location.href = 'http://ms.do-ok.com:7000';
  });
}

/**
 * 账户菜单点击事件
 * @param e 事件对象
 */
function handleAccountMenuClick(e) {
  console.log(e.key);
}

/**
 * 账户菜单组件
 */
const AccountMenu = (
  <Menu>
    <Menu.Item key="1" onClick={handleAccountMenuClick}>
      <Icon type="snippets" />我的账户
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" />
      <Popconfirm placement="top" title="确定退出登录吗？" onConfirm={handleLogoutConfirm} okText="确定" cancelText="取消">
        退出应用
      </Popconfirm>
    </Menu.Item>
  </Menu>
);

export default ({location}) => (
  <Layout style={{minHeight: window.innerHeight}}>
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Nav path={location.pathname.slice(1)}></Nav>
      <div className="account">
        <Dropdown overlay={AccountMenu}>
          <Button htmlType={'button'} type="dashed" size="large">
            <Icon type="user" /> 管理员 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </Header>
    <Layout>
      <SiderLeft/>
      <Layout className="layout-content">
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
