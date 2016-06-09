/**
 * Created by alexei on 27/05/16.
 */
import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

export default class SidebarMenu extends React.Component{

    render(){
        return (
            <div className="sidebar sidebar-menu">
            <Nav bsStyle="pills" stacked  >
                <NavItem eventKey={1} href='/#/dashboard'><Glyphicon glyph="dashboard" /> Dashboard </NavItem>
                <NavItem eventKey={2} href='/#/charts' ><i class="fa fa-pie-chart" aria-hidden="true"/> Charts </NavItem>
                <NavItem eventKey={2} href='/#/devices' ><Glyphicon glyph="phone" /> Devices </NavItem>
                <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
            </Nav>
                </div>
        );
    }
}