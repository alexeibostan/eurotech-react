/**
 * Created by alexei on 24/06/16.
 */
import React from 'react';
import UsersTableStore from '../stores/UsersTableStore';
import UserService from '../services/UserService';
import UsersTableActions from '../actions/UsersTableActions';
import TopicService from '../services/TopicService';
import UserRoleDropdown from './UserRoleDropdown';
import DefaultTopicDropdown from './DefaultTopicDropdown';
import MultipleRequestsService from '../services/MultipleRequestsService'
import Loader from 'react-loader';
import { Table, Panel } from 'react-bootstrap';


export  default class UsersTable extends React.Component {

    constructor(){
        super();
        this.state = {
            data: this.getDataState(),
            topicsData: this.getTopicsDataState(),
            isLoaded: this.getLoadedState()
        };
        this._onChange = this._onChange.bind(this);
    }

    getDataState(){
        return UsersTableStore.data;
    }
    getTopicsDataState(){
        return UsersTableStore.topicsData;
    }
    getLoadedState(){
        return UsersTableStore.isLoaded;
    }

    componentDidMount() {
        UsersTableStore.addChangeListener(this._onChange);

        if (this.state.data.length === 0) {
            const requests = [ UserService.getAllUsers(), TopicService.getTopics()];
            MultipleRequestsService.getTwoRequests(requests).then(function(responses){
                let dataArray = responses.map(r => r.data);
                dataArray[1].topicInfo.unshift({topic:'None'});
                UsersTableActions.getData(dataArray[0].users,dataArray[1].topicInfo);
            });
        }
    }


    componentWillUnmount() {
        UsersTableStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({topicsData: this.getTopicsDataState()});
        this.setState({isLoaded: this.getLoadedState()});
    }



    render(){

        var usersNodes = this.state.data.map((user,index)=> {
            return (

                <tr key={user._id} >
                    <td>{user.username}</td>
                    <td>
                        <UserRoleDropdown role={user.roles} index={index} username={user.username}/>
                    </td>
                    <td>{user.cloudUsername}</td>
                    <td>
                        <DefaultTopicDropdown  topics={this.state.topicsData}
                                               username={user.username}
                                               defaultTopic={user.defaultTopic}
                                               index={index}
                        />
                    </td>
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
                            <th>Default Topic</th>
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