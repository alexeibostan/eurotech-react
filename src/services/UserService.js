/**
 * Created by alexei on 15/06/16.
 */
import axios from "axios";
import Config  from '../config';
import LoginStore from '../stores/LoginStore';
import UserCloudStore from '../stores/UserCloudStore';

class UserService {
    constructor(){
    }



    register(username,password){
        return  axios({
            method: 'POST',
            url: Config.BASE_URL_LOCAL + '/api/users',
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:8081', 'Access-Control-Allow-Credentials': 'true' },
            auth:{
                username: username,
                password: password
            }
        })
    }

    setCoudUser(cloudUser,cloudPass){
        return  axios({
            method: 'POST',
            url: Config.BASE_URL_LOCAL + '/api/users/cloud',
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:8081', 'Access-Control-Allow-Credentials': 'true' },
            data: { username: LoginStore.user,
                    cloudUser: cloudUser,
                    cloudPass: cloudPass
            }
        })
    }

    verifyCloudUser(username,password){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/version',
            auth:{
                username: username,
                password: password
            }
        })
    }

    getCloudUser(username){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/users/findByName',
            params:{
              username:username
            },
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

}

export default new UserService();