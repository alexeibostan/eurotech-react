/**
 * Created by alexei on 07/06/16.
 */
import axios from "axios";
import  LoginStore from '../stores/LoginStore';
import  Config  from '../config';

class TopicService {
    constructor(){
    }

    getTopics(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/topics',
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

}

export default new TopicService();