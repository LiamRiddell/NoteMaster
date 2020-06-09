/* eslint-disable import/prefer-default-export */
import { WINDOW_UPDATE } from '../actionTypes';

export const windowUpdate = (payload: object) => {
  return {
    type: WINDOW_UPDATE,
    payload
  };
};
