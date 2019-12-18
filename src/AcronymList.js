import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import AcronymLike from './AcronymLike';
import NoResultsPage from './NoResultsPage';

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
  return list.map(item => {
    return <Chip label={item} style={{ marginLeft: 10 }} key={item} />;
  });
};

const isLiked = (likesIds, definitionId) => {
  return likesIds.some(likeId => {
    return likeId === definitionId;
  });
};

const AcronymList = props => {
  const { list = [], like, isAuthenticated, likesIds } = props;

  if ((Array.isArray(list) && !list.length) || !list.map) {
    return <NoResultsPage />;
  }

  return list.map(item => {
    const mostPopularDefinition = item.definitions.reduce((previous, current) => {
      const prevLikesLength = (previous && previous.likes && previous.likes.length) || 0;
      const currLikesLength = (current && current.likes && current.likes.length) || 0;

      return prevLikesLength > currLikesLength ? previous : current;
    });

    return (
      <Card className="acronym-card" key={item.acronym}>
        <Link to={`/acronyms/${item._id}`} style={{ color: 'black', textDecoration: 'none' }}>
          <CardHeader
            title={item.acronym}
            subheader={acronymCategories(item.category)}
            style={{ padding: 12, backgroundColor: '#bbb' }}
            classes={{ title: props.classes.title, subheader: props.classes.subheader }}
          ></CardHeader>
          <div style={{ padding: '16px 24px' }}>
            <CardContent style={{ fontSize: 18, padding: '0 40px 10px 0' }}>
              {mostPopularDefinition.name}
            </CardContent>
            <CardContent style={{ fontSize: 14, padding: '0 40px 0 0' }}>
              {mostPopularDefinition.description}
            </CardContent>
          </div>
        </Link>
        <AcronymLike
          style={{ position: 'absolute', top: 70, right: 14 }}
          like={like}
          likes={mostPopularDefinition.likes || []}
          definitionId={mostPopularDefinition.id}
          itemId={item._id}
          liked={isLiked(likesIds, mostPopularDefinition.id)}
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
