/* eslint-disable react/display-name */
import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './constants/routes.json';
import App from './containers/App';

// LR: Routes
import Default from './routes/Default/DefaultRoute';
import Preferences from './routes/Preferences/PreferencesRoute';

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.DEFAULT} component={Default} />
      <Route exact path={routes.PREFERENCES} component={Preferences} />
    </Switch>
  </App>
);
