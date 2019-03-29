import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from '../view/index/index';
import Login from '../view/login/index';
import Forget from '../view/login/fotget';

class RouterIndex extends Component {
    render(){
        return (
            <Switch>
                <Route path="/" exact render={()=>(
                    <Redirect to="/login" />
                )} />
                <Route path="/login" component={Login}></Route>
                <Route path="/forget" component={Forget}></Route>
                <Route path="/index" component={Index} />
            </Switch>
        );
    }
}

export default RouterIndex;