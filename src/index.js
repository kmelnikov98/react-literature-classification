import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //redirect URI - go back to this locaiton after auth0
  <Auth0Provider
  domain={domain}
  clientId = {clientId}
   redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>
);

