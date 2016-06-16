/**
 * Created by alexei on 03/06/16.
 */
import axios from "axios";
import UserCloudStore from '../stores/UserCloudStore';
import  Config  from '../config';

class AlertsService {
    constructor(){
    }

    getAlertsHome(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/alerts?limit=4',
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

}

export default new AlertsService();