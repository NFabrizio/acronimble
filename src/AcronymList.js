import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
// import Badge from 'material-ui/Badge';
// import IconButton from 'material-ui/IconButton';
// import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import AcronymLike from './AcronymLike';

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

const acronymCategories = (list = []) => {
  return list.map((item) => {
    return (
      <Chip label={item} style={{ marginLeft: 10 }} key={item} />
    );
  });
};

const isLiked = (likesIds, definitionId) => {
  return likesIds.some((likeId) => {
    return likeId === definitionId
  });
};

const AcronymList = (props) => {
  const { list, like, isAuthenticated, likesIds } = props;
  return list.map((item) => {
    return (
      <Card className="acronym-card" key={item.acronym}>
        <Link to={`/acronyms/${item._id}`} style={{ color: 'black', textDecoration: 'none' }}>
          <CardHeader
            title={item.acronym}
            subheader={acronymCategories(item.category)}
            style={{ padding: 12, backgroundColor: '#bbb' }}
            classes={{ title: props.classes.title, subheader: props.classes.subheader }}
          >
          </CardHeader>
          <div style={{ padding: '16px 24px' }}>
            <CardContent style={{ fontSize: 18, padding: '0 40px 10px 0' }}>
              {item.definitions[0].name}
            </CardContent>
            <CardContent style={{ fontSize: 14, padding: '0 40px 0 0' }}>
              {item.definitions[0].description}
            </CardContent>
          </div>
        </Link>
        <AcronymLike
          style={{ position: 'absolute', top: 70, right: 14 }}
          like={like}
		      likes={item.definitions[0].likes || []}
          definitionId={item.definitions[0].id}
          itemId={item._id}
          liked={isLiked(likesIds, item.definitions[0].id)}
          isAuthenticated={isAuthenticated}
        />
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
