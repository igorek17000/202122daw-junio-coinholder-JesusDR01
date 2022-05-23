import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/App';
import { MoralisProvider } from 'react-moralis';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from './globalStyles';
import { Loader } from 'components/Loader/Loader';
import './helpers/i18n';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;

  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      'Missing Moralis Application ID or Server URL. Make sure to set your .env file.',
    );

  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Suspense fallback={<Loader />}> 
          <AppRouter isServerInfo />
        </Suspense>
      </MoralisProvider>
    );
  else {
    return <div style={{ display: 'flex', justifyContent: 'center' }}></div>;
  }
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <GlobalStyles />
        <Application />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.unregister();