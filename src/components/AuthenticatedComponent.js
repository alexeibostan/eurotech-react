/**
 * Created by alexei on 26/05/16.
 */
import React from 'react';
import LoginStore from '../stores/LoginStore';
import { withRouter } from 'react-router';


export default (ComposedComponent) => {
    return withRouter(class AuthenticatedComponent extends React.Component {

        

        constructor() {
            super();
            this.state = this._getLoginState();
        }

        _getLoginState() {
            return {
                userLoggedIn: LoginStore.isLoggedIn(),
                user: LoginStore.user,
                pass: LoginStore.pass,
                role: LoginStore.role,
                defaultTopic: LoginStore.defaultTopic
            };
        }

        componentWillMount(){
            if (!LoginStore.isLoggedIn()) {
                this.props.router.replace('/#/login');
            }
            console.log(!LoginStore.isLoggedIn());
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
                    <ComposedComponent
                        {...this.props}
                        user={this.state.user}
                        pass={this.state.pass}
                        role={this.state.role}
                        defaultTopic={this.state.defaultTopic}
                        userLoggedIn={this.state.userLoggedIn}/>
                );

        }
    })
};