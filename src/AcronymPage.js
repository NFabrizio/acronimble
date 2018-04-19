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
      <Chip label={item} style={{marginLeft: 10, float: 'right'}} />
    );
  });
};

const AcronymPage = (props) => {
  const { item } = props;
  return (
    <Card className="acronym-card">
      <CardHeader
        title={<span style={{display: 'inline'}}>{item.title}</span>}
        style={{padding: 10, paddingLeft: 16, backgroundColor: '#b0c4de'}}
        classes={{title: props.classes.title, subheader: props.classes.subheader}}
      >
      </CardHeader>
      <div style={{display: 'grid', gridTemplateColumns: '7fr 2fr'}}>
        <CardContent style={{fontSize: 18, paddingBottom: 10, gridArea: '1/1/auto/auto'}}>
          {item.fullName}
        </CardContent>
        <div style={{gridArea: '1/2/auto/auto', padding: 10}}>
          {acronymCategories(item.category)}
        </div>
      </div>
      <CardContent style={{fontSize: 14, paddingTop: 0, paddingBottom: 24}}>
        {item.description}
      </CardContent>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
        <CardActions style={{gridArea: '1/1/auto/auto'}} >
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
        <CardContent style={{fontSize: 14, paddingBottom: 10, gridArea: '1/2/auto/auto', textAlign: 'right'}}>
          Submitted by {item.added.by} on {item.added.date}
        </CardContent>
      </div>
    </Card>
  );
};

AcronymPage.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withStyles(styles)(AcronymPage);
