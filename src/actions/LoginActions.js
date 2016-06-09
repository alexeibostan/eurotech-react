/**
 * Created by alexei on 24/05/16.
 */
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { hashHistory } from 'react-router';

export default {
    loginUser: (user,pass) => {
AppDispatcher.dispatch({
    actionType: 'LOGIN_USER',
    pass: pass,
    user:user
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
