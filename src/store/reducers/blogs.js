import {LOAD_BLOGS ,BLOG } from '../actionTypes';

 const blogs = (state =[] , action)=>{
     console.log(action)
    switch(action.type){
        case LOAD_BLOGS:
            return [...action.blogs];
        case BLOG:
            return action.blog      
        default:
           return state ;   
    }
}

export default blogs;