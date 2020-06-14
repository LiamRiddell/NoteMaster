import {
  PARSER_UPDATE_RESULTS,
  PARSER_UPDATE_CONTENTWIDGETS
} from '../actionTypes';

export const parserUpdateResults = payload => {
  return {
    type: PARSER_UPDATE_RESULTS,
    payload
  };
};

export const parserUpdateContentWidgets = payload => {
  return {
    type: PARSER_UPDATE_CONTENTWIDGETS,
    payload
  };
};
