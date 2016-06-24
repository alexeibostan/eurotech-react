/**
 * Created by alexei on 24/06/16.
 */
import BaseStore from './BaseStore';


class UsersTableStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = [];
        this._isLoaded = false;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case 'USERS_GET':
                this._data = action.data;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._data = [];
                this._isLoaded = false;
                this.emitChange();
                break;
            default:
                break;
        };
    }

    get data() {
        return this._data;
    }

    get isLoaded() {
        return this._isLoaded;
    }

}

export default new UsersTableStore();