import React,{Component} from 'react';

import LoginPanel from './loginPanel';

import './login.css';

class Login extends Component {
    render(){
        return (<div className="wrap" id="login">
           <LoginPanel></LoginPanel>
        </div>);
    }
}

export default Login;