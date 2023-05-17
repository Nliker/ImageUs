import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import axios from 'axios';

import App from '@layouts/App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://codakcodak.site'
    : 'http://localhost:3090';

const container = document.getElementById('app');
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
