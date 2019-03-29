import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import { Link } from 'react-router-dom';
import http from '../../static/js/server';

class LoginForm extends Component {
    constructor(arg) {
        super(arg);
    }
    login(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.postData(values);
            }
        });
    }
    async postData(config) {
        const res = await http.post('/user/login', config);
        console.log(res);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.login.bind(this)} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入登录密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <div><Button type="primary" block htmlType="submit" className="login-form-button">
                        Log in
                    </Button></div>
                    <div className="flex_between">
                        <Link to="/forget" className="login-form-forgot">Forgot password</Link>
                        <a className='login-form-forgot' onTouchEnd={this.props.isRegister}>register now!</a>
                    </div>
                </Form.Item>
            </Form>
        );
    }
}
const Login = Form.create({ name: 'LoginForm' })(LoginForm);
export default Login;