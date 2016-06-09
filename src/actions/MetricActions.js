/**
 * Created by alexei on 07/06/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    getDataMetric: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'METRICS_GET',
            data: data
        });
    },
    getMeticDataClick: () => {
        AppDistpatcher.dispatch({
            actionType: 'METRICS_GET_CLICK',
        });
    }
}