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
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case 'LOGIN_USER':
                this._pass = action.pass;
                this._user = action.user;
                this.emitChange();
                break;
            case 'LOGOUT_USER':
                this._user = null;
                this._pass = null;
                this.emitChange();
                break;
            default:
                break;
        };
    }

    get user() {
        return this._user;
    }

    get pass() {
        return this._pass;
    }
    get userCloud() {
        return this._userCloud;
    }

    get passCloud() {
        return this._passCloud;
    }

    isLoggedIn() {
        return !!this._user;
    }
}

export default new LoginStore();