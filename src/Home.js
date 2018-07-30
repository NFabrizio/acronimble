import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
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
    }
  }

  componentDidMount() {
    axios.get('/acronyms').then((res) => {
      this.setState({acronyms: res.data, loading: false})
    });
  }

  render() {
    if (this.state.loading) {
      return 'loading...';
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="acronym-container">
          <AcronymList list={this.state.acronyms} like={this.props.like} auth={this.props.auth} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
