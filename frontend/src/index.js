import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import Profile from './components/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain="dev-nzeuo6hxi86v8gj2.us.auth0.com"
  clientId="NXrp9paEf2VSzNnSYTxqeCDnaliArXYi"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
  <LoginButton />
  <LogoutButton />
  <Profile />
</Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();