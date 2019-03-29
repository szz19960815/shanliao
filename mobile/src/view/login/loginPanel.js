import React, { Component } from 'react';
import { Radio } from 'antd';

import Login from './login';
import Register from './register';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LoginPanel extends Component {
    constructor(arg) {
        super(arg);
        this.state = {
            current: 'login'
        };
    }
    onChange(e) {
        this.setState({
            current: e.target.value
        });
        console.log(this.state);
    }
    changeRegister(event){
        console.log(event)
        this.setState({
            current: 'register'
        })
    }
    render() {
        return (
            <div className="panel">
                <RadioGroup onChange={this.onChange.bind(this)} value={this.state.current} className="panelBtn">
                    <RadioButton value="login">登录</RadioButton>
                    <RadioButton value="register">注册</RadioButton>
                </RadioGroup>
                <div className="panelForm">
                    {
                        this.state.current === "login" ? (<Login isRegister={this.changeRegister.bind(this)}></Login>) :
                            this.state.current === "register" ? (<Register></Register>) : false
                    }
                </div>
            </div>
        );
    }
}

export default LoginPanel;