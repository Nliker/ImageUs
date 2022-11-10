import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SWRDevtools from '@jjordy/swr-devtools';

import App from '@layouts/App';

axios.defaults.withCredentials = true;

render(
    <BrowserRouter>
        {process.env.NODE_ENV === 'production' ? (
            <App />
        ) : (
            <SWRDevtools>
                <App />
            </SWRDevtools>
        )}
    </BrowserRouter>,
    document.querySelector('#app')
)