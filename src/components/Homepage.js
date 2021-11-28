import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import BlogImage from '../images/brand-blog-feature.jpg';
import BlogImage2 from '../images/blog_diseno.jpg';
import BloggerLogo from '../images/warbler-logo.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import AdminHomepage from './AdminHome';
import ContentHome from './ContentHome';
import Snackbar from '@material-ui/core/Snackbar';


const Homepage = (props) => {
    const { authUser, currentUser, errors ,removeError } = props;
    const [data, setData] = useState({
        email: '',
        password: ""
    });

       if(errors.message !== null){
        setTimeout(function(){ 
            removeError();
         }, 5000);
       }


    const handleSubmit = (event) => {
        event.preventDefault();
        authUser('signin', data).then(() => {
            this.props.history.push("/");
            setData({
                email: '',
                password: ""
            })
        }).catch(() => {
            return;
        });
    }
    return (
        <>
            {!currentUser.isAuthenticated ?
                <Grid container>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box >
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <img style={{ margin: '0px' }} src={BlogImage} height="100%" width="100%" alt="Bloging" />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <img style={{ margin: '0px' }} src={BlogImage2} height="100%" width="100%" alt="Blogging" />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <img style={{ marginTop: '-23px', marginBottom: '0px' }} src={BlogImage2} height="100%" width="100%" alt="Blogging" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box mt={7}>
                            <div style={{ margin: "0px 50%" }}>
                                <img src={BloggerLogo} width="70" height="70" alt="Blogger Logo" />
                            </div>
                            <Typography style={{ fontWeight: '600' }} variant="h4" align="center">Welcome to Blogger.com</Typography>
                            <Box style={{ width: '50%', margin: '0 auto' }}>
                                <form onSubmit={handleSubmit}>
                                    {errors.message &&
                                        <Box p={2} style={{backgroundColor:'#ffb3b3' ,color:"white" ,fontWeight:"600" ,borderRadius:'8px'}}> 
                                            {errors.message}
                                        </Box>
                                    }
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        color="secondary"
                                        value={data.email}
                                        onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
                                        fullWidth
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={data.password}
                                        color="secondary"
                                        onChange={(event) => setData({ ...data, [event.target.name]: event.target.value })}
                                        fullWidth
                                        style={{ marginTop: '10px' }}
                                    />
                                    <Typography variant="subtitle2" style={{ fontWeight: '600', color: 'grey' }}>Forgot your password?</Typography>
                                    <Button type="submit" style={{ width: "100%", marginTop: '20px', fontWeight: "700" }} variant="contained" color="secondary">
                                        Login
                                    </Button>
                                    <Typography variant="subtitle2" align="center" style={{ fontWeight: "700", margin: '10px' }}>OR</Typography>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<FacebookIcon />}
                                        style={{ width: "100%", marginTop: '10px', backgroundColor: "#4267B2", color: "white", fontWeight: "700" }}
                                    >
                                        Continue with Facebook
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<FacebookIcon />}
                                        style={{ width: "100%", marginTop: '10px', backgroundColor: '#4285F4', color: "white", fontWeight: "700" }}
                                    >
                                        Continue with Google
                                    </Button>
                                </form>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
                :
                currentUser.user.role === 'ADMIN' ? <AdminHomepage /> : <ContentHome />
            }
        </>
    )
}

export default Homepage;