import { apiCall} from '../../services/api';
import {LOAD_CONTENT_WRITER} from '../actionTypes';
import { addError} from './error';

export const loadWriter = writers =>(
    {
        type:LOAD_CONTENT_WRITER,
        writers
    }
)

export const fetchAllContentWriter = ()=>{
    return dispatch =>{
       return apiCall("get","/api/admin/allcontent_writer")
       .then(res=>{
         dispatch(loadWriter(res))
        })
       .catch(err=>{
         addError(err.message)
       });
    };
 };


 export const AddNewContentWriter = data =>(dispatch , getState)=>{
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("post","/api/admin/addcontent_writer",data)
    .then(res =>{})
    .catch(err => dispatch(addError(err.messages)));
 }