import * as R from 'ramda';
import axios from 'axios';
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField, InputAdornment, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import queryString from 'query-string';
import AcronymList from './AcronymList';
import './App.css';
import { lensBy_Id, lensById } from './utils/ramda';
import history from './utils/history';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acronyms: [],
      acronymTitle: '',
      anchorElement: null,
      showAcronym: false,
      loading: true,
      search: ''
    };

    this.like = this.like.bind(this);
  }

  componentDidMount() {
    axios.get('/acronyms').then(res => {
      this.setState({ acronyms: res.data, loading: false });
    });

    const { itemId, definitionId } = queryString.parse(this.props.location.search);

    if (itemId && definitionId) {
      this.like(itemId, definitionId);
    }
  }

  like(itemId, definitionId, liked) {
    const { auth } = this.props;

    const request = liked
      ? axios.delete(`/definitions/${definitionId}/likes`)
      : axios.put(`/definitions/${definitionId}/likes`, {});

    request.then(() => {
      const acronyms = this.state.acronyms;
      const userId = auth && auth.userProfile && auth.userProfile.sub;

      const likesLens = R.compose(
        lensBy_Id(itemId),
        R.lensProp('definitions'),
        lensById(definitionId),
        R.lensProp('likes')
      );
      const likesView = R.view(likesLens, acronyms);
      const action = liked ? R.filter(id => id !== userId) : R.append(userId);
      const newAcronyms = R.set(likesLens, action(likesView), acronyms);

      if (this.props.location.search) {
        return history.replace('/');
      }

      this.setState({
        acronyms: newAcronyms
      });

      if (liked) {
        return this.props.removeFromLikes(definitionId);
      }

      this.props.addToLikes(definitionId);
    });
  }

  render() {
    const { auth, likesIds } = this.props;

    if (this.state.loading) {
      return 'loading...';
    }

    const definitionMatch = R.compose(
      R.any(R.contains(this.state.search)), // any item in array contains search substring
      R.chain(
        R.compose(
          R.map(R.toLower),
          R.props(['description', 'name'])
        )
      ),
      R.prop('definitions')
    );

    const titleMatch = R.compose(
      R.contains(R.toLower(this.state.search)),
      R.map(R.toLower),
      R.prop('acronym')
    );

    const acronymsList = R.filter(R.anyPass([titleMatch, definitionMatch]), this.state.acronyms);

    return (
      <MuiThemeProvider theme={theme}>
        <div className="acronym-container">
          <div style={{ textAlign: 'right' }}>
            <TextField
              id="acronym-search"
              variant="outlined"
              type="search"
              label="Search acronyms"
              value={this.state.search}
              className={this.props.classes.margin}
              onChange={event => this.setState({ search: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <AcronymList
            list={acronymsList}
            like={this.like}
            isAuthenticated={auth.isAuthenticated()}
            likesIds={likesIds}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
