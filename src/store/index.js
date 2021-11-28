import rootReducer from './reducers';
import {applyMiddleware , compose , createStore} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(){
    const store =createStore(rootReducer ,
                             compose(applyMiddleware(thunk))
        );
     return store;   
}