import React from 'react';
import { Route, Router, Redirect, Link } from 'react-router-dom';
import { Button, Menu, MenuItem, CssBaseline } from '@material-ui/core';
import Home from './Home';
import Profile from './Profile';
import Callback from './Callback';
import Login from './Login';
import AddAcronym from './AddAcronym';
import AcronymPage from './AcronymPage';
import Auth from './utils/Auth';
import history from './utils/history';
import pearsonLogo from './assets/pearson-logo.png';

const auth = new Auth();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorElement: null,
      likesIds: []
    }

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.addToLikes = this.addToLikes.bind(this);
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
    return auth.getProfile((err) => {
      if (err) {
        return;
      }

      const { likes = [] } = auth.userProfile;
      const likesIds = likes.map((item) => {
        return item.definitions[0].id;
      });

      this.setState({
        likesIds
      });
    });
  }

  handleAuthentication(nextState) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication(nextState.location.search, (err) => {
        if (err) {
          return;
        }

        this.getProfile();
      });
    }
  }

  addToLikes(definitionId) {
    this.setState(({ likesIds = [] }) => ({
      likesIds: [...likesIds, definitionId]
    }));
  }

  removeFromLikes = (definitionId) => {
    this.setState(({ likesIds = [] }) => ({
      likesIds: likesIds.filter((id) => id !== definitionId)
    }));
  }

  showExample() {
    const { anchorElement } = this.state;
    const userProfile = auth.userProfile;
    return (
      <React.Fragment>
        <div>
          {userProfile && <img src={userProfile.picture} alt="Profile" style={{height: '50px', width: '50px', display: 'block', margin: '0 auto' }} />}
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
      </React.Fragment>
    );
  };

  logout = () => {
    // Reset state on anchorElement so that dropdown will close on logout
    this.setState({
      anchorElement: null,
      likesIds: []
    });
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <Router history={history}>
        <div className="App">
          <CssBaseline />
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
              <span className="App-title" style={{fontSize: 14}}>it's fun</span>
            </div>
            <div className="profile-block">
              {isAuthenticated() ? this.showExample() : <Button onClick={auth.login} style={{ backgroundColor: 'white' }}>Login</Button>}
            </div>
          </header>
          <Route path="/" exact
            render={(props) => <Home auth={auth} likesIds={this.state.likesIds} addToLikes={this.addToLikes} removeFromLikes={this.removeFromLikes} {...props} />}
          />
          <Route path="/like"
            render={(props) => <Home auth={auth} likesIds={this.state.likesIds} addToLikes={this.addToLikes} removeFromLikes={this.removeFromLikes} {...props} />}
          />
          <Route
            path="/profile" render={(props) => {
              if (!isAuthenticated()) {
                return <Redirect to="/login" />;
              }

              return (
                <Profile auth={auth} getProfile={this.getProfile} removeFromLikes={this.removeFromLikes} {...props} {...this.state} />
              );
            }}
          />
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} />
          }}/>
          <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />
          <Route path="/new" render={(props) => {
            if (!isAuthenticated()) {
              return <Redirect to="/login" />;
            }

            return <AddAcronym auth={auth} {...props} />;
          }} />
          <Route path="/acronyms/:id" render={(props) => {
            return <AcronymPage auth={auth} likesIds={this.state.likesIds} addToLikes={this.addToLikes} removeFromLikes={this.removeFromLikes} {...props} />;
          }} />
        </div>
      </Router>
    );
  }
}

export default App;
