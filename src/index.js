import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <div id="app">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
