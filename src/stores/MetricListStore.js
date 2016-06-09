/**
 * Created by alexei on 07/06/16.
 */
import BaseStore from './BaseStore';

class MetricListStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = [];
        this._isLoaded = false;

    }

    _registerToActions(action){
        switch(action.actionType){
            case 'METRICS_GET':
                this._data = action.data;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'METRICS_GET_CLICK':
                this._data = action.data = [];
                this._isLoaded = false;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._isLoaded = false;
                this._data = [];
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get data() {
        return this._data;
    }

    get isLoaded(){
        return this._isLoaded;
    }

}

export default new MetricListStore();