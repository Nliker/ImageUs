import React, { Suspense } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@layouts/App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://codakcodak.site'
    : 'http://localhost:3090';

render(
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
  document.querySelector('#app'),
);
