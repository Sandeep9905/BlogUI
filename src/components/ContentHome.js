import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import BlogCard from './BlogCard';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { fetchAllBlogs, getUserBlogs } from '../store/actions/blogs';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth';


const ContentHome = (props) => {
    const { currentUser, fetchAllBlogs, blogs, getUserBlogs } = props;
    useEffect(() => {
        props.currentUser.user.role === 'CONTENT-WRITER' ? getUserBlogs() : fetchAllBlogs();
    }, []);
    return (
        <>
            <Box style={{ marginTop: '20px' }}>

                <Typography align="center" variant="h3">Blogs</Typography>
                <Grid container>
                    {blogs.length === 0 ? 
                    <Box m={3} p={4} style={{backgroundColor:'#ffcce0' ,width:"100%"}}>
                      <Typography variant="h1" align="center">No Blogs Created</Typography>
                    </Box> :
                        blogs.map((res, index) => (
                            <Grid item xs={12} sm={12} md={3}>
                                <BlogCard currentUser={currentUser} {...res} key={index} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    )
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        blogs: state.blogs,
    };
}


export default connect(mapStateToProps, { fetchAllBlogs, getUserBlogs })(withAuth(ContentHome));
