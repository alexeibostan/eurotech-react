/**
 * Created by alexei on 03/06/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    getDataAlerts: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'ALERTS_GET',
            data: data
        });
    }
}