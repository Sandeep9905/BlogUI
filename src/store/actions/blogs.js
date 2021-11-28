
import { apiCall } from '../../services/api';
import { LOAD_BLOGS ,BLOG} from '../actionTypes';
import { addError } from './error';

export const loadBlogs = blogs => (
  {
    type: LOAD_BLOGS,
    blogs
  }
)

export const singleBlog = blog =>(
  {
    type:BLOG ,
    blog
  }
)

export const fetchSingleBlog = ( blogid)=>(dispatch , getState)=>{
  return apiCall("get", `/api/${blogid}`)
    .then(res => {
      dispatch(singleBlog(res))
    })
    .catch(err => dispatch(addError(err.messages)));
}




export const fetchAllBlogs = () => {
  return dispatch => {
    return apiCall("get", "/api/admin/allblogs")
      .then(res => {
        dispatch(loadBlogs(res))
      })
      .catch(err => {
        addError(err.message)
      });
  };
};

export const getUserBlogs = () => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id.toString();
  return apiCall("get", `/api/blog/${id}/getallblogs`)
    .then(res => {
      dispatch(loadBlogs(res))
    })
    .catch(err => dispatch(addError(err.messages)));
}

export const AddNewBlogs = data => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/blog/${id}/create_blog`, data)
    .then(res => { })
    .catch(err => dispatch(addError(err.messages)));
}

export const approveBlog = (blogid)=> (dispatch, getState) => {
  return apiCall("put", `/api/admin/${blogid}`)
    .then(res => { })
    .catch(err => dispatch(addError(err.messages)));
}