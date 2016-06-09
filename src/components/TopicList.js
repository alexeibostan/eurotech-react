/**
 * Created by alexei on 07/06/16.
 */
import React from 'react';
import TopicListStore from '../stores/TopicListStore';
import TopicService from '../services/TopicService';
import MetricService from '../services/MetricService';
import MetricActions from '../actions/MetricActions';
import MectricChartActions from '../actions/MetricChartActions';
import TopicActions from '../actions/TopicActions';
import Loader from 'react-loader';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class TopicList extends React.Component{
    constructor() {
        super();
        this.state = {
            data : this.getDataState(),
            isLoaded: this.getLoadedState()
        };
        this._onChange = this._onChange.bind(this);
    }
    getDataState(){
        return TopicListStore.data;
    }
    getLoadedState(){
        return TopicListStore.isLoaded;
    }


    getDate(dateString){
        var time = Date.parse(dateString);
        var date = new Date();
        date.setTime(time);
        return  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()+ " " +
            date.getHours() + ":" + date.getMinutes();
    }

    requestMetrics(topic) {
        MetricActions.getMeticDataClick();
        MetricService.getMetrics(topic).then(
            (response) => {
                console.log(JSON.stringify(response.data));
                MectricChartActions.setTopicSelected(topic);
                MetricActions.getDataMetric(response.data.metricInfo);
            },
            (error) => {
                console.log(JSON.stringify(error));
            }
        );
    }


    componentDidMount() {
        TopicListStore.addChangeListener(this._onChange);
        if (this.state.data.length === 0){
            TopicService.getTopics().then(
                (response) =>{
                    TopicActions.getDataTopic(response.data.topicInfo);
                    console.log('TopicInfo Recived');
                },
                (error) => { console.error(JSON.stringify(error)); }
            );
        }



    }

    componentWillUnmount() {
       TopicListStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: this.getDataState()});
        this.setState({isLoaded: this.getLoadedState()});
    }

    render(){
        var listNodes = this.state.data.map((topicInfo) =>{
            var date = this.getDate.bind(this);
            return (
                <ListGroupItem onClick={this.requestMetrics.bind(this,topicInfo.topic)} >
                    {topicInfo.topic}
                    <span className="pull-right text-muted small"><em>{date(topicInfo.lastMessageOn)}</em></span>
                </ListGroupItem>
            )
        });

        return (
            <Loader loaded={this.state.isLoaded}>
            <ListGroup>
                {listNodes}
            </ListGroup>
            </Loader>
        )
    }

}