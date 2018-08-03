import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Callback from './Callback';
import axios from 'axios';
import Auth from './utils/Auth';
import history from './utils/history';
import Login from './Login';
import AddAcronym from './AddAcronym';
import AcronymPage from './AcronymPage';
import pearsonLogo from './assets/pearson-logo.png';

const auth = new Auth();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorElement: null
    }

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.like = this.like.bind(this);
  }

  componentDidMount() {
    if (!auth.isAuthenticated()) {
      return;
    }

   this.getProfile();
  }

  handleClick = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorElement: null });
  };

  getProfile() {
    auth.getProfile((err) => {
      if (err) {
        return;
      }

      this.forceUpdate();
    });
  }

  handleAuthentication(nextState, replace) {
    console.log(nextState);
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication((err) => {
        if (err) {
          return;
        }

        this.getProfile();
      });
    }
  }

  like(definitionId) {
    axios.put(`/definitions/${definitionId}/likes`, {}, {
      headers: {
        'Authorization': `Bearer ${auth.getAccessToken()}`
      }
    }).then(() => {
      const previousLikes = auth.userProfile.likes;
      auth.userProfile.likes = previousLikes.concat([{
        definitions: [{
          id: definitionId
        }]
      }]);

      this.forceUpdate();
    });
  }

  showExample() {
    const { anchorElement } = this.state;
    const userProfile = auth.userProfile;
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
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <div className="app-info">
              <img src={pearsonLogo} className="App-logo" alt="logo" />
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <h1
                  className="App-title"
                  style={{marginBottom: 0, cursor: 'pointer'}}
                >
                  AcroNimble
                </h1>
              </Link>
              <span className="App-title" style={{fontSize: 14}}>its fun</span>
            </div>
            <div className="profile-block">
              {isAuthenticated() ? this.showExample() : <Button onClick={this.login} style={{ backgroundColor: 'white' }}>Login</Button>}
            </div>
          </header>
          <Route path="/" exact render={(props) => <Home auth={auth} like={this.like} {...props} />} />
          <Route
            path="/profile" render={(props) => {
              if (!auth.isAuthenticated()) {
                return <Redirect to="/login" />;
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
          <Route path="/new" render={(props) => {
            if (!auth.isAuthenticated()) {
              return <Redirect to="/login" />;
            }

            return <AddAcronym auth={auth} {...props} />;
          }} />
          <Route path="/acronyms/:id" render={(props) => {
            return <AcronymPage auth={auth} {...props} like={this.like} />;
          }} />
        </div>
      </Router>
    );
  }
}

export default App;
