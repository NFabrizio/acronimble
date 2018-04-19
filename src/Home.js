import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AcronymList from './AcronymList';
import AcronymPage from './AcronymPage';

const theme = createMuiTheme();
const showExample = (userProfile, logout) => {
  return (
    <div>
      {userProfile && <img src={userProfile.picture} style={{height: '50px', width: '50px' }} />}
      <div>
        <Link to="/profile">View Profile</Link>
      </div>
      <div>
        <Link to="/new">New Acronym</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acronyms: [],
      loading: true
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.get('/acronyms').then((res) => {
      this.setState({acronyms: res.data, loading: false})
    });
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (this.state.loading) {
      return 'loading...';
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            {isAuthenticated() ? showExample(this.props.auth.userProfile, this.logout) : <button onClick={this.login}>hi</button>}
            <img src={logo} className="App-logo" alt="logo" />
            <h1
              className="App-title"
              style={{marginBottom: 0, cursor: 'pointer'}}
            >
              acronymble
            </h1>
            <span className="App-title" style={{fontSize: 14}}>it's fun</span>
          </header>
          <div className="acronym-container">
            <AcronymList list={this.state.acronyms} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Home;
