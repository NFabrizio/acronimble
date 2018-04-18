import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Auth from './utils/Auth';
import history from './utils/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
    );
  }
}

export default App;