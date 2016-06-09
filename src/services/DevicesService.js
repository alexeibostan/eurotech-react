/**
 * Created by alexei on 27/05/16.
 */
import axios from 'axios';
import  LoginStore from '../stores/LoginStore';
import  Config  from '../config';

class DevicesService {
    constructor(){
    }

    getDevices(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices',
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

    getDeviceEvents(clientId){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices/'+clientId+'/events',
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

    getDevicesPagination(limit,offset){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices/search?limit='+limit+'&offset='+offset,
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }
}

export default new DevicesService();