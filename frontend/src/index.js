import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app';

function renderApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      rootElement
    );
  } else {
    console.error("Cannot find element with id 'root'");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}