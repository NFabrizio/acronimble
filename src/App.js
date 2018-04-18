import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AcronymList from './AcronymList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">acronimble</h1>
          </header>
          <AcronymList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
