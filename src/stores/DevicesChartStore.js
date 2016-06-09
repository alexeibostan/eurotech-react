/**
 * Created by alexei on 31/05/16.
 */
import BaseStore from './BaseStore';

class DevicesChartStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = null;
        this._isLoaded = false;
        
    }

    _registerToActions(action){
        switch(action.actionType){
            case 'DATA_DEVICES_CHART_GET':
                this._data = action.data;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._isLoaded = false;
                this._data = null;
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

export default new DevicesChartStore();