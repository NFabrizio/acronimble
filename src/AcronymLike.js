import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from '@material-ui/styles';
import history from './utils/history';

const styles = {
  badge: {
    top: -6,
    right: -6
  }
};

const clickHandler = (like, definitionId, itemId, liked, isAuthenticated) => {
  if (!isAuthenticated) {
    return history.push(`/login?itemId=${itemId}&definitionId=${definitionId}`);
  }

  like(itemId, definitionId, liked);
};

const AcronymLike = props => {
  const { like, likes = [], definitionId, itemId, liked, isAuthenticated } = props;

  return (
    <CardActions style={props.style}>
      <Badge badgeContent={likes.length} color="secondary" classes={{ badge: props.classes.badge }}>
        <IconButton
          tooltip="Like"
          onClick={() => clickHandler(like, definitionId, itemId, liked, isAuthenticated)}
        >
          <span className="sr-only">
            {props.liked ? 'Click to unlike this definition' : 'Click to like this definition'}
          </span>
          <ThumbsUpIcon style={{ fontSize: 28, color: props.liked ? 'blue' : 'black' }} />
        </IconButton>
      </Badge>
    </CardActions>
  );
};

export default withStyles(styles)(AcronymLike);
