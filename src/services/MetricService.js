/**
 * Created by alexei on 07/06/16.
 */
import axios from "axios";
import Qs from 'qs';
import UserCloudStore from '../stores/UserCloudStore';
import  Config  from '../config';

class MetricService {
    constructor(){
    }

    getMetricValuesByTimestamp(topic,metric,metricType,startDate,endDate,limit,offset){
        console.log('Start Date: ' + startDate);
        console.log('End Date: ' + endDate);
        console.log('Topic: ' + topic);
        console.log('Metric: ' + metric);
        console.log('limit: ' + limit);
        console.log('offset: ' + offset);
        return  axios({
            method: 'GET',
            url: Config.BASE_URL_CLOUD + '/metrics/valuesByTimestamp',
            params:{
                topic: topic,
                metric: metric,
                type: metricType,
                startDate: startDate,
                endDate: endDate,
                limit: limit,
                offset: offset
            },
            paramsSerializer: (params) => {
                return Qs.stringify(params);
            },
            auth:{
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
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
                username: UserCloudStore.userCloud,
                password: UserCloudStore.passCloud
            }
        })
    }

}

export default new MetricService();