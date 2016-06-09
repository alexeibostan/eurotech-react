/**
 * Created by alexei on 24/05/16.
 */
import React from 'react';
import Auth from '../services/AuthService';
import LoginActions from '../actions/LoginActions';
import { Panel, FormControl, Button, Checkbox, Alert } from 'react-bootstrap';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = { pass: '',user: '', alertVisible: false};
    }

    handleUserChange(e) {
       
        this.setState({ user: e.target.value });
        //console.log(e.target.value);

    }

    handlePasswordChange(e) {

        this.setState({
            pass: e.target.value
        });

    }

    handleAlertDismiss(){
        this.setState({alertVisible:false});
    }

    handleAlertShow(){
        this.setState({alertVisible:true});
    }

    handleLogin(e) {
        console.log(this.state.user);
        var showAlert = this.handleAlertShow.bind(this);
        e.preventDefault();
        //location.href = '#/dashboard';
        Auth.login(this.state.user,this.state.pass).then(
            (response)=>{
                console.log('Login Success' + JSON.stringify(response.data));
                LoginActions.loginUser(this.state.user,this.state.pass);
            },

            (error)=>{
                console.error('Login Error ' + JSON.stringify(error));
                showAlert();
            }
        );
    }

    get errorAlert(){
        if (this.state.alertVisible){
            return(
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss.bind(this)}>
                    <strong>Error Login!</strong> Wrong Username or Password.
                </Alert>
            )
        }
    }

    render() {

        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="text-center">
                    <h1 className="login-brand-text">Eurotech Admin</h1>
                </div>
                <Panel header={<h3>Please Sign In</h3>} className="login-panel">

                    <form role="form" onSubmit={this.handleLogin.bind(this)}>
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
                            <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
                        </fieldset>
                    </form>
                    <div className="login-alert-container">
                        {this.errorAlert}
                    </div>
                </Panel>

            </div>
        );
    }
}


