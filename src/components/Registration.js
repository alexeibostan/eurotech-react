/**
 * Created by alexei on 15/06/16.
 */
import React from 'react';
import UserService from '../services/AuthService';
import LoginActions from '../actions/LoginActions';
import AlertCustom from './AlertCustom';
import AlertCustomActions from '../actions/AlertCustomActions';
import { Panel, FormControl, Button, Alert } from 'react-bootstrap';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { pass: '',user: ''};
    }

    handleUserChange(e) {

        this.setState({
            user: e.target.value
        });

    }

    handlePasswordChange(e) {

        this.setState({
            pass: e.target.value
        });

    }

    handleRegistration(e) {
        e.preventDefault();
        UserService.register(this.state.user,this.state.pass).then(
            (response) => {
                if (response.data.error){
                    var alertOtions = {
                        style:'danger',
                        strongMsg:'Register Error!',
                        message: response.data.message
                    };
                    AlertCustomActions.setAlertOn(alertOtions);
                }
                else {
                    LoginActions.loginUser(this.state.user, this.state.pass);
                }
            },
            (error) => { console.error(error); }
        )

    }


    render() {

        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="text-center">
                    <h1 className="login-brand-text">Eurotech Admin</h1>
                </div>
                <Panel header={<h3>Please Register</h3>} className="login-panel">

                    <form role="form" onSubmit={this.handleRegistration.bind(this)}>
                        <fieldset>
                            <div className="form-group">
                                <FormControl
                                    onChange={this.handleUserChange.bind(this)}
                                    placeholder="Username"
                                    type="text"
                                    autofocus=""
                                    name="username" />
                            </div>

                            <div className="form-group">
                                <FormControl
                                    onChange={this.handlePasswordChange.bind(this)}
                                    placeholder="Password"
                                    type="password"
                                    name="password" />
                            </div>
                            <Button type="submit" bsSize="large" bsStyle="success" block>Register</Button>
                        </fieldset>
                    </form>
                    <div className="login-alert-container">
                        <AlertCustom/>
                    </div>
                </Panel>

            </div>
        );
    }
}