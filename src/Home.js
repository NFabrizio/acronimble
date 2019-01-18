import * as R from 'ramda';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import AcronymList from './AcronymList';
import './App.css';
import './App.css';
import { lensBy_Id, lensById } from './utils/ramda';

const theme = createMuiTheme();

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acronyms: [],
      acronymTitle: '',
      anchorElement: null,
      showAcronym: false,
      loading: true
    };

    this.like = this.like.bind(this);
  }

  componentDidMount() {
    axios.get('/acronyms').then((res) => {
      this.setState({acronyms: res.data, loading: false})
    });
  }

  like(itemId, definitionId) {
    const { auth } = this.props;
    axios.put(`/definitions/${definitionId}/likes`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.getAccessToken()}`
      }
    }).then(() => {
      const acronyms = this.state.acronyms;
      const userId = auth && auth.userProfile && auth.userProfile.sub;

      const likesLens = R.compose(
        lensBy_Id(itemId),
        R.lensProp('definitions'),
        lensById(definitionId),
        R.lensProp('likes')
      );
      const likesView = R.view(likesLens, acronyms);
      const newAcronyms = R.set(likesLens, R.append(userId, likesView), acronyms);

      this.setState({
        newAcronyms
      });

      this.props.addToLikes(definitionId);
    });
  }

  render() {
    const { auth, likesIds } = this.props;

    if (this.state.loading) {
      return 'loading...';
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="acronym-container">
          <AcronymList list={this.state.acronyms} like={this.like} isAuthenticated={auth.isAuthenticated()} likesIds={likesIds} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
