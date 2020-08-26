/* eslint-disable import/prefer-default-export */
import {
  CONTEXT_EVALUATION_UPDATE_CONTEXTUALISED_LINES_CACHE,
  CONTEXT_EVALUATION_UPDATE_CONTENTWIDGETS
} from '../actionTypes';

// Initial state
const initialState = {
  cachedContexualisedLines: [],
  contentWidgets: []
};

// Reducer
export function contextEvaluationReducer(state = initialState, action) {
  switch (action.type) {
    case CONTEXT_EVALUATION_UPDATE_CONTEXTUALISED_LINES_CACHE:
      return {
        cachedContexualisedLines: action.payload
      };

    case CONTEXT_EVALUATION_UPDATE_CONTENTWIDGETS:
      return {
        contentWidgets: action.payload
      };
    default:
      return state;
  }
}
