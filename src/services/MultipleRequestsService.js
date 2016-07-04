/**
 * Created by alexei on 04/07/16.
 */
import axios from "axios";

class  MultipleRequestsService {

    constructor(){
        
    }

    getTwoRequests(requests){
        return axios.all(requests);
    }
}

export default new MultipleRequestsService();