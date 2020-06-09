/* eslint-disable import/prefer-default-export */
import { WINDOW_UPDATE } from '../actionTypes';

// Initial state
const initialState = {
  bounds: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  isMinimized: false,
  isMaximized: false,
  isNormal: false,
  isFullscreen: false,
  isPinned: false
};

// Reducer
export function windowReducer(state = initialState, action: string) {
  switch (action.type) {
    case WINDOW_UPDATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
