/**
 * Created by alexei on 24/05/16.
 */
import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import AlertsHome from './AlertsHome';
import DevicesChart from './DevicesChart';
import Loader from 'react-loader';
import HomeActions from '../actions/HomeActions';
import AlertsService from '../services/AlertsService';
import HomeStore from '../stores/HomeStore';
import AlertCustom from './AlertCustom';
import { PageHeader, Col, Row, Panel, DropdownButton,
         MenuItem, Glyphicon, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
export default AuthenticatedComponent(class Home extends React.Component {

   constructor(){
       super();
       this.state = {
           dataAlerts: this.getDataAlertsState(),
           isLoaded: this.getIsLoadedState()
       };

       this._onChange = this._onChange.bind(this);
   }

    getDataAlertsState(){
        return HomeStore.dataAlerts;
    }
    getIsLoadedState(){
        return HomeStore.isLoaded;
    }

    componentDidMount(){
        HomeStore.addChangeListener(this._onChange);
        AlertsService.getAlertsHome().then(
            (response)=>{
                HomeActions.getDataAlerts(response.data.alert);
                console.log(JSON.stringify(response.data.alert))
            },
            (error)=>{console.log(JSON.stringify(error))}
        )
        
    }

    componentWillUnmount() {
        HomeStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({dataAlerts: this.getDataAlertsState()});
        this.setState({isLoaded: this.getIsLoadedState()});
    }


    render() {
        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <AlertCustom/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <PageHeader>Dashboard {this.props.user}</PageHeader>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <Panel header={
                    <span><i class="fa fa-area-chart" aria-hidden="true"/> Devices
                     <div className="pull-right">
                      <DropdownButton title="Dropdown" bsSize="xs" pullRight>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                      </DropdownButton>
                  </div>
                    </span>
                    }>
                            <div className="centre-chart">
                                <DevicesChart />
                            </div>
                        </Panel>
                        <Panel header={
                    <span><i class="fa fa-area-chart" aria-hidden="true"/> Some Charts to show in Home
                     <div className="pull-right">
                      <DropdownButton title="Dropdown" bsSize="xs" pullRight>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                      </DropdownButton>
                  </div>
                    </span>
                    }>
                            <div>
                                Panel Contents
                            </div>
                        </Panel>
                        <Panel header={
                    <span><i class="fa fa-area-chart" aria-hidden="true"/> Some Charts to show in Home
                     <div className="pull-right">
                      <DropdownButton title="Dropdown" bsSize="xs" pullRight>
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                      </DropdownButton>
                  </div>
                    </span>
                    }>
                            <div>
                                Panel Contents
                            </div>
                        </Panel>
                    </Col>
                    <Col lg={4}>
                        <Panel header={<span> <Glyphicon glyph='bell'/> Alerts </span> }>
                            <Loader loaded={this.state.isLoaded}>
                                <AlertsHome alerts={this.state.dataAlerts}/>
                            </Loader>
                            <Button block>View All Alerts</Button>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }
});