import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-nzeuo6hxi86v8gj2.us.auth0.com";
const clientId = "NXrp9paEf2VSzNnSYTxqeCDnaliArXYi"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>,
);