/**
 * Created by alexei on 02/06/16.
 */
import React from 'react';
import AuthenticatedComponent from '../AuthenticatedComponent';
import DevicesChartActions from '../../actions/DevicesChartActions';
import DevicesChartStore from '../../stores/DevicesChartStore';
import DevicesService from '../../services/DevicesService';
import Loader from 'react-loader';
import { BarTooltip } from 'react-d3-tooltip'
import { Col, PageHeader, Panel } from 'react-bootstrap';

export default AuthenticatedComponent( class Device extends React.Component {

    constructor(){
        super();
        this.state = {
            data : this.getDataState(),
            isLoaded: this.getLoadedState(),
            chartSeries : [
            {
                field: 'y',
                name: 'Frequency on last events',
                color: '#ff7f0e'

            }
        ],
            x : function(d) {
            return d.x;
        },
            xScale : 'ordinal',
            yTicks : [15, "%"]
        };

        this._onChange = this._onChange.bind(this);
    }


    getDataState(){
        return DevicesChartStore.data;
    }
    getLoadedState(){
        return DevicesChartStore.isLoaded;
    }

    componentDidMount(){

        console.log(this.props.params.clientId);

        DevicesChartStore.addChangeListener(this._onChange);

            DevicesService.getDeviceEvents(this.props.params.clientId).then(
                (response) => {
                    console.log(response.data.deviceEvent);
                    if (response.data.deviceEvent !== undefined ) {
                        var deviceEvents = response.data.deviceEvent;
                        var data = [{x: 'MISSING', y: 0},
                            {x: 'BIRTH', y: 0},
                            {x: 'DISCONNECTED', y: 0},
                            {x: 'CONNECTED', y: 0}];
                        deviceEvents.forEach((event) => {
                            switch (event.eventType) {
                                case 'MISSING':
                                    data[0].y += 1;
                                    break;
                                case 'BIRTH':
                                    data[1].y += 1;
                                    break;
                                case 'DISCONNECTED':
                                    data[2].y += 1;
                                    break;
                                case 'CONNECTED':
                                    data[3].y += 1;
                                    break;
                            }
                        });
                        for (var i = 0; i < data.length; i++) {
                            data[i].y = (data[i].y / deviceEvents.length).toFixed(2);
                        }
                        DevicesChartActions.getDataCharts(data);
                    }
                    else {
                        console.log('No evenents for device ' + this.props.params.clientId );
                    }
                },
                (error) => {
                    console.log(JSON.stringify(error));
                }
            );
    }

    componentWillUnmount() {
        DevicesChartStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({isLoaded: this.getLoadedState()});
    }

    render(){
        var chart = function(){
            console.log(this.state.data);
            if (this.state.data != null) {
                return (
                    <BarTooltip
                        data={this.state.data}
                        width={800}
                        height={400}
                        chartSeries={this.state.chartSeries}
                        x= {this.state.x}
                        xScale= {this.state.xScale}
                        yTicks={this.state.yTicks}

                    />
                )
            }
        }.bind(this);

        return(
            <div>
                <Col lg={12}>
                    <PageHeader> Device {this.props.params.clientId} </PageHeader>
                </Col>
                <Col lg={12}>
                    <Panel header="Device Events Chart">

                        <Loader loaded={this.state.isLoaded}>
                            {chart()}
                        </Loader>

                    </Panel>
                </Col>
            </div>
        )
    }

})