/**
 * Created by alexei on 24/06/16.
 */
import React from "react";
import AuthenticatedComponent from '../AuthenticatedComponent';
import UserCloud from '../UserCloud';
import AlertCustom from '../AlertCustom';
import UsersTable from '../UsersTable';
import {Row, Col, Panel, PageHeader, FormGroup, ControlLabel, FormControl} from "react-bootstrap";

export default AuthenticatedComponent( class Users extends React.Component {

    constructor() {
        super();

    }
    render(){
        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <AlertCustom />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <PageHeader> Users </PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <UsersTable />
                    </Col>
                </Row>
            </div>
        )
    }
});