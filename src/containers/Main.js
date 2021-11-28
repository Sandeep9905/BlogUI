import React from 'react';
import {Routes ,Route } from 'react-router-dom';
import Homepage from '../components/Homepage';
import {connect} from 'react-redux';
import Blog from '../components/Blog';
import ContentWriter from '../components/AllContentWriter';
import AllContentWriter from '../components/AllContentWriter';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/error';
import AllBlogs from '../components/ContentHome';
import withAuth from '../hocs/withAuth';


const Main = (props) =>{
    const {currentUser ,errors} = props;
    return(
       <div>
           <Routes>
                <Route exact path="/" element={ <Homepage errors={errors} removeError={removeError} currentUser={currentUser} {...props} />} />
                <Route exact path="/api/blogs/:blog_id" element={<Blog/>}/>
                <Route exact path="/api/contentwriter" element={<AllContentWriter/>}/>
                <Route exact path="/api/allBlogs" element={<AllBlogs/>}/>
                {/* <Route exact path="/signup" render={
                    props=>{
                        return(
                            <AuthForm removeError={removeError} errors={errors} onAuth={authUser} signup {...props} heading="Join warbler Today!" buttonText="Sign me up" />
                        )
                    }
                } />
                <Route exact path="/signin" render={
                    props=>{
                        return(
                            <AuthForm removeError={removeError} errors={errors} onAuth={authUser} {...props} heading="Welocme Back" buttonText="Log in" />
                        )
                    }
                } />
                <Route path="/api/user/:id/messages/new" component = {withAuth(MessageForm)}/> */}
            </Routes>
       </div>
    )
}


function mapStateToProps(state){
    return{
      currentUser:state.currentUser,
      errors:state.error
    }
}

export default connect(mapStateToProps , {authUser ,removeError})(Main);