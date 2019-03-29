import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

import Login from './login';
import Register from './register';

const tabs = [
    { title: "Login" },
    { title: "Register" },
];


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
    changeRegister(event) {
        console.log(event)
        this.setState({
            current: 'register'
        })
    }
    render() {
        return (
            <div className="panel">
                <Tabs tabs={tabs} className="panelBtn" swipeable={false}>
                    <div className="panelForm">
                        <Login isRegister={this.changeRegister.bind(this)}></Login>
                    </div>
                    <div className="panelForm">
                        <Register></Register>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default LoginPanel;