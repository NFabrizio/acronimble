import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';

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

const NoResultsPage = () => {
  return (
    <Card>
      <CardHeader />
      <div style={{padding: '0px 24px 16px 24px'}}>
        <CardContent style={{fontSize: 18, padding: '0 40px 10px 0'}}>
          No results found. Try again.
        </CardContent>
        </div>
    </Card>
  );
};

export default withStyles(styles)(NoResultsPage);
