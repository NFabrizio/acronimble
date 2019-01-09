import * as R from 'ramda';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import React, { Component } from 'react';
import AcronymList from './AcronymList';
import './App.css';
import './App.css';
import { lensBy_Id, lensById } from './utils/ramda';
import { TextField, InputAdornment } from 'material-ui';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from 'material-ui';

const theme = createMuiTheme();
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
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


    const match = R.compose(R.contains(this.state.search), R.prop('acronym'));
    const acronymsList = R.filter(match, this.state.acronyms);
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
              onChange={(event) => this.setState({ search: event.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <AcronymList list={acronymsList} like={this.like} isAuthenticated={auth.isAuthenticated()} likesIds={likesIds} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Home);
