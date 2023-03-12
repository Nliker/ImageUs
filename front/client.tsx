import React, { Suspense } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SWRDevtools from '@jjordy/swr-devtools';

import App from '@layouts/App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://codakcodak.site'
    : 'http://localhost:3090';

render(
  <BrowserRouter>
    {process.env.NODE_ENV === 'production' ? (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ) : (
      <SWRDevtools>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </SWRDevtools>
    )}
  </BrowserRouter>,
  document.querySelector('#app'),
);
