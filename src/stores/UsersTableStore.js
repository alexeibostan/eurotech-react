/**
 * Created by alexei on 24/06/16.
 */
import BaseStore from './BaseStore';


class UsersTableStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._data = [];
        this._topicsData = [];
        this._isLoaded = false;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case 'USER_DEFAULT_TOPIC_UPDATED':
                console.log(action.index);
                console.log(this.data[action.index][action.field]);
                this._data[action.index][action.field] = action.value;
                this.emitChange();
                break;
            case 'USER_ROLES_UPDATED':
                console.log(action.index);
                console.log(this._data[action.index][action.field]);
                 this._data[action.index][action.field] = action.value;
                this.emitChange();
                break;
            case 'DATA_USERS_GET':
                this._data = action.data;
                this._topicsData = action.topicsData;
                this._isLoaded = true;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._data = [];
                this._topicsData = [];
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

    get topicsData() {
        return this._topicsData;
    }

    get isLoaded() {
        return this._isLoaded;
    }

}

export default new UsersTableStore();