import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <header className="App-header">
          {isAuthenticated() ? showExample(this.props.auth.userProfile, this.logout) : <button onClick={this.login}>hi</button>}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Home;
