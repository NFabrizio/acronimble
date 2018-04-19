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
      <Chip label={item} style={{marginLeft: 10}} key={item}/>
    );
  });
};

const AcronymList = (props) => {
  return props.list.map((item) => {
    return (
      <Card className="acronym-card" key={item.title}>
        <div onClick={() => props.clickHandler(item.title)}>
          <CardHeader
            title={item.title}
            subheader={acronymCategories(item.category)}
            style={{padding: 12, backgroundColor: '#bbb'}}
            classes={{title: props.classes.title, subheader: props.classes.subheader}}
          >
          </CardHeader>
          <div style={{padding: '16px 24px'}}>
            <CardContent style={{fontSize: 18, padding: '0 40px 10px 0'}}>
              {item.fullName}
            </CardContent>
            <CardContent style={{fontSize: 14, padding: '0 40px 0 0'}}>
              {item.description}
            </CardContent>
          </div>
        </div>
        <CardActions style={{position: 'absolute', top: 70, right: 14}}>
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
    );
  });
};

AcronymList.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  clickHandler: PropTypes.func
};

export default withStyles(styles)(AcronymList);