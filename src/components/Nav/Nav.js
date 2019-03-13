import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import './Nav.css';

export default ({path}) => (
  <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[path]}>
    <Menu.Item key="school">
      <Link to="/school">学校管理</Link>
    </Menu.Item>
    <Menu.Item key="student">
      <Link to="/student">学生管理</Link>
    </Menu.Item>
    <Menu.Item key="user">
      <Link to="/user">用户管理</Link>
    </Menu.Item>
  </Menu>
)
