/**
 * Created by alexei on 07/06/16.
 */
import React from 'react';
import MetricService from '../services/MetricService';
import MetricActions from '../actions/MetricActions';
import MetricListStore from '../stores/MetricListStore';
import MectricChartActions from '../actions/MetricChartActions';
import Loader from 'react-loader';
import { ListGroup, ListGroupItem, Checkbox, Row, Col } from 'react-bootstrap';

export default class MetricList extends React.Component{
    constructor() {
        super();
        this.state = {
            data : this.getDataState(),
            isLoaded: this.getLoadedState()
        };
        this._onChange = this._onChange.bind(this);
    }
    getDataState(){
        return MetricListStore.data;
    }
    getLoadedState(){
        return MetricListStore.isLoaded;
    }


    handleCheckBox(checkBoxMetric,checkBoxMetricType){
            MectricChartActions.setMetricSelected(checkBoxMetric, checkBoxMetricType);
    }


    componentDidMount() {
        MetricListStore.addChangeListener(this._onChange);

    }

    componentWillUnmount() {
        MetricListStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({isLoaded: this.getLoadedState()});
    }

    render(){
        var listNodes = function() {
            if (this.state.data.length === 0) {
                return 'No topic Selected'
            }

            else {return this.state.data.map((metricInfo) => {
                    return (
                        <ListGroupItem >
                            <Row>
                                <Col lg={8}>
                                    <Checkbox onChange={this.handleCheckBox.bind(this,metricInfo.name,metricInfo.type)}>
                                        {metricInfo.name}
                                    </Checkbox>
                                </Col>
                                <Col lg={4}>
                                    <div className="pull-right text-muted small"><em>{metricInfo.type}</em></div>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )
                });
            }
        }.bind(this);

        return (
            <Loader loaded={this.state.isLoaded}>
                <ListGroup>
                    {listNodes()}
                </ListGroup>
            </Loader>
        )
    }

}