/**
 * Created by alexei on 24/05/16.
 */
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { hashHistory } from 'react-router';

export default {
    removeUserCloud:() => {
        AppDispatcher.dispatch({
            actionType: 'REMOVE_USER_CLOUD'
        });
    },
    addUserCloud:(userCloud,passCloud) => {
        AppDispatcher.dispatch({
            actionType: 'ADD_USER_CLOUD',
            passCloud: passCloud,
            userCloud:userCloud
        });
    },
    loginUser: (user,pass,role) => {
        AppDispatcher.dispatch({
            actionType: 'LOGIN_USER',
            pass: pass,
            user: user,
            role: role
        });

        hashHistory.push('/dashboard');
        console.log('Called Event Login');

    },
    logoutUser: () => {
        sessionStorage.removeItem('pass');
        sessionStorage.removeItem('user');
        hashHistory.push('/login');
        AppDispatcher.dispatch({
            actionType: 'LOGOUT_USER'
        });
    }
}
