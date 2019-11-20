import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import AcronymLike from './AcronymLike';
import { getCategoryName } from './utils/utils';
import { lensById } from './utils/ramda';

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
    return <Chip label={item} key={item} style={{ marginLeft: 10, float: 'right' }} />;
  });
};

class AcronymPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acronym: {},
      categories: [],
      loading: true
    };

    this.like = this.like.bind(this);
  }

  componentDidMount() {
    axios.get(`/acronyms/${this.props.match.params.id}`).then(res => {
      this.setState({
        acronym: res.data,
        loading: false
      });
    });
    axios.get('/categories').then(res => {
      this.setState({
        categories: res.data || []
      });
    });
  }

  isLiked(likesIds, definitionId) {
    return likesIds.some(likeId => {
      return likeId === definitionId;
    });
  }

  like(itemId, definitionId, liked) {
    const definitionIndex = this.state.acronym.definitions.findIndex(definition => {
      return definition.id === definitionId;
    });

    if (definitionIndex < 0) {
      return;
    }

    const request = liked
      ? axios.delete(`/definitions/${definitionId}/likes`)
      : axios.put(`/definitions/${definitionId}/likes`, {});

    const { auth } = this.props;
    request.then(() => {
      this.setState(prevState => {
        const likesLens = R.compose(
          R.lensProp('definitions'),
          lensById(definitionId),
          R.lensProp('likes')
        );

        const likesView = R.view(likesLens, prevState.acronym);
        const action = liked
          ? R.filter(id => id !== auth.userProfile.sub)
          : R.append(auth.userProfile.sub);
        const newAcronym = R.set(likesLens, action(likesView), prevState.acronym);

        return { acronym: newAcronym };
      });

      if (liked) {
        return this.props.removeFromLikes(definitionId);
      }

      this.props.addToLikes(definitionId);
    });
  }

  renderDefs(auth, likesIds, item) {
    return item && item.definitions && item.definitions.map && item.definitions.map((definition, index) => (
      <div key={`defintion.name-${index}`} style={{ borderBottom: 'solid 1px #000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '6fr 2fr' }}>
          <CardContent style={{ fontSize: 18, paddingBottom: 10, gridArea: '1/1/auto/auto' }}>
            {definition.name}
          </CardContent>
          <div style={{ gridArea: '1/2/auto/auto', paddingTop: 16, paddingRight: 24 }}>
            {acronymCategories(definition.categories
              && getCategoryName(this.state.categories, definition.categories))}
          </div>
        </div>
        <CardContent style={{ fontSize: 14, paddingTop: 0, paddingBottom: 24 }}>
          {definition.description}
        </CardContent>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
          <AcronymLike
            style={{ gridArea: '1/1/auto/auto' }}
            like={this.like}
            likes={definition.likes || []}
            definitionId={definition.id}
            itemId={item._id}
            liked={this.isLiked(likesIds, definition.id)}
            isAuthenticated={auth.isAuthenticated()}
          />
          <CardContent
            style={{
              fontSize: 14,
              padding: '30px 24px 16px',
              gridArea: '1/2/auto/auto',
              textAlign: 'right'
            }}
          >
            Submitted by {auth && auth.userProfile && auth.userProfile.nickname}
          </CardContent>
        </div>
      </div>
      )
    );
  }

  render() {
    const item = this.state.acronym;
    const { auth, likesIds } = this.props;
    if (this.state.loading) {
      return 'loading...';
    }

    return (
      <Card className="acronym-card">
        <CardHeader
          title={item.acronym}
          subheader={<div style={{ fontSize: 16, paddingTop: 6 }}>Top Definition!</div>}
          style={{ padding: 10, paddingLeft: 16, paddingRight: 16, backgroundColor: '#b0c4de' }}
          classes={{ title: this.props.classes.title, subheader: this.props.classes.subheader }}
        ></CardHeader>
        {this.renderDefs(auth, likesIds, item)}
      </Card>
    );
  }
}

AcronymPage.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  item: PropTypes.object
};

export default withStyles(styles)(AcronymPage);
