/**
 * Created by alexei on 15/06/16.
 */
import React from "react";
import UserCloudStore from '../stores/UserCloudStore';
import UserService from '../services/UserService';
import AlertCustom from './AlertCustom';
import AlertCustomActions from '../actions/AlertCustomActions';
import UserCloudActions from '../actions/UserCloudActions';
import { Button, Panel, FormGroup, ControlLabel, FormControl, Table } from "react-bootstrap";

export default class UserCloud extends React.Component {
    constructor(){
        super();
        this.state = {
            userCloud: this.getUserCloudState(),
            passCloud: this.getPassCloudState(),
            data: this.getDataCloudState()
        };
        this._onChange = this._onChange.bind(this);
    }

    getUserCloudState(){
        return UserCloudStore.userCloud;
    }
    getPassCloudState(){
        return UserCloudStore.passCloud;
    }
    getDataCloudState(){
        return UserCloudStore.data;
    }

    getDate(dateString){
        var time = Date.parse(dateString);
        var date = new Date();
        date.setTime(time);
        return  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()+ " " +
            date.getHours() + ":" + date.getMinutes();
    }

    handleAddUserCloud(){
       console.log('add user cloud');

        UserService.verifyCloudUser(this.state.userCloud,this.state.passCloud).then(
            (response)=>{
                UserService.setCoudUser(this.state.userCloud,this.state.passCloud).then(
                    (response)=>{
                        UserCloudActions.add(this.state.userCloud,this.state.passCloud);
                        var alertOptions = {
                            style:'success',
                            strongMsg: 'Success!',
                            message: 'Everyware Cloud user added!'
                        };
                        AlertCustomActions.setAlertOn(alertOptions);
                        UserService.getCloudUser(this.state.userCloud).then(
                            (response) => {
                                console.log(response.data);
                                UserCloudActions.getData(response.data);
                            },
                            (error) => {
                                console.log(JSON.stringify(error));
                            });
                    },
                    (error) =>{
                        console.error(JSON.stringify(error));
                    });
            },
            (errror)=>{
                var alertOptions = {
                    style:'danger',
                    strongMsg: 'Everyware Cloud User Error!',
                    message: 'You insert wrong username/password or the user is loked!'
                };
                AlertCustomActions.setAlertOn(alertOptions);
                console.error(JSON.stringify(error));
            }
        );

    }

    handleRemoveUserCloud(){
        console.log('remove user cloud');
    }

    handlePassCloudChange(e){
        this.setState({passCloud: e.target.value});
    }
    handleUserCloudChange(e){
        this.setState({userCloud: e.target.value});
    }

    componentDidMount(){
        UserCloudStore.addChangeListener(this._onChange);
    }


    componentWillUnmount() {
        UserCloudStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({userCloud: this.getUserCloudState()});
        this.setState({passCloud: this.getPassCloudState()});
        this.setState({data: this.getDataCloudState()});
    }

    render(){

        var parseDate = this.getDate.bind(this);

         var infoUserCloud = () => {
           if (this.state.data !== null){
               var getPermissions = this.state.data.permissions.permission.map((permission) => {
                    return (
                        <tr>
                            <td>{permission}</td>
                        </tr>
                   )
               });
               return(
                   <form>
                       <FormGroup>
                           <ControlLabel>Account ID</ControlLabel>
                           <FormControl.Static>
                               {this.state.data.accountId}
                           </FormControl.Static>
                       </FormGroup>
                       <FormGroup>
                           <ControlLabel>Created On</ControlLabel>
                           <FormControl.Static>
                               {parseDate(this.state.data.createdOn)}
                           </FormControl.Static>
                       </FormGroup>
                       <FormGroup>
                           <ControlLabel>Status</ControlLabel>
                           <FormControl.Static>
                               {this.state.data.status}
                           </FormControl.Static>
                       </FormGroup>
                       <Table striped bordered condensed hover>
                           <thead>
                           <tr>
                               <th>Permissions</th>
                           </tr>
                           </thead>
                           <tbody>
                             {getPermissions}
                           </tbody>
                       </Table>
                   </form>


               )
           }
         };

        return(
            <Panel header="User Everyware Cloud">
                <div class="panel-body-custom">
                    <Button onClick={this.handleAddUserCloud.bind(this)}>Add</Button>
                    <Button onClick={this.handleRemoveUserCloud.bind(this)}>Remove</Button>
                    <form>
                        <FormGroup controlId="formControlsUsernameCloud">
                            <ControlLabel>Username Cloud</ControlLabel>
                            <FormControl type="text"
                                         placeholder="Enter username"
                                         onChange={this.handleUserCloudChange.bind(this)}
                                         value={this.state.userCloud} />
                        </FormGroup>
                        <FormGroup controlId="formControlsPasswordCloud">
                            <ControlLabel>Password Cloud</ControlLabel>
                            <FormControl type="password"
                                         onChange={this.handlePassCloudChange.bind(this)}
                                         value={this.state.passCloud} />
                        </FormGroup>
                    </form>
                    {infoUserCloud()}
                </div>
            </Panel>
        )
    }
}