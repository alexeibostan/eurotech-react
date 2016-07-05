/**
 * Created by alexei on 07/06/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    
    getDataMetricChart: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'DATA_CHART_GET',
            data: data
        });
    },
    getLiveDataMetricChart: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'DATA_CHART_LIVE_GET',
            data: data
        });
    },
    incrementOffset:() => {
        AppDistpatcher.dispatch({
            actionType: 'INCREMENT_OFFSET'
        });
    },
    decrementOffset:() => {
        AppDistpatcher.dispatch({
            actionType: 'DECREMENT_OFFSET'
        });
    },
    setTopicSelected:(topic) => {
        AppDistpatcher.dispatch({
            actionType: 'TOPIC_SELECTED',
            topic: topic
        });
    },
    setMetricSelected:(metric,metricType) => {
        AppDistpatcher.dispatch({
            actionType: 'METRIC_SELECTED',
            metric: metric,
            metricType: metricType

        });
    },
    getDataMetricChartClick: () => {
        AppDistpatcher.dispatch({
            actionType: 'DATA_CHART_CLICK'
        });
    },
    setRequestDataRange:(range) => {
        AppDistpatcher.dispatch({
            actionType: 'DATA_CHART_SET_RANGE',
            range: range
        });
    }
}