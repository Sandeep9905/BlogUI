import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Button, Modal ,TextField } from '@material-ui/core';
import Avatar from '../images/avatar2.png';
import PopModal from './PopModal';



const ContentCard = (props) => {
    const { email, image, username, blogs } = props;
    const [open, setOpen] = useState(false)

    const handleEdit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Paper>
                <Box m={1} p={1}>
                    <Grid container>
                        <Grid item xs={2} sm={2} md={2}>
                            <Box style={{ width: '100px', height: '100px' }}>
                                <img style={{ margin: '0px 50%' }} width="100%" height="100%" src={image || Avatar} alt="" />
                            </Box>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <Typography variant="h5">{username}</Typography>
                            <Typography>Number of Blogs :{blogs.length}</Typography>
                            <Typography>{email}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>

                        </Grid>
                        <Grid item xs={1} sm={1} md={1}>
                            <Button onClick={handleEdit} style={{ marginTop: '10px' }} size="small" variant="outlined" color="secondary">
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <PopModal open={open} handleClose={handleClose} />

        </>
    )
}
export default ContentCard;