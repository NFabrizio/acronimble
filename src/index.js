import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: "https://7a6c8e8216504f07a565c7bd483f233b@sentry.io/1768395"});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
