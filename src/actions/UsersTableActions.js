/**
 * Created by alexei on 24/06/16.
 */
import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
    getData: (data,topicsData) => {
        AppDispatcher.dispatch({
            actionType: 'DATA_USERS_GET',
            data: data,
            topicsData: topicsData
        });
    },
    
    updateUser: (index,field,value) => {
        AppDispatcher.dispatch({
            actionType: 'USER_ROLES_UPDATED',
            index: index,
            field: field,
            value: value
        });
    },
    updateUserDefaultTopic: (index,field,value) => {
        AppDispatcher.dispatch({
            actionType: 'USER_DEFAULT_TOPIC_UPDATED',
            index: index,
            field: field,
            value: value
        });
    }

}
