/**
 * Created by alexei on 09/06/16.
 */
import React from 'react'
import AlertCustomStore from '../stores/AlertCustomStore';
import AlertCustomActions from '../actions/AlertCustomActions';
import { Alert } from 'react-bootstrap';

export default class AlertCustom extends React.Component {
    
    constructor(){
        super();
        this.state = {
            alertVisible: this.getAlertVisibleState(),
            data: this.getDataState()
        };

        this._onChange = this._onChange.bind(this);
    }
    
    getAlertVisibleState(){
        return AlertCustomStore.alertVisible;
    }
    getDataState(){
        return AlertCustomStore.data;
    }

    handleAlertDismiss() {
      AlertCustomActions.setAlertOff();
    }

    componentDidMount(){
        AlertCustomStore.addChangeListener(this._onChange);
        
    }

    componentWillUnmount() {
        AlertCustomStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({alertVisible: this.getAlertVisibleState()});
    }

    render(){
        if (this.state.alertVisible) {
            return (
                <div className="alert-custom">
                    <Alert bsStyle={this.state.data.style} onDismiss={this.handleAlertDismiss.bind(this)}>
                        <strong>{this.state.data.strongMsg}</strong> {this.state.data.message}
                    </Alert>
                </div>
            )
        }
        else { return null}
    }
}