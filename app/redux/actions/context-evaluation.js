import {
  CONTEXT_EVALUATION_UPDATE_CONTEXTUALISED_LINES_CACHE,
  CONTEXT_EVALUATION_UPDATE_CONTENTWIDGETS
} from '../actionTypes';

export const contextEvaluationUpdateContextualisedLinesCache = payload => {
  return {
    type: CONTEXT_EVALUATION_UPDATE_CONTEXTUALISED_LINES_CACHE,
    payload
  };
};

export const contextEvaluationUpdateContentWidgets = payload => {
  return {
    type: CONTEXT_EVALUATION_UPDATE_CONTENTWIDGETS,
    payload
  };
};
