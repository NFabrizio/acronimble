import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import React, { Component } from 'react';
import pearsonLogo from './assets/pearson-logo.png';
import './App.css';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AcronymList from './AcronymList';
import AcronymPage from './AcronymPage';

const theme = createMuiTheme();

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
      acronymTitle: '',
      anchorElement: null,
      showAcronym: false
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showCard = this.showCard.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorElement: null });
  };

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

  showExample() {
    const { anchorElement } = this.state;
    const userProfile = this.props.auth.userProfile;
    return (
      <div>
        {userProfile && <img src={userProfile.picture} style={{height: '50px', width: '50px', display: 'block', margin: '0 auto' }} />}
        <Button
            aria-owns={anchorElement ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            style={{ display: 'block', textAlign: 'center' }}
          >
            <div style={{ width: '35px', height: '5px', backgroundColor: 'white', margin: '6px auto', borderRadius: '3px' }}></div>
            <div style={{ width: '35px', height: '5px', backgroundColor: 'white', margin: '6px auto', borderRadius: '3px' }}></div>
            <div style={{ width: '35px', height: '5px', backgroundColor: 'white', margin: '6px auto', borderRadius: '3px' }}></div>
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={this.handleClose}
          >
          <MenuItem onClick={this.handleClose}>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>View Profile</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/new" style={{ textDecoration: 'none', color: 'black' }}>New Acronym</Link>
          </MenuItem>
          <MenuItem onClick={this.logout}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  };

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <div className="app-info">
              <img src={pearsonLogo} className="App-logo" alt="logo" />
              <h1
                className="App-title"
                style={{marginBottom: 0, cursor: 'pointer'}}
                onClick={() => this.goHome()}
              >
                acronymble
              </h1>
              <span className="App-title" style={{fontSize: 14}}>its fun</span>
            </div>
            <div className="profile-block">
              {isAuthenticated() ? this.showExample() : <button onClick={this.login}>Login</button>}
            </div>
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
