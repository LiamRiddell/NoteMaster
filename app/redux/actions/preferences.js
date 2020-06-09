/* eslint-disable import/prefer-default-export */
import store from '../../service/LocalStoreService';
import { PREFERENCES_CONTENT_AUTOSAVE, PREFERENCES_SAVE } from '../actionTypes';

// Action creators
export const preferencesContentAutosave = (payload: object) => {
  // Save the content to disk
  store.set('preferences.editorContent', payload);
  return {
    type: PREFERENCES_CONTENT_AUTOSAVE,
    payload
  };
};

export const preferencesSave = (payload: object) => {
  // TODO: Save the preferences to disk
  const newPreferences = {
    ...store.get('preferences'),
    ...payload
  };
  store.set('preferences', newPreferences);
  return {
    type: PREFERENCES_SAVE,
    payload
  };
};
