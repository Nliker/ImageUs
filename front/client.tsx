import React, { Suspense } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

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
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
);
