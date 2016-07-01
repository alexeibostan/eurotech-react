/**
 * Created by alexei on 24/06/16.
 */
import React from 'react';
import UsersTableStore from '../stores/UsersTableStore';
import UserService from '../services/UserService';
import UsersTableActions from '../actions/UsersTableActions';
import UserRoleDropdown from './UserRoleDropdown';
import Loader from 'react-loader';
import { Table, Panel } from 'react-bootstrap';


export  default class UsersTable extends React.Component {

    constructor(){
        super();
        this.state = {
            data: this.getDataState(),
            isLoaded: this.getLoadedState()
        };
        this._onChange = this._onChange.bind(this);
    }

    getDataState(){
        return UsersTableStore.data;
    }
    getLoadedState(){
        return UsersTableStore.isLoaded;
    }

    componentDidMount() {
        UsersTableStore.addChangeListener(this._onChange);

        if (this.state.data.length === 0) {
            UserService.getAllUsers().then(
                (response) => {
                    console.log(response.data);
                    UsersTableActions.getData(response.data.users);
                },
                (error) => {
                    console.error(JSON.stringify(error));
                }
            );

        }
    }


    componentWillUnmount() {
        UsersTableStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({isLoaded: this.getLoadedState()});
    }



    render(){

        var usersNodes = this.state.data.map((user)=> {
            return (

                <tr key={user._id} >
                    <td>{user.username}</td>
                    <td>
                        <UserRoleDropdown role={user.roles} username={user.username}/>
                    </td>
                    <td>{user.cloudUsername}</td>
                </tr>
            )
        });

        return(
            <Panel header="Users Table">
                <Loader loaded={this.state.isLoaded}>
                    <Table responsive hover condensed >
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>User Cloud</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersNodes}
                        </tbody>
                    </Table>
                </Loader>
            </Panel>
        );

    };
}