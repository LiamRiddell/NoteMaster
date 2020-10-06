// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'theme-ui';
import Routes from '../Routes';
import theme from '../constants/theme-default';

type Props = {
  store: {},
  history: {}
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
