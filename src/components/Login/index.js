import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message, Layout } from 'antd';
import axios from 'axios';
import qs from 'qs';

import { URLConfig } from '../../utils/config';
import { Auth } from '../../App';
import './index.css';

const $http = axios.create({
  baseURL: URLConfig.commonUrl,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});

class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleRememberChange = (e) => {
    console.log(e.target.checked)
  }

  handleForgetPasswordClick = (e) => {
    e.preventDefault();
    message.info('请联系管理员重置密码');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem('schoolCode')) {
      message.error('请检查地址栏是否填写了schoolCode');
      return;
    }
    $http
      .post('/api/user/v1/login', qs.stringify({
        username: this.state.username,
        password: this.state.password,
        schoolCode: sessionStorage.getItem('schoolCode')
      }))
      .then(({data}) => {
        const {commonInfo, studentInfo, teacherInfo} = data;
        sessionStorage.setItem('user', JSON.stringify(commonInfo.user));
        sessionStorage.setItem('casUser', commonInfo.user.loginName);
        sessionStorage.setItem('studentInfo', JSON.stringify(studentInfo));
        sessionStorage.setItem('teacherInfo', JSON.stringify(teacherInfo));
        axios.defaults.headers.common['Authorization'] = commonInfo.jwt;
        Auth.authenticate(() => {
          this.setState({
            redirectToReferrer: true
          });
        });
      })
  }

  render() {
    let { from } = this.props.location.state || {from: {pathname: "/"}};
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <Layout style={{height: window.innerHeight}}>
        <h1 style={{textAlign: 'center'}}>登录校云</h1>
        <Form style={{maxWidth: '300px', margin: '0 auto'}}>
          <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onChange={this.handleUsernameChange} />
          </Form.Item>
          <Form.Item>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={this.handlePasswordChange} />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={this.handleRememberChange}>记住我</Checkbox>
            <a href="/" style={{float: "right", color: '#1890ff'}} onClick={this.handleForgetPasswordClick}>忘记密码？</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" style={{width: '100%'}} onClick={this.handleSubmit}>
              立即登录
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
