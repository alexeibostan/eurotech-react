/**
 * Created by alexei on 15/06/16.
 */
import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
    getData: (data) => {
        AppDispatcher.dispatch({
            actionType: 'GET_DATA_USER_CLOUD',
            data: data
        });
    },
    remove:() => {
        AppDispatcher.dispatch({
            actionType: 'REMOVE_USER_CLOUD'
        });
    },
    add:(userCloud,passCloud) => {
        AppDispatcher.dispatch({
            actionType: 'ADD_USER_CLOUD',
            passCloud: passCloud,
            userCloud: userCloud
        });
    }

}
