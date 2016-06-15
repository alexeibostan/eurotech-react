/**
 * Created by alexei on 15/06/16.
 */
import BaseStore from './BaseStore';


class UserCloudStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._userCloud = null;
        this._passCloud = null;
        this._data = null;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case 'GET_DATA_USER_CLOUD':
                this._data = action.data;
                this.emitChange();
                break;
            case 'REMOVE_USER_CLOUD':
                this._passCloud = null;
                this._userCloud = null;
                this.emitChange();
                break;
            case 'ADD_USER_CLOUD':
                this._passCloud = action.passCloud;
                this._userCloud = action.userCloud;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._passCloud = null;
                this._userCloud = null;
                this._data = null;
                this.emitChange();
                break;
            default:
                break;
        };
    }

    get data(){
        return this._data;
    }
    get userCloud() {
        return this._userCloud;
    }

    get passCloud() {
        return this._passCloud;
    }

}

export default new UserCloudStore();