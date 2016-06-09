/**
 * Created by alexei on 24/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import App from './components/App'
import Login from './components/Login';
import Home from './components/Home';
import Base from './components/Base';
import Devices from './components/pages/Devices';
import Charts from './components/pages/Charts';
import Device from './components/pages/Device';

var routes = (
    <Route path="/" component={Base}>
        <IndexRedirect to="/login" />
        <Route name="login" path="/login"  component={Login} />
        <Route name="dashboard" path="/dashboard" component={App}>
            <IndexRoute name="home"  component={Home} />
            <Route name="devices" path="/devices" component={Devices}/>
            <Route name="device" path="/device/:clientId" component={Device}/>
            <Route name="charts" path="/charts" component={Charts}/>
        </Route>
    </Route>
);

var router =  (
    <Router history={hashHistory} >{routes}</Router>
);

/*let jwt = localStorage.getItem('jwt');
if (jwt) {
    LoginActions.loginUser(jwt);
}*/

ReactDOM.render(router, document.getElementById('app'));
