/**
 * Created by alexei on 27/05/16.
 */
import axios from 'axios';
import UserCloudStore from '../stores/UserCloudStore';
import  Config  from '../config';

class DevicesService {
    constructor(){
    }

    getDevices(){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices',
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

    getDeviceEvents(clientId){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices/'+clientId+'/events',
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

    getDevicesPagination(limit,offset){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/devices/search?limit='+limit+'&offset='+offset,
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }
}

export default new DevicesService();