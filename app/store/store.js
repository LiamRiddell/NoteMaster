import { configureStore, history as historyFromStore } from './configureStore';

// LR: Configure the store
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore();
export const history = historyFromStore;
