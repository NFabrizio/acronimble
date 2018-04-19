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

    this.toggleCard = this.toggleCard.bind(this);
  }

  toggleCard(acronymTitle) {
    if (acronymTitle === 'close') {
      this.setState({
        showAcronym: false,
        acronymTitle: ''
      });
    }

    if (acronymTitle !== 'close') {
      this.setState({
        showAcronym: true,
        acronymTitle
      });
    }
  }

  renderView () {
    if (!this.state.showAcronym) {
      return <AcronymList list={acronyms} clickHandler={this.toggleCard} />
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
            <h1 className="App-title" style={{marginBottom: 0}}>acronymble</h1>
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

export default App;
