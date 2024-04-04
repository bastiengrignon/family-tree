import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import router from './router';
import store from './store';
import theme from './theme';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-center" />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
