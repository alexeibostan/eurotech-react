/**
 * Created by alexei on 03/06/16.
 */
import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class extends React.Component {

    getCategory(category){
        switch (category){
            case 'System':
                return 'hdd';
            break;
            case 'SECURITY':
                return 'lock';
                break;
            default:
                cnosole.error('Alert Category unknown' + category);
        }
    }

    getSeverityStyle(severity){
        switch (severity){
            case 'CRITICAL':
                return 'danger';
            break;
            case 'WARNING':
                return 'warning';
                break;
            case 'INFO':
                return 'info';
                break;
            default:
                console.error('Uknowen severity: ' + severity );
        }
    }

    render(){
        var alertList = this.props.alerts.map((alert)=>{
            var category = this.getCategory.bind(this);
            var severity = this.getSeverityStyle.bind(this);
            return (
                <ListGroupItem key={alert.uuid} bsStyle={severity(alert.severity)} href="javascript:void(0)">
                    <Glyphicon glyph={category(alert.category)}/> <strong>{alert.message}</strong>
                </ListGroupItem>
            );
        });
        return(

            <ListGroup>
                {alertList}
            </ListGroup>
        )
    }
}