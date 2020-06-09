import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { windowUpdate } from './redux/actions/window';
import './app.global.css';

// LR: Import monaco setup service
import RegisterMonacoService from './service/MonacoSetupService';

// LR: Electron
const electron = require('electron');

const { ipcRenderer } = electron;

// LR: Configure the store
const store = configureStore();

// LR: Register any startup services
RegisterMonacoService(store);

// LR: Listen for IPC messages
ipcRenderer.on('ipc-redux-windowUpdate', (sender, payload) => {
  store.dispatch(windowUpdate(payload));
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
