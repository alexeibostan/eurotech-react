/**
 * Created by alexei on 09/06/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    setAlertOn: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'ALERT_SET_ON',
            data: data
        });
    },
    setAlertOff:() => {
        AppDistpatcher.dispatch({
            actionType: 'ALERT_SET_OFF'
        });
    }
}