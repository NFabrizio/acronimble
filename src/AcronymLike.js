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

const clickHandler = (isAuthenticated, liked, like, itemId, definitionId) => {
  if (!isAuthenticated || liked) {
    return;
  }

  like(itemId, definitionId);
};

const AcronymLike = (props) => {
  const { like, likes, definitionId, itemId, liked, isAuthenticated } = props;

  return (
    <CardActions style={props.style}>
      <Badge
        badgeContent={likes.length}
        color="secondary"
        classes={{ badge: props.classes.badge }}
      >
        <IconButton
          tooltip="Like"
          onClick={() => clickHandler(isAuthenticated, liked, like, itemId, definitionId)}
        >
          <ThumbsUpIcon style={{ fontSize: 28, color: props.liked ? 'blue' : 'black' }} />
        </IconButton>
      </Badge>
    </CardActions>
  );
};

export default withStyles(styles)(AcronymLike);
