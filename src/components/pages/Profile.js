/**
 * Created by alexei on 15/06/16.
 */
import React from "react";
import AuthenticatedComponent from '../AuthenticatedComponent';
import UserCloud from '../UserCloud';
import AlertCustom from '../AlertCustom';
import {Row, Col, Panel, PageHeader, FormGroup, ControlLabel, FormControl} from "react-bootstrap";

export default AuthenticatedComponent( class Charts extends React.Component {

    constructor(){
        super();

    }




    render(){


        return(
            <div>
                <Row>
                    <Col lg={12}>
                        <AlertCustom/>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <PageHeader> Profile </PageHeader>
                    </Col>
                </Row>

                <Row>
                    <Col lg={4}>
                        <Panel header="User Credentials">
                            <form>
                                <FormGroup controlId="formControlsUsername">
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl type="text" placeholder="Enter username"  value={this.props.user}/>
                                </FormGroup>
                                <FormGroup controlId="formControlsPassword">
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl type="password" value={this.props.pass} />
                                </FormGroup>
                            </form>
                        </Panel>
                    </Col>
                    <Col lg={4}>
                        <UserCloud />
                    </Col>
                </Row>
            </div>
        )
    }

})