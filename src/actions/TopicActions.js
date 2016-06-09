/**
 * Created by alexei on 07/06/16.
 */
import AppDistpatcher from '../dispatchers/AppDispatcher';

export default {
    getDataTopic: (data) => {
        AppDistpatcher.dispatch({
            actionType: 'TOPICS_GET',
            data: data
        });
    }
}