/**
 * Created by alexei on 27/05/16.
 */
import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

export default class SidebarMenu extends React.Component{

    constructor(){
        super();
    }

    render(){
        var navItemNodes = function () {
            switch (this.props.role){
                case 'Client':
                    return (
                    <Nav bsStyle="pills" stacked  >
                        <NavItem eventKey={1} href='/#/dashboard'><Glyphicon glyph="dashboard" /> Dashboard </NavItem>
                        <NavItem eventKey={2} href='/#/charts' ><i class="fa fa-pie-chart" aria-hidden="true"/> Charts </NavItem>
                        <NavItem eventKey={5} disabled>NavItem 3 content</NavItem>
                    </Nav>
                    );
                    break;
                case 'Manager':
                    return (
                        <Nav bsStyle="pills" stacked  >
                            <NavItem eventKey={1} href='/#/dashboard'><Glyphicon glyph="dashboard" /> Dashboard </NavItem>
                            <NavItem eventKey={2} href='/#/charts' ><i class="fa fa-pie-chart" aria-hidden="true"/> Charts </NavItem>
                            <NavItem eventKey={3} href='/#/devices' ><Glyphicon glyph="phone" /> Devices </NavItem>
                            <NavItem eventKey={5} disabled>NavItem 3 content</NavItem>
                        </Nav>
                    );
                    break;
                case 'Admin':
                    return (
                        <Nav bsStyle="pills" stacked  >
                            <NavItem eventKey={1} href='/#/dashboard'><Glyphicon glyph="dashboard" /> Dashboard </NavItem>
                            <NavItem eventKey={2} href='/#/charts' ><i class="fa fa-pie-chart" aria-hidden="true"/> Charts </NavItem>
                            <NavItem eventKey={3} href='/#/devices' ><Glyphicon glyph="phone" /> Devices </NavItem>
                            <NavItem eventKey={4} href='/#/users' ><Glyphicon glyph="user" /> Users </NavItem>
                            <NavItem eventKey={5} disabled>NavItem 3 content</NavItem>
                        </Nav>
                    );
                    break;
            }
        }.bind(this);
        return (
            <div className="sidebar sidebar-menu">
                {navItemNodes()}
            </div>
        );
    }
}