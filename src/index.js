import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Sentry.init({ dsn: 'https://7a6c8e8216504f07a565c7bd483f233b@sentry.io/1768395' });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
