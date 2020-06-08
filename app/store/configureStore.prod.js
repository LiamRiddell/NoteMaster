// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '../redux/rootReducer';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

// eslint-disable-next-line flowtype/no-weak-types
function configureStore(initialState?: any) {
  return createStore<*, {}, *>(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
