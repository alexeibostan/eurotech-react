/**
 * Created by alexei on 27/05/16.
 */
import React from "react";
import AuthenticatedComponent from '../AuthenticatedComponent';
import DevicesTable from "../DevicesTable";
import DevicesStore from '../../stores/DevicesStore';
import DevicesService from '../../services/DevicesService';
import DevicesActions from '../../actions/DevicesActions';
import Loader from 'react-loader';
import {Row, Col, Panel, PageHeader, Pagination } from "react-bootstrap";

export default AuthenticatedComponent( class Devices extends React.Component {

    constructor(){
        super();
        this.state = {
            devices: this.getDeviceState(),
            currentPage:this.getCurrentPageState(),
            numberOfPages: this.getPagesState(),
            isLoaded: this.getLoadedState()
        };
        this._onChange = this._onChange.bind(this);

        this.DEVICES_NUMBER_PAGE = 5;
    }

    getDeviceState() {
        return DevicesStore.devices;
    }
    getLoadedState() {
        return DevicesStore.isLoaded;
    }
    getPagesState(){
        return  DevicesStore.pages;
    }
    getCurrentPageState(){
        return  DevicesStore.currentPage;
    }



    componentDidMount() {

        DevicesStore.addChangeListener(this._onChange);
       
        if (this.state.devices.length === 0) {
            DevicesService.getDevicesPagination(this.DEVICES_NUMBER_PAGE,0).then(
                (response) => {
                    DevicesActions.getDevices(response.data.device);
                    console.log('Requested Device')},
                (error) => { console.log(JSON.stringify(error)); }
            );
        }

        if (!this.state.numberOfPages) {
            DevicesService.getDevices().then(
                (response) => {
                    DevicesActions.getDevicesPage(response.data.device.length / this.DEVICES_NUMBER_PAGE );
                    console.log('Requested Device Pages')
                },
                (error) => {
                    console.log(JSON.stringify(error));
                }
            );
        }

        

    }

    componentWillUnmount() {
        DevicesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({devices: this.getDeviceState()});
        this.setState({numberOfPages: this.getPagesState()});
        this.setState({currentPage: this.getCurrentPageState()});
        this.setState({isLoaded: this.getLoadedState()});
    }

    handleSelect(eventKey){
        DevicesActions.changeDeviceCurrentPage(eventKey);
        var offset = (eventKey - 1) * this.DEVICES_NUMBER_PAGE;
        var limit =  this.DEVICES_NUMBER_PAGE;
        DevicesService.getDevicesPagination(limit,offset).then(
            (response)=>{
                DevicesActions.getDevices(response.data.device);
            },
            (error) =>{ console.log(JSON.stringify(error)); }
        )
    }


    render(){
        return(
            <div>
                <Col lg={12}>
                    <PageHeader> Devices </PageHeader>
                </Col>
                <Col lg={12}>
                    <Panel header="IOT Devices">
                        <Row>
                            <Col sm={12}>
                                <Loader loaded={this.state.isLoaded}>
                                    <DevicesTable router={this.props.router} devices={this.state.devices} />
                                </Loader>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Pagination first
                                            last
                                            ellipsis
                                            items={this.state.numberOfPages}
                                            maxButtons={5}
                                            activePage={this.state.currentPage}
                                            onSelect={this.handleSelect.bind(this)}
                                            />
                            </Col>
                        </Row>
                    </Panel>
                </Col>
            </div>
        )
    }

})