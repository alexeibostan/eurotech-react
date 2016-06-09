/**
 * Created by alexei on 03/06/16.
 */
import axios from "axios";
import  LoginStore from '../stores/LoginStore';
import  Config  from '../config';

class AlertsService {
    constructor(){
    }

    getAlertsHome(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/alerts?limit=4',
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

}

export default new AlertsService();