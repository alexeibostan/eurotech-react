/**
 * Created by alexei on 07/06/16.
 */
import axios from "axios";
import UserCloudStore from '../stores/UserCloudStore';
import  Config  from '../config';

class TopicService {
    constructor(){
    }

    getTopics(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/topics',
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

}

export default new TopicService();