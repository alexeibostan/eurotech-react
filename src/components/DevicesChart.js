/**
 * Created by alexei on 31/05/16.
 */
import React from 'react';
import DevicesService from '../services/DevicesService';
import DevicesChartActions from '../actions/DevicesChartActions';
import DevicesChartStore from '../stores/DevicesChartStore';
import Loader from 'react-loader';
import { PieTooltip } from 'react-d3-tooltip';


export  default class DevicesChart extends React.Component {

    constructor() {
        super();
        this.state = {
            data : this.getDataState(),
            isLoaded: this.getLoadedState(),
            chartSeries : [
                {
                    field: "MISSING",
                    name: "MISSING"
                },
                {
                    field: "DISCONNECTED",
                    name: "DISCONNECTED"
                },
                {
                    field: "CONNECTED",
                    name: "CONNECTED"
                }
            ],
            value : function(d) {
                return d.y;
            },
            name : function(d) {
                return d.x;
            }
        };
        this._onChange = this._onChange.bind(this);
    }
    getDataState(){
        return DevicesChartStore.data;
    }
    getLoadedState(){
        return DevicesChartStore.isLoaded;
    }
    

    componentDidMount() {
        console.log('Richiesta device chart');
        DevicesChartStore.addChangeListener(this._onChange);
        if (this.state.data === null) {
            DevicesService.getDevices().then(
                (response) => {
                    var devices = response.data.device;
                    var data =  [{x: 'MISSING',y:0},
                                 {x: 'DISCONNECTED',y:0},
                                 {x: 'CONNECTED',y:0}];
                    devices.forEach((device) => {
                        switch (device.connectionStatus) {
                            case 'MISSING':
                                data[0].y += 1;
                                break;
                            case 'DISCONNECTED':
                                data[1].y += 1;
                                break;
                            case 'CONNECTED':
                                data[2].y += 1;
                                break;
                        }
                    });
                    DevicesChartActions.getDataCharts(data);
                },
                (error) => {
                    console.log(JSON.stringify(error));
                }
            );
        }



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
                    <PieTooltip
                        title={'Devices Info'}
                        data={this.state.data}
                        width={500}
                        height={300}
                        chartSeries={this.state.chartSeries}
                        innerRadius = {10}
                        name = {this.state.name}
                        value = {this.state.value}
                    />
                )
            }
        }.bind(this);
        return (

            <Loader loaded={this.state.isLoaded}>
                {chart()}
            </Loader>

        )

    }
}