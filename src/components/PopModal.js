import React, { useState } from 'react';
import { Modal, Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {AddNewContentWriter} from '../store/actions/writer';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        //   width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PopModal = (props) => {
    const { open, handleClose, type ,AddNewContentWriter} = props;
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [data ,setData] = useState({
        email:'',
        password:'',
        avatar:'',
        username:'',
    });

    const handleSubmit = (event) =>{
         event.preventDefault();
         AddNewContentWriter(data);
         window.location.reload();
         setData({
            email:'',
            password:'',
            avatar:'',
            username:'',
         });
    }

    const handleChange = (event) =>{
       event.preventDefault();
       setData({...data , [event.target.name]:event.target.value});
    }

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <Typography variant="h5">
                    {type === 'Nav' ? 'Create Content writer Account' : 'Edit'}
                </Typography>
                <Box>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    value={data.email}
                                    onChange={handleChange}
                                    style={{ margin: "10px" }}
                                />
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    value={data.username}
                                    onChange={handleChange}
                                    style={{ margin: "10px" }}
                                />
                                {type === 'Nav' ?
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="password"
                                        variant="outlined"
                                        value={data.password}
                                        onChange={handleChange}
                                        fullWidth
                                        style={{ margin: "10px" }}
                                    />
                                    :
                                    null
                                }

                                <TextField
                                    id="img"
                                    label="Image Url"
                                    variant="outlined"
                                    name="avatar"
                                    value={data.avatar}
                                    onChange={handleChange}
                                    fullWidth
                                    style={{ margin: "10px" }}
                                />
                                <Box>
                                    <Button style={{ margin: '0px 5px' }} onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                                    <Button type="submit" variant="outlined" color="primary">Save</Button>
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Modal>
    )
}


function mapStateToProps(state){
    return{
      errors : state.errors
    };
}

export default connect(mapStateToProps , {AddNewContentWriter})(PopModal);
