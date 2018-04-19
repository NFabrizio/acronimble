import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AcronymList from './AcronymList';
import AcronymPage from './AcronymPage';

const showExample = (userProfile, logout) => {
  return (
    <div>
      {userProfile && <img src={userProfile.picture} style={{height: '50px', width: '50px' }} />}
      <div>
        <Link to="/profile">View Profile</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAcronym: false,
      acronymTitle: ''
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showCard = this.showCard.bind(this);
  }

  componentDidMount() {
    axios.get('/protected', {
      headers: {
        'Authorization': `Bearer ${this.props.auth.getAccessToken()}`
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
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

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            {isAuthenticated() ? showExample(this.props.auth.userProfile, this.logout) : <button onClick={this.login}>hi</button>}
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
    );
  }
}

export default Home;
