import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AcronymList from './AcronymList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const acronyms = [
  {
    title: 'PI',
    fullName: 'Personal Information',
    description: "User's personal information!",
    category: ['technology', 'security']
  },
  {
    title: 'GLP',
    fullName: 'Global Learning Platform',
    description: "The future of Pearson!",
    category: ['technology', 'leadership']
  }
];

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title" style={{marginBottom: 0}}>acronymble</h1>
            <span className="App-title" style={{fontSize: 14}}>it's fun</span>
          </header>
          <AcronymList list={acronyms} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
