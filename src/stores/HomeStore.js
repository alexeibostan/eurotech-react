/**
 * Created by alexei on 03/06/16.
 */
import BaseStore from './BaseStore';

class HomeStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._dataAlerts = [];
        this._isLoaded = false;

    }

    _registerToActions(action){
        switch(action.actionType){
            case 'ALERTS_GET':
                this._dataAlerts = action.data;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._isLoaded = false;
                this._dataAlerts = [];
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get dataAlerts() {
        return this._dataAlerts;
    }

    get isLoaded(){
        return this._isLoaded;
    }

}

export default new HomeStore();