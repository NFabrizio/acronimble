<<<<<<< HEAD
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AcronymList from './AcronymList';
import AcronymPage from './AcronymPage';

const acronyms = [
  {
    title: 'PI',
    fullName: 'Personal Information',
    description: "User's personal information!",
    category: ['technology', 'security'],
    added: {
      by: 'Joe Blow',
      date: 'January 14, 2017'
    }
  },
  {
    title: 'GLP',
    fullName: 'Global Learning Platform',
    description: "The future of Pearson!",
    category: ['technology', 'leadership'],
    added: {
      by: 'Chuck E Cheese',
      date: 'October 28, 2016'
    }}
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAcronym: false,
      acronymTitle: ''
    }

    this.showCard = this.showCard.bind(this);
  }

  showCard(acronymTitle) {
    this.setState({
      showAcronym: true,
      acronymTitle
    });
  }

  goHome() {
   this.setState({
      showAcronym: false,
      acronymTitle: ''
    });
  }

  renderView () {
    if (!this.state.showAcronym) {
      return <AcronymList list={acronyms} clickHandler={this.showCard} />
    }

    const acronym = acronyms.find((item) => item.title === this.state.acronymTitle);
    return <AcronymPage item={acronym} />
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1
              className="App-title"
              style={{marginBottom: 0, cursor: 'pointer'}}
              onClick={() => this.goHome()}
            >
              acronymble
            </h1>
            <span className="App-title" style={{fontSize: 14}}>it's fun</span>
          </header>
          <div className="acronym-container">
            {this.renderView()}
          </div>
        </div>
      </MuiThemeProvider>
=======
import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Callback from './Callback';
import Auth from './utils/Auth';
import history from './utils/history';
import Login from './Login';

const auth = new Auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    if (!auth.isAuthenticated()) {
      return;
    }

   this.getProfile();
  }

  getProfile() {
    auth.getProfile((err, profile) => {
      if (err) {
        return;
      }

      this.forceUpdate();
    });
  }

  handleAuthentication(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication((err) => {
        if (err) {
          return;
        }

        this.getProfile();
      });
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route
            path="/profile" render={(props) => {
              if (!auth.isAuthenticated()) {
                return <Redirect to="/login" />
              }

              return (
                <Profile auth={auth} getProfile={this.getProfile} {...props} />
              );
            }}
          />
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} />
          }}/>
          <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
        </div>
      </Router>
>>>>>>> master
    );
  }
}

export default App;