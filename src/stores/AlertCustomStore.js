/**
 * Created by alexei on 09/06/16.
 */
import BaseStore from './BaseStore';

class AlertCustomStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = null;
        this._alertVisible = false;

    }

    _registerToActions(action){
        switch(action.actionType){
            case 'ALERT_SET_ON':
                this._data = action.data;
                this._alertVisible = true;
                this.emitChange();
                break;
            case 'ALERT_SET_OFF':
                this._data = null;
                this._alertVisible = false;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._alertVisible = false;
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

    get alertVisible(){
        return this._alertVisible;
    }

}

export default new AlertCustomStore();