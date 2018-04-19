import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

const styles = {
  badge: {
    top: -6,
    right: -6
  }
};

const AcronymLike = (props) => {
  return (
    <CardActions style={props.style}>
      <Badge
        badgeContent={10}
        color="secondary"
        classes={{badge: props.classes.badge}}
      >
        <IconButton tooltip="Like">
          <ThumbsUpIcon style={{fontSize: 28}} />
        </IconButton>
      </Badge>
    </CardActions>
  );
};

AcronymLike.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  clickHandler: PropTypes.func
};

export default withStyles(styles)(AcronymLike);
