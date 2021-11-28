import React, { useState } from 'react';
import { Modal, Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {AddNewBlogs} from '../store/actions/blogs';
// import {AddNewContentWriter} from '../store/actions/writer';

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

const BlogModal = (props) => {
    const { open, handleClose, AddNewBlogs , currentUser } = props;
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [data, setData] = useState({
        header: '',
        description: '',
        publisher: props.currentUser.user.username,
        image: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        AddNewBlogs(data);
        window.location.reload();
        setData({
            header: '',
            description: '',
            publisher: '',
            image: '',
        });
    }

    const handleChange = (event) => {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value });
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
                    Create Blog
                </Typography>
                <Box>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="header"
                                    label="header"
                                    name="header"
                                    variant="outlined"
                                    fullWidth
                                    value={data.header}
                                    onChange={handleChange}
                                    style={{ margin: "10px" }}
                                />
                                <TextField
                                    id="image"
                                    name="image"
                                    label="Image URL"
                                    variant="outlined"
                                    fullWidth
                                    value={data.image}
                                    onChange={handleChange}
                                    style={{ margin: "10px" }}
                                />

                                <TextField
                                    id="publisher"
                                    label="publisher"
                                    variant="outlined"
                                    name="publisher"
                                    value={data.publisher}
                                    disabled
                                    onChange={handleChange}
                                    fullWidth
                                    style={{ margin: "10px" }}
                                />
                                <TextField
                                    id="description"
                                    label="description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={data.description}
                                    onChange={handleChange}
                                    style={{ margin: "10px" }}
                                    variant="outlined"
                                    fullWidth
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


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default connect(mapStateToProps, {AddNewBlogs})(BlogModal);
