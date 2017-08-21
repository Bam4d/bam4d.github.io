import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import GoogleAnalytics from './GoogleAnalytics.js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css';

ReactDOM.render(<Router><GoogleAnalytics><App /></GoogleAnalytics></Router>, document.getElementById('root'));
registerServiceWorker();
