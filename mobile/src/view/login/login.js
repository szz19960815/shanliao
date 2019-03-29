import React, { Component } from 'react';
import { InputItem, List, WhiteSpace, Checkbox, Flex, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import * as axios from 'axios';

import '../../static/iconfont/iconfont.css';
// import http from '../../static/js/server';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class LoginForm extends Component {
    constructor(arg) {
        super(arg);
        this.state = {
            isusername: "",
            ispass: "",
            remember: true
        }
    }
    async postData(config) {
        console.log(this.props)
        // axios.post("/users/login", config).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
    onChange = (e) => {
        console.log(e);
    }
    render() {
        const { getFieldProps } = this.props.form;
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];
        return (
            <div>
                <WhiteSpace />
                <List className="loginList">
                    <InputItem
                        {...getFieldProps('inputtitle2')}
                        placeholder="username"
                        clear
                        maxLength="16"
                        onFocus={() => { this.setState({ isusername: 'active' }) }}
                        onBlur={() => { this.setState({ isusername: '' }) }}
                    >
                        {/* <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} /> */}
                        <i className={"iconfont icon-yonghuming " + this.state.username} style={{ color: "#108ee9" }}></i>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="password"
                        onFocus={() => { this.setState({ ispass: 'active' }) }}
                        onBlur={() => { this.setState({ ispass: '' }) }}
                    >
                        <i className={"iconfont icon-mima " + this.state.pass} style={{ color: "#108ee9" }}></i>
                    </InputItem>

                </List>
                <Flex>
                    <Flex.Item>
                        <AgreeItem checked={this.state.remember} data-seed="logId" onChange={() => { this.setState({ remember: !(this.state.remember) }) }}>
                            <span style={{ fontSize: ".6rem" }}>Remember me</span>
                        </AgreeItem>
                    </Flex.Item>
                </Flex>
                <Button onClick={this.postData.bind(this)} size="small" className="loginBtn" type="primary">Login</Button>
            </div>
        );
    }
}
const Login = createForm()(LoginForm);
export default Login;