import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from 'material-ui/styles';

const styles = {
  badge: {
    top: -6,
    right: -6
  },
  title: {
    display: 'inline'
  },
  subheader: {
    display: 'inline',
    float: 'right'
  }
};

const acronymCategories = (list) => {
  return list.map((item) => {
    return (
      <Chip label={item} style={{marginLeft: 10}} />
    );
  });
};

const AcronymList = (props) => {
  return props.list.map((item) => {
    return (
      <div className="acronym-list">
        <Card className="acronym-card">
          <CardHeader
            title={<span style={{display: 'inline'}}>{item.title}</span>}
            subheader={acronymCategories(item.category)}
            style={{padding: 10, paddingLeft: 16, backgroundColor: '#bbb'}}
            classes={{title: props.classes.title, subheader: props.classes.subheader}}
          >
          </CardHeader>
          <CardContent style={{fontSize: 18, paddingBottom: 10}}>
            {item.fullName}
          </CardContent>
          <CardContent style={{fontSize: 14, paddingTop: 0, paddingBottom: 24}}>
            {item.description}
          </CardContent>
          <CardActions style={{position: 'absolute', top: 70, right: 8}}>
            <Badge
              badgeContent={10}
              color="secondary"
              classes={{badge: props.classes.badge}}
            >
              <IconButton tooltip="Like" >
                <ThumbsUpIcon style={{fontSize: 28}} />
              </IconButton>
            </Badge>
          </CardActions>
        </Card>
      </div>
    );
  });
};

AcronymList.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AcronymList);
