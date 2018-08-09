import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AcronymList from './AcronymList';

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
      const definition = acronyms.find((acronym) => {
        return acronym._id === itemId;
      }).definitions.find((definition) => {
        return definition.id === definitionId;
      });

      (definition.likes = definition.likes || []).push(auth.userProfile.sub);

      this.setState({
        acronyms
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
