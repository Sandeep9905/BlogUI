import {LOAD_CONTENT_WRITER} from '../actionTypes';

 const writers = (state =[] , action)=>{
    switch(action.type){
        case LOAD_CONTENT_WRITER:
            return [...action.writers];
        default:
           return state ;   
    }
}

export default writers;