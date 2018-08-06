import React from 'react';
// import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
// import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
// import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from 'material-ui/styles';
// import { Link } from 'react-router-dom';

const styles = {
  badge: {
    top: -6,
    right: -6
  }
};

class AcronymLike extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);

    // const liked = this.isLiked(this.props);

    // this.state = {
    //   likes: this.props.likes,
    //   liked
    // };
  }

  // isLiked(props) {
  //   if (!props.auth || !props.auth.userProfile) {
  //     return false;
  //   }

  //   const { likes = [] } = props.auth.userProfile;
  //   return likes.some((like) => {
  //     return like.definitions[0].id === props.definitionId
  //   });
  // }

  clickHandler() {
    if (!this.props.isAuthenticated || this.props.liked) {
      return;
    }

    // this.setState(prevState => ({
    //   liked: true,
    //   likes: prevState.likes.concat([this.props.auth.userProfile.sub])
    // }));

    this.props.like(this.props.itemId, this.props.definitionId);
  }

  render() {
    return (
      <CardActions style={this.props.style}>
        <Badge
          badgeContent={this.props.likes.length}
          color="secondary"
          classes={{ badge: this.props.classes.badge }}
        >
          <IconButton tooltip="Like" onClick={this.clickHandler}>
            <ThumbsUpIcon style={{ fontSize: 28, color: this.props.liked ? 'blue' : 'black' }} />
          </IconButton>
        </Badge>
      </CardActions>
    );
  }
}

export default withStyles(styles)(AcronymLike);
