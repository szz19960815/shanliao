import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { InputItem, List, Checkbox, Flex, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import * as axios from 'axios';

import '../../static/iconfont/iconfont.css';
// import http from '../../static/js/server';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class LoginForm extends Component {
    // static contextTypes = {
    //     router: PropTypes.object.isRequired,
    // }
    constructor(arg) {
        super(arg);
        this.state = {
            isusername: "",
            ispass: "",
            remember: true,
            userError: false,
            passError: false,
            username: "",
            pass: ""
        }
    }
    async postData() {
        // console.log(this.state);
        let config = {
            username: this.state.username,
            pass: this.state.pass
        }
        if (config.username == "") {
            Toast.fail("User name cannot be empty", 3, () => { }, true);
            return;
        }
        if (config.pass == "") {
            Toast.fail("Password name cannot be empty", 3, () => { }, true);
            return;
        }
        axios.post("/users/login", config).then((res) => {
            if (res.code === 1) {
                Toast.success("success", 1, () => { this.props.history.push('/index'); }, true);
                if (this.state.remember) {
                    let value = {
                        userId: res.data.userId,
                        username: res.data.username,
                        time: new Date().getTime()
                    }
                    localStorage.setItem("username", JSON.stringify(value));
                }
            } else {
                Toast.fail(res.msg, 3, () => { }, true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    changeUser(username) {
        this.setState({
            username,
        });
    }
    changePass(pass) {
        this.setState({
            pass,
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <List className="loginList">
                    <InputItem
                        {...getFieldProps('inputtitle2')}
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        clear
                        maxLength="16"
                        onFocus={() => { this.setState({ isusername: 'active' }) }}
                        onBlur={() => { this.setState({ isusername: '' }) }}
                        onChange={this.changeUser.bind(this)}
                        error={this.state.userError}
                        onErrorClick={this.state.userError ? Toast.info('Please enter the correct user name') : false}
                    >
                        <i className={"iconfont icon-yonghuming " + this.state.username} style={{ color: "#108ee9" }}></i>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="password"
                        value={this.state.pass}
                        clear
                        maxLength="16"
                        onFocus={() => { this.setState({ ispass: 'active' }) }}
                        onBlur={() => { this.setState({ ispass: '' }) }}
                        onChange={this.changePass.bind(this)}
                        onErrorClick={this.state.passError ? Toast.info('Please enter the correct password') : false}
                    >
                        <i className={"iconfont icon-mima " + this.state.pass} style={{ color: "#108ee9" }}></i>
                    </InputItem>

                </List>
                <Flex>
                    <Flex.Item>
                        <AgreeItem checked={this.state.remember} style={{ marginLeft: '0' }} data-seed="logId" onChange={() => { this.setState({ remember: !(this.state.remember) }) }}>
                            <span style={{ fontSize: ".6rem" }}>Remember me</span>
                        </AgreeItem>
                    </Flex.Item>
                </Flex>
                <Button onClick={this.postData.bind(this)} size="small" className="loginBtn" type="primary">Login</Button>
            </div>
        );
    }
}
const Login = withRouter(createForm()(LoginForm));
export default Login;