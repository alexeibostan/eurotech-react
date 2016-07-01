/**
 * Created by alexei on 01/07/16.
 */
import React from 'react';
import UserService from '../services/UserService';
import AlertCustomActions from '../actions/AlertCustomActions';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class UserRoleDropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedValue: ''
        }
    }

    componentDidMount() {
        if (this.state.selectedValue == '') {
            this.setState({selectedValue: this.props.role});

        }

    }


    updateUserRole(role){
        UserService.updateRoleUser(this.props.username, role).then(
            (response) => {
                const alertOptions = { style:'success',
                                       strongMsg:'User',
                                       message:'User updated successfuly!'};
                AlertCustomActions.setAlertOn(alertOptions);
            },
            (error) => { console.error(JSON.stringify(error)); }
        );
    }

    handleSelectedValue(selectedValue) {
        switch (selectedValue){
            case 'Client':
                this.setState({selectedValue: selectedValue});
                this.updateUserRole(selectedValue);
                break;
            case 'Manager':
                this.setState({selectedValue: selectedValue});
                this.updateUserRole(selectedValue);
                break;
            case 'Admin':
                this.setState({selectedValue: selectedValue});
                this.updateUserRole(selectedValue);
                break;

        }

    }

    render() {
        const values = ['Client', 'Manager', 'Admin'];
        var menuItems = values.map((value,key) => {
            return(
                <MenuItem key={key} eventKey={key} onClick={this.handleSelectedValue.bind(this,value)} >{value}</MenuItem>
            )
        });

        return (
            <DropdownButton bsSize="xsmall" title={this.state.selectedValue} id="dropdown-size-extra-small">
                {menuItems}
            </DropdownButton>
        )

    }
}