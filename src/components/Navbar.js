
import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AvatarImg from '../images/avatar2.png';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { logout } from '../store/actions/auth';
import PopModal from './PopModal';
import BlogModal from './BlogModal';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = (props) => {
  const { currentUser, logout } = props;
  const [open, setOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  }
  const handleBlogClose = () => {
    setBlogOpen(false);
  }

  const handleLogout = () => {
    logout();
  }
  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Bloggers.com
            </Typography>
            {window.location.pathname.substr(0, 11) == '/api/blogs/' ?
              null
              :
              <>
                <div className={classes.grow} />
                {
                  currentUser.isAuthenticated ?
                    <>
                      <Avatar alt="Remy Sharp" style={{ marginRight: '10px' }} src={AvatarImg} />
                      {currentUser.user.role === 'ADMIN' ? <Button variant="outlined" onClick={() => setOpen(true)} style={{ color: 'white', marginRight: '10px' }}>Add Content Writer</Button>
                        : <Button onClick={() => setBlogOpen(true)} variant="outlined" style={{ color: 'white', marginRight: '10px' }}>Add Blogs</Button>}
                      <Button variant="outlined" onClick={handleLogout} >Logout</Button>
                    </>
                    : null
                }
              </>
            }
          </Toolbar>
        </AppBar>
      </div>
      <PopModal open={open} handleClose={handleClose} type="Nav" />
      <BlogModal open={blogOpen} handleClose={handleBlogClose} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, { logout })(Navbar);