/**
 * Created by alexei on 07/06/16.
 */
import React from 'react';
import MetricChartStore from '../stores/MetricChartStrore';
import MetricChartActions from '../actions/MetricChartActions';
import MetricService from '../services/MetricService';
import Loader from 'react-loader';
import RangeDropDown from './RangeDropdown';
import AlertCustomActions from '../actions/AlertCustomActions';
import { Button, Panel, Alert } from 'react-bootstrap';
import { LineTooltip } from 'react-d3-tooltip';


export  default class MetricChart extends React.Component {

    constructor() {
        super();
        this.state = {
            chartData: this.getDataState(),
            isLoaded: this.getLoadedState(),
            queryBool:this.getQueryBoolState(),
            topic: this.getTopicState(),
            width : 900,
            height : 300,
            margins : {top: 30, right: 50, bottom: 30, left: 50},
            id : "simple-area-chart",
            title : "Taiwan refuse disposal ",
            svgClassName :"simple-area-chart",
            titleClassName : "test-chart-title-class",
            // show xaxis or not
            showXAxis : true,
            // show yaxis or not
            showYAxis : true,
            // chart series,
            // field: is what field your data want to be selected
            // name: the name of the field that display in legend
            // color: what color is the line
            chartSeries : [
                {
                    field: 'value',
                    name: this.getChartSeriesNameState()
                }
            ],
            // your x accessor
            x : function(d) {
                var date = new Date();
                date.setTime(d.timestamp);
                return date;
            },
            xOrient : 'bottom',
            xTickOrient : 'bottom',
            xScale : 'time',
            xAxisClassName : 'x-axis',
            xLabel : "Today",
            xLabelPosition : "left",
            // your y accessor
            y : function(d) {
                return +d;
            },
            yOrient : 'left',
            yTickOrient : 'left',
            yScale : 'linear',
            yAxisClassName : 'y-axis',
            categoricalColors: d3.scale.category10()
        };
        this._onChange = this._onChange.bind(this);
    }

    getDataState(){
        return MetricChartStore.data;
    }
    getLoadedState(){
        return MetricChartStore.isLoaded;
    }

    getQueryBoolState(){
        return MetricChartStore.queryBool;
    }
    
    getChartSeriesNameState(){
        return MetricChartStore.metric;
    }
    getTopicState(){
        return MetricChartStore.topic;
    }

    requestData(){
        console.log(MetricChartStore.metricType);
        var alertData = {style:'danger',strongMsg:'Metric',message:'Metric type is invalid!'};
        if (MetricChartStore.metricType == 'string'){
            AlertCustomActions.setAlertOn(alertData);
        }
        else {

            MetricChartActions.getDataMetricChartClick();
            MetricService.getMetricValuesByTimestamp(MetricChartStore.topic,
                MetricChartStore.metric,
                MetricChartStore.metricType, MetricChartStore.range.startDate,
                MetricChartStore.range.endDate).then(
                (response) => {
                    console.log(JSON.stringify(response.data));
                    MetricChartActions.getDataMetricChart(response.data.metricValue);
                },
                (error) => {
                    console.error(JSON.stringify(error));
                }
            )
        }
    }

    componentDidMount() {

        console.log('Richiesta device chart');

        MetricChartStore.addChangeListener(this._onChange);


    }

    componentWillUnmount() {
        MetricChartStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({chartData: this.getDataState()});
        this.setState({queryBool:this.getQueryBoolState()});
        this.setState({isLoaded: this.getLoadedState()});
        this.setState({chartSeries: [{field: 'value',name:this.getChartSeriesNameState()}]});
        this.setState({topic: this.getTopicState()});
    }

    getYDomain(data) {
        var min = Math.min.apply(Math, data.map((o) => {
            return o.value;
        }));
        var max = Math.max.apply(Math, data.map((o) => {
            return o.value;
        }));
        if (min == max) {
            var value = min;
            var delta5 = value * 5 / 100;
            return ([value - delta5, value + delta5]);
        }
        else {
            var val = max - min;
            var deltaVal5 = val * 5 / 100;
            return ([min - deltaVal5, max + deltaVal5]);
        }
    }
    

    render(){
        if (this.state.queryBool) {
            var chart = function () {
               // console.log(this.state.data);
                if (this.state.chartData.length !== 0) {
                    var yDomain = this.getYDomain.bind(this);
                    console.log(yDomain);
                    return (
                        <LineTooltip
                            title= {this.state.title}
                            data= {this.state.chartData}
                            width= {this.state.width}
                            height= {this.state.height}
                            id= {this.state.id}
                            margins= {this.state.margins}
                            svgClassName= {this.state.svgClassName}
                            titleClassName= {this.state.titleClassName}
                            yAxisClassName= {this.state.yAxisClassName}
                            xAxisClassName= {this.state.xAxisClassName}
                            chartSeries= {this.state.chartSeries}
                            showXAxis= {this.state.showXAxis}
                            showYAxis= {this.state.showYAxis}
                            x= {this.state.x}
                            //xDomain= {d3.extent(this.state.chartData, function(d){ return x(d) })}
                            xRange= {[0, this.state.width - this.state.margins.left - this.state.margins.right]}
                            xScale= {this.state.xScale}
                            xOrient= {this.state.xOrient}
                            xTickOrient= {this.state.xTickOrient}
                            xLabel = {this.state.xLabel}
                            xLabelPosition = {this.state.xLabelPosition}
                            y= {this.state.y}
                            yOrient= {this.state.yOrient}
                            yDomain= {yDomain(this.state.chartData)}
                            yRange= {[this.state.height - this.state.margins.top - this.state.margins.bottom, 0]}
                            yScale= {this.state.yScale}
                            yTickOrient= {this.state.yTickOrient}
                            categoricalColors= {this.state.categoricalColors}
                        />
                    )
                }
            }.bind(this);
            return (
                <Panel header={<span><i class="fa fa-area-chart" aria-hidden="true"/> Topic: {this.state.topic}
                     <div className="pull-right">
                      <RangeDropDown/>
                      <Button onClick={this.requestData.bind(this)} bsSize="xsmall" >Show Chart</Button>
                  </div>
                    </span>}>

                    <Loader loaded={this.state.isLoaded}>
                        <div className="centre-chart">
                            {chart()}
                        </div>
                    </Loader>

                </Panel>
            )
        }
        else {
            return (
                <Panel header={<span><i class="fa fa-area-chart" aria-hidden="true"/> Metric Chart
                     <div className="pull-right">
                      <RangeDropDown/>
                      <Button onClick={this.requestData.bind(this)} bsSize="xsmall" >Show Chart</Button>
                      </div>
                    </span>}>
                    <div> No data </div>
                </Panel>
            )
        }

    }
}