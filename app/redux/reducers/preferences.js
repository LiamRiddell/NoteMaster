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
      editorTheme: preferences.editorTheme || 'notemaster-dark-nml-enabled',
      fontFamily: preferences.fontFamily || 'Roboto',
      fontSize: preferences.fontSize || 14,
      fontWeight: preferences.fontWeight || '400',
      fontLigatures: preferences.fontLigatures || false,
      lineHeight: preferences.lineHeight || 24,
      lineNumbers: preferences.lineNumbers || 'off',
      autoLaunch: preferences.autoLaunch || true,
      nmlEnabled: preferences.nmlEnabled || true,
      nmlBaseCurrency: preferences.nmlBaseCurrency || 'USD',
      wrappingIndent: preferences.wrappingIndent || 'same'
    }
  : {
      editorContent: introductionNoteContent,
      autosaveContent: introductionNoteContent,
      editorTheme: 'notemaster-dark-nml-enabled',
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '400',
      fontLigatures: false,
      lineHeight: 24,
      lineNumbers: 'off',
      autoLaunch: true,
      nmlEnabled: true,
      nmlBaseCurrency: 'USD',
      wrappingIndent: 'same'
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
