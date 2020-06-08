/* eslint-disable import/prefer-default-export */
import { MONACO_INSTANCE_UPDATE } from '../actionTypes';

// Initial state
const initialState = {
  initialised: false,
  instance: null
};

// Reducer
export function monacoReducer(state = initialState, action: string) {
  switch (action.type) {
    case MONACO_INSTANCE_UPDATE:
      return {
        initialised: true,
        instance: action.payload
      };
    default:
      return state;
  }
}
