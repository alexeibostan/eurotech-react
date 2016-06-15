/**
 * Created by alexei on 07/06/16.
 */
import axios from "axios";
import Qs from 'qs';
import  LoginStore from '../stores/LoginStore';
import  Config  from '../config';

class MetricService {
    constructor(){
    }

    getMetricValuesByTimestamp(topic,metric,metricType,startDate,endDate){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/metrics/valuesByTimestamp',
            params:{
                topic: topic,
                metric: metric,
                type:metricType,
                startDate:startDate,
                endDate:endDate,
                limit: 250
            },
            paramsSerializer: (params) => {
                return Qs.stringify(params);
            },
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

    getMetrics(topic){
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/metrics/searchByTopic',
            params:{
                topic: topic

            },
            paramsSerializer: (params) => {
                return Qs.stringify(params);
            },
            auth:{
                username: LoginStore.user,
                password: LoginStore.pass
            }
        })
    }

}

export default new MetricService();