/**
 * Created by alexei on 27/05/16.
 */
import React from 'react';
import { Table, Label } from 'react-bootstrap';


export  default class DevicesTable extends React.Component {

    constructor(){
        super();
    }

    getStyle(device){
        switch(device.connectionStatus) {
            case 'MISSING':
                return 'default';
                break;
            case 'DISCONNECTED':
                return 'danger';
                break;
            case 'CONNECTED':
                return 'success';
                break;
            default:
                console.error('Error mapping Style Label');
                return 'primary';
        }

    };

    goDevice(clientId){
        this.props.router.push('/device/'+clientId);
    }

    render(){

        var deviceNodes = this.props.devices.map((device)=> {
            var style = this.getStyle.bind(this, device);
            return (

                    <tr key={device.clientId} onClick={this.goDevice.bind(this,device.clientId)}>
                        <td><Label bsStyle={style(device)}>{device.connectionStatus}</Label></td>
                        <td>{device.clientId}</td>
                        <td>{device.displayName}</td>
                        <td>{device.lastEventOn}</td>
                        <td>{device.lastEventType}</td>
                        <td>{device.modelId}</td>
                    </tr>
            )
        });

        return(

                        <Table responsive hover condensed >
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th>Client ID</th>
                                <th>Display Name</th>
                                <th>Last Event On</th>
                                <th>Last Event Type</th>
                                <th>Model ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {deviceNodes}
                            </tbody>
                        </Table>

        );

    };
}