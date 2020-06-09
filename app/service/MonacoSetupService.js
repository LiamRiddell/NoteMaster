// LR: Imports
import path from 'path';
import { monaco } from '@monaco-editor/react';
import { uriFromPath } from '../utils/pathUtils';
import { updateMonacoInstance } from '../redux/actions/monaco';

import NOTEMASTER_DARK_THEME from '../constants/monaco-theme';
import NOTEMASTER_LANGUAGE from '../constants/monaco-language';

const { app } = require('electron').remote;

// LR: Export global monaco instance... ideally this should be passed to redux
// eslint-disable-next-line flowtype/no-weak-types
export default function RegisterMonacoService(store: any) {
  // LR: Monaco Editor Paths
  const monacoLoaderPath = path.join(
    app.getAppPath(),
    '/node_modules/monaco-editor/min/vs/loader.js'
  );
  const monacoBasePath = path.join(
    app.getAppPath(),
    '/node_modules/monaco-editor/min/vs'
  );

  // LR: Initialise monaco
  monaco
    .config({
      urls: {
        monacoLoader: uriFromPath(monacoLoaderPath),
        monacoBase: uriFromPath(monacoBasePath)
      }
    })
    .init()
    .then(monacoInstance => {
      console.log('[Global]', 'Setting up monaco', monacoInstance);

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
        'notemaster-dark',
        NOTEMASTER_DARK_THEME
      );
      monacoInstance.editor.setTheme('notemaster-dark');

      // LR: Dispatch state change
      store.dispatch(updateMonacoInstance(monacoInstance));

      // LR: test
      return monacoInstance;
    })
    .catch(error =>
      console.error(
        'An error occurred during initialization of Monaco: ',
        error
      )
    );
}
