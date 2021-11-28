import React ,{useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Box, Paper } from '@material-ui/core';
import ContentCard from './ContentCard';
import {fetchAllContentWriter} from '../store/actions/writer';
import {connect} from 'react-redux';
import withAuth from '../hocs/withAuth';

const AllContentWriter = (props) => {
    const {currentUser ,fetchAllContentWriter , writers} = props;
    debugger;
    useEffect(()=>{
        fetchAllContentWriter();
    },[]);
    return (
        <>
            <Box  style={{marginLeft:'80px' ,marginRight:'80px'}}>
                <Typography style={{margin:'30px 0px'}}  variant="h3" align="center">
                    Content Writer
                </Typography>
                <Grid container>
                    {writers.map((res, index) => (
                        <Grid xs={12} sm={12} md={12}>
                            <ContentCard key={index} {...res} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
        writers:state.writers,
    };
}

export default connect(mapStateToProps ,{fetchAllContentWriter})(withAuth(AllContentWriter));