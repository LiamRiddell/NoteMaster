/* eslint-disable import/prefer-default-export */
import {
  PARSER_UPDATE_RESULTS,
  PARSER_UPDATE_CONTENTWIDGETS
} from '../actionTypes';

// Initial state
const initialState = {
  results: [],
  contentWidgets: []
};

// Reducer
export function parserReducer(state = initialState, action) {
  switch (action.type) {
    case PARSER_UPDATE_RESULTS:
      return {
        results: action.payload
      };

    case PARSER_UPDATE_CONTENTWIDGETS:
      return {
        contentWidgets: action.payload
      };
    default:
      return state;
  }
}
