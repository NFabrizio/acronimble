import React from 'react';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
// import ThumbsUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';

const AcronymList = () => (
  <div className="acronym-list">
    <Card className="acronym-card">
      <CardHeader
        title={<h3>PI</h3>}
        className="card-header"
        style={{padding: 8}}
      />
      <CardContent>
        Personal Information
      </CardContent>
      <CardContent>
        User's personal information!
      </CardContent>
      <CardActions>
        <Badge
          badgeContent={10}
          color="secondary"
          badgeStyle={{top: 18, right: 18}}
        >
          <IconButton tooltip="Like">
            <ThumbsUpIcon />
          </IconButton>
        </Badge>
      </CardActions>
    </Card>
  </div>
);

export default AcronymList;