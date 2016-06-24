/**
 * Created by alexei on 07/06/16.
 */
import BaseStore from './BaseStore';

class MetricChartStrore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = null;
        this._range = null;
        this._topic = null;
        this._metric = null;
        this._limit = 100;
        this._offset = 0;
        this._metricType = null;
        this._isLoaded = true;

    }

    _registerToActions(action){
        switch(action.actionType){
            case 'INCREMENT_OFFSET':
                this._offset += this._limit;
                break;
            case 'DECREMENT_OFFSET':
                this._offset -= this._limit;
                break;
            case 'TOPIC_SELECTED':
                this._topic = action.topic;
                break;
            case 'METRIC_SELECTED':
                this._metric = action.metric;
                this._metricType = action.metricType;
                break;
            case 'DATA_CHART_SET_RANGE':
                this._range = action.range;
                break;
            case 'DATA_CHART_GET':
                this._data = action.data;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'DATA_CHART_CLICK':
                this._isLoaded = false;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._limit = 100;
                this._offset = 0;
                this._isLoaded = true;
                this._data = null;
                this._range = null;
                this._topic = null;
                this._metric = null;
                this._metricType = null;
                break;
            default:
                break;
        }
    }

    get data() {
        return this._data;
    }
    get range() {
        return this._range;
    }

    get offset() {
        return this._offset;
    }
    get limit() {
        return this._limit;
    }

    get metric() {
        return this._metric;
    }

    get metricType() {
        return this._metricType;
    }

    get topic() {
        return this._topic;
    }

    get isLoaded(){
        return this._isLoaded;
    }
    
    get queryBool(){
        return this._queryBool;
    }

}

export default new MetricChartStrore();