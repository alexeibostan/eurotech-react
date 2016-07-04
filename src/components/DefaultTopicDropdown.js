/**
 * Created by alexei on 04/07/16.
 */
import React from 'react';
import UserService from '../services/UserService';
import UsersTableActions from '../actions/UsersTableActions';
import AlertCustomActions from '../actions/AlertCustomActions';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class DefaultTopicDropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedValue: ''
        }
    }

    componentDidMount() {
        console.log(this.props.topics);
        if (this.state.selectedValue == '') {
            this.setState({selectedValue: this.props.defaultTopic});

        }

    }


    updateUserDefaultTopic(topic){
        UserService.updateUser(this.props.username,'defaultTopic', topic).then(
            (response) => {
                const alertOptions = { style:'success',
                    strongMsg:'User',
                    message:'User Default Topic updated successfuly!'};
                UsersTableActions.updateUserDefaultTopic(this.props.index,'defaultTopic',topic);
                AlertCustomActions.setAlertOn(alertOptions);
            },
            (error) => { console.error(JSON.stringify(error)); }
        );
    }

    handleSelectedValue(selectedValue) {
                this.setState({selectedValue: selectedValue});
                this.updateUserDefaultTopic(selectedValue);
    }

    render() {
        
        var menuItems = this.props.topics.map((value,index) => {
         
            return(
                <MenuItem key={index} eventKey={index} onClick={this.handleSelectedValue.bind(this,value.topic)} >
                    {value.topic}
                </MenuItem>
            )
        });

        return (
            <DropdownButton bsSize="xsmall" title={this.state.selectedValue} id="dropdown-size-extra-small">
                {menuItems}
            </DropdownButton>
        )

    }
}