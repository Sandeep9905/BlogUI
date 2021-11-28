import {combineReducers} from 'redux';
import currentUser from './currentUser';
import error from './error';
import blogs from './blogs';
import writers from './writer';
// import messages from './messages';

const rootReducer = combineReducers({
    currentUser,error,blogs ,writers
});

export default rootReducer;