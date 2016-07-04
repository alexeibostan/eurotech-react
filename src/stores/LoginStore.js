/**
 * Created by alexei on 24/05/16.
 */
import BaseStore from './BaseStore';


class LoginStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._user = null;
        this._pass = null;
        this._role = null;
        this._defaultTopic = null;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case 'LOGIN_USER':
                this._pass = action.pass;
                this._user = action.user;
                this._role = action.role;
                this._defaultTopic = action.defaultTopic;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._user = null;
                this._pass = null;
                this._role = null;
                this._defaultTopic = null;
                this.emitChange();
                break;
            default:
                break;
        };
    }

    get user() {
        return this._user;
    }

    get defaultTopic() {
        return this._defaultTopic;
    }

    get pass() {
        return this._pass;
    }

    get role() {
        return this._role;
    }

    isLoggedIn() {
        return !!this._user;
    }
}

export default new LoginStore();