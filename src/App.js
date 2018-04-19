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
    );
  }
}

export default App;
