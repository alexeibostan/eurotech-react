/**
 * Created by alexei on 24/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import App from './components/App'
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Base from './components/Base';
import Devices from './components/pages/Devices';
import Charts from './components/pages/Charts';
import Device from './components/pages/Device';
import Profile from './components/pages/Profile';

var routes = (
    <Route path="/" component={Base}>
        <IndexRedirect to="/login" />
        <Route name="login" path="/login"  component={Login} />
        <Route name="registration" path="/registration"  component={Registration} />
        <Route name="dashboard" path="/dashboard" component={App}>
            <IndexRoute name="home"  component={Home} />
            <Route name="devices" path="/devices" component={Devices}/>
            <Route name="device" path="/device/:clientId" component={Device}/>
            <Route name="charts" path="/charts" component={Charts}/>
            <Route name="profile" path="/profile" component={Profile}/>
        </Route>
    </Route>
);

var router =  (
    <Router history={hashHistory} >{routes}</Router>
);



ReactDOM.render(router, document.getElementById('app'));
