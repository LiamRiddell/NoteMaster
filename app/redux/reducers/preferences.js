/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import store from '../../service/LocalStoreService';
import { PREFERENCES_CONTENT_AUTOSAVE, PREFERENCES_SAVE } from '../actionTypes';

const path = require('path');
const fs = require('fs');
const { app } = require('electron').remote;

// LR: Load content from disk
const preferences = store.get('preferences');
const isFirstLaunch = typeof preferences === 'undefined';
const introductionNotePath = path.join(
  // LR: Required when reading when build is packaged.
  app.getAppPath(),
  '/static/introduction-note.txt'
);

const getIntroductionNoteContent = () => {
  return fs.readFileSync(introductionNotePath, 'utf8');
};

const introductionNoteContent = getIntroductionNoteContent();

// Initial state
const initialState = !isFirstLaunch
  ? {
      editorContent: preferences.editorContent || introductionNoteContent,
      autosaveContent: preferences.editorContent || introductionNoteContent,
      fontSize: preferences.fontSize || 14,
      fontWeight: preferences.fontWeight || '400',
      lineHeight: preferences.lineHeight || 24,
      lineNumbers: preferences.lineNumbers || 'off',
      autoLaunch: preferences.autoLaunch || true,
      nmlEnabled: preferences.nmlEnabled || true
    }
  : {
      editorContent: introductionNoteContent,
      autosaveContent: introductionNoteContent,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 24,
      lineNumbers: 'off',
      autoLaunch: true,
      nmlEnabled: true
    };

// Reducer
export function preferencesReducer(state = initialState, action: string) {
  const { payload } = action;

  switch (action.type) {
    // TODO: Change this to a different reducer
    case PREFERENCES_CONTENT_AUTOSAVE:
      return {
        ...state,
        autosaveContent: payload
      };

    case PREFERENCES_SAVE:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
