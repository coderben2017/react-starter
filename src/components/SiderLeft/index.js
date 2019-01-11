import React, { Component } from 'react';
import { Menu, Layout, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class Index extends Component {
  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          className="menu-side"
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
            <Menu.Item key="1">option1</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
