import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography ,Avatar } from '@material-ui/core';
import AvatarLogo from '../images/avatar.jpg';
import {connect} from 'react-redux';
import {fetchSingleBlog} from '../store/actions/blogs';
import moment from 'moment';
import { useParams } from 'react-router-dom';
const Blog = (props) => {
    const {blog_id} = useParams();
    const {fetchSingleBlog , blog} = props;
    console.log('ppp',blog);
    useEffect(()=>{
        props.fetchSingleBlog(blog_id);
    },[]);
    
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <Box style={{margin:'80px 40px' ,display:'flex',justifyContent:'space-between',alignItems:'baseline', paddingBottom:'80px'}} >
                        <Box>
                            <Typography style={{fontSize:'150px' ,color:'white', fontWeight:'800' ,backgroundImage:`url(${blog.image})` ,backgroundSize:'cover' ,backgroundPosition:'center'}}>{ blog.header ?blog.header.charAt(0):''}</Typography>
                        </Box>
                        <Box>
                        <Typography variant="subtitle1" style={{fontWeight:"700" , color:'grey'}} align="right">
                            {moment(blog.createdAt).format('MMMM Do YYYY')}
                        </Typography>
                        <Typography variant="subtitle1" style={{fontWeight:"800" ,marginTop:'0px'}} align="right">
                            Featured Story
                        </Typography>
                        </Box>
                    </Box>
                    <Box style={{margin:'20px'}}>
                        <Typography variant="h3">{blog.header}</Typography>
                        <Typography variant="body2">
                           {blog.description}
                        </Typography>
                        <Box justifyContent="right" mt={5} display="flex" alignItems="center">
                        <Avatar src={AvatarLogo} />
                        <Typography style={{marginLeft:'30px',fontWeight:'600' }} variant="body2">
                          By {blog.publisher}
                        </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Box m={0} p={3}>
                        <img width="100%" height="80%" src={blog.image} alt="Blf" />
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      blog:state.blogs,
    }
  }
  
  
  export default connect(mapStateToProps , {fetchSingleBlog})(Blog);