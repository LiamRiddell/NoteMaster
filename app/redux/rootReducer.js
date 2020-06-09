// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';

// Import reducers
import { windowReducer } from './reducers/window';
import { monacoReducer } from './reducers/monaco';
import { preferencesReducer } from './reducers/preferences';

// Root reducer
export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    window: windowReducer,
    monaco: monacoReducer,
    preferences: preferencesReducer
  });
}
