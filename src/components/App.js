/**
 * Created by alexei on 24/05/16.*/
//'use strict';
import React from 'react';
import LoginStore from '../stores/LoginStore'
import { Route, Link } from 'react-router';
import NavbarR from './NavbarR';
import SidebarMenu from './SidebarMenu';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = this._getLoginState();
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
        return (
            <div>
                <NavbarR/>
                <SidebarMenu />
                <div className="page-wrapper">
                {this.props.children}
                </div>
           </div>
    );
    }


    
}