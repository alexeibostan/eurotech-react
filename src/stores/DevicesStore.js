/**
 * Created by alexei on 27/05/16.
 */
import BaseStore from './BaseStore';

class DevicesStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._devices = [];
        this._pages = 0;
        this._isLoaded = false;
        this._currentPage = 1;
    }

    _registerToActions(action){
        switch(action.actionType){
            case 'PAGE_CHANGE':
                this._currentPage = action.deviceCurrentPage;
                this._isLoaded = false;
                this.emitChange();
                break;
            case 'PAGES_GET':
                this._pages = parseInt(action.devicePageNumber);
                this.emitChange();
                break;
            case 'DEVICES_GET':
                this._devices = action.devices;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._isLoaded = false;
                this._devices = [];
                this._pages = 0;
                this._currentPage = 1;
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get devices() {
        return this._devices;
    }
    get pages(){
        return this._pages;
    }
    get currentPage(){
        return this._currentPage;
    }
    get isLoaded(){
        return this._isLoaded;
    }
}

export default new DevicesStore();