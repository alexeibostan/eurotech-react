/**
 * Created by alexei on 31/05/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    getDataCharts: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'DATA_DEVICES_CHART_GET',
            data: data
        });
    }
}