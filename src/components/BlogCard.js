import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import blogs from '../store/reducers/blogs';
import { fetchAllBlogs, approveBlog } from '../store/actions/blogs';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "10px"
  },
  media: {
    height: 140,
  },
});

const BlogCard = (props) => {
  const { _id, status, image, description, header, publisher } = props;
  const classes = useStyles();
  const handleApproved = () => {
    if (props.currentUser.user.role === 'ADMIN') {
      props.approveBlog(_id);
      window.location.reload();
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={header}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description.substr(0, 150)} ....
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          props.currentUser.user.role === 'ADMIN' ?

            status === 'NOTAPPROVED' ?
              <Button size="small" color="primary" onClick={handleApproved}>
                Approve
              </Button>
              :
              <Button size="small" color="secondary">
                Approved blog
              </Button>
            :
            status === 'NOTAPPROVED' ?
              <Button size="small" color="primary">
                Not Approved By Admin
              </Button>
              :
              <Button size="small" color="secondary">
                Approved By Admin
              </Button>

        }
        <Link to={`/api/blogs/${_id}`}>
          <Button size="small" color="primary">
            Go to Website
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    blogs: state.blogs,
  };
}


export default connect(mapStateToProps, { fetchAllBlogs, approveBlog })(BlogCard);