/**
 * Created by alexei on 24/05/16.
 */
import axios from "axios";
import  Config  from '../config';

class AuthService {
    constructor(){
    }

    login(username,password){
      return  axios({
            method: 'POST',
            url: Config.BASE_URL_LOCAL + '/api/session',
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:8081', 'Access-Control-Allow-Credentials': 'true' },
            auth:{
                username: username,
                password: password
            }
        })
    }

}

export default new AuthService();