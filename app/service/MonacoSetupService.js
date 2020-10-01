/* eslint-disable import/no-extraneous-dependencies */
// LR: Imports
import path from 'path';
import { monaco } from '@monaco-editor/react';
import { uriFromPath } from '../utils/pathUtils';
import { updateMonacoInstance } from '../redux/actions/monaco';

import {
  NUMER_DARK_THEME_NML_ENABLED,
  NUMER_DARK_THEME_NML_DISABLED
} from '../constants/monaco-theme';
import NOTEMASTER_LANGUAGE from '../constants/monaco-language';

const { app } = require('electron').remote;

// LR: Export global monaco instance... ideally this should be passed to redux
export default function RegisterMonacoService(store) {
  // LR: Monaco Editor Paths
  const monacoBasePath = path.join(
    app.getAppPath(),
    '/node_modules/monaco-editor/min/vs'
  );

  // LR: Initialise monaco
  monaco.config({
    paths: {
      vs: uriFromPath(monacoBasePath)
    }
  });

  monaco
    .init()
    .then(monacoInstance => {
      // LR: Register language
      monacoInstance.languages.register({ id: 'notemaster' });
      monacoInstance.languages.setMonarchTokensProvider(
        'notemaster',
        NOTEMASTER_LANGUAGE
      );
      monacoInstance.languages.registerCompletionItemProvider('notemaster', {
        provideCompletionItems: () => null
      });

      // LR: Register theme
      monacoInstance.editor.defineTheme(
        'notemaster-dark-nml-enabled',
        NUMER_DARK_THEME_NML_ENABLED
      );

      monacoInstance.editor.defineTheme(
        'notemaster-dark-nml-disabled',
        NUMER_DARK_THEME_NML_DISABLED
      );

      // LR: Default theme
      monacoInstance.editor.setTheme('notemaster-dark-nml-enabled');

      // LR: Dispatch state change
      store.dispatch(updateMonacoInstance(monacoInstance));

      // LR: test
      return monacoInstance;
    })
    .catch(error =>
      // eslint-disable-next-line no-console
      console.error(
        'An error occurred during initialization of Monaco: ',
        error
      )
    );
}
