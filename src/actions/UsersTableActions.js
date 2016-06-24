/**
 * Created by alexei on 24/06/16.
 */
import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
    getData: (data) => {
        AppDispatcher.dispatch({
            actionType: 'USERS_GET',
            data: data
        });
    }

}
