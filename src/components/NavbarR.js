/**
 * Created by alexei on 26/05/16.
 */
import React from 'react';
import { hashHistory } from 'react-router';
import LoginActions from '../actions/LoginActions';
import { Navbar,  Nav, NavItem, DropdownButton, MenuItem, Glyphicon, ButtonToolbar } from 'react-bootstrap';

export default class NavbarR extends React.Component{

    constructor(){
        super();
    }
    
    handleLogout(){
        LoginActions.logoutUser();
    }

    handleProfileClick(){
        hashHistory.push('/profile');
    }
    
    render(){
        const profileIcon =function(){return ( <Glyphicon glyph="user" /> );};
        return(
            <Navbar style={{'margin':'0px'}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/dashboard">Eurotech-React</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem>
                        <DropdownButton  eventKey={3} title={profileIcon()} id="dropdown-size-medium">
                            <MenuItem eventKey={3.1} onClick={this.handleProfileClick.bind(this)}>
                                <Glyphicon glyph="user" /> User Profile
                            </MenuItem>
                            <MenuItem eventKey={3.2}>
                                <Glyphicon glyph="cog" /> Settings
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick={this.handleLogout.bind(this)} >
                                <Glyphicon glyph="log-out" /> Logout
                            </MenuItem>
                        </DropdownButton>
                        </NavItem>
                </Nav>
            </Navbar>
        );
    }
}