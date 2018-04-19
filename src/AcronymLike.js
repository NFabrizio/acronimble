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

class AcronymLike extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      liked: this.props.liked
    };
  }

  clickHandler() {
    this.setState(prevState => ({
      liked: !prevState.liked
    }));

    this.props.like(this.props.definitionId);
  }

  render() {
    return (
      <CardActions style={this.props.style}>
        <Badge
          badgeContent={this.props.likes}
          color="secondary"
          classes={{badge: this.props.classes.badge}}
        >
          <IconButton tooltip="Like" onClick={this.clickHandler}>
            <ThumbsUpIcon style={{fontSize: 28}} />
          </IconButton>
        </Badge>
      </CardActions>
    );
  }
}

export default withStyles(styles)(AcronymLike);
