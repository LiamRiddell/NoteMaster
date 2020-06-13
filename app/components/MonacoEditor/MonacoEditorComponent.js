/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { connect } from 'react-redux';
import { shell } from 'electron';
import { debounce } from '../../utils/eventUtils';

// LR: Actions
import { preferencesContentAutosave } from '../../redux/actions/preferences';

// LR Services
import contextEvaluationService from '../../service/ContextEvaluationService';

const { dialog } = require('electron').remote;
const fs = require('fs');

function MonacoEditorComponent({
  // eslint-disable-next-line no-unused-vars
  window,
  preferences,
  autosaveContent
}: object) {
  // eslint-disable-next-line no-unused-vars
  const [isEditorReady, setIsEditorReady] = useState(false);
  // const [viewportColumnWidth, setViewportColumnWidth] = useState(true);
  const monacoEditor = useRef(null);
  const valueGetter = useRef(null);
  const viewZoneObserver = new MutationObserver(hookEditorResize);

  // LR: Monaco editor has mounted
  function handleEditorDidMount(_valueGetter, editor) {
    setIsEditorReady(true);
    monacoEditor.current = editor;
    valueGetter.current = _valueGetter;

    // We can hook monaco's viewZone here
    viewZoneObserver.observe(editor._modelData.view.viewLines.domNode.domNode, {
      attributes: true
    });

    // LR: Auto Save debounce 300ms
    const onDidChangeModelContentAutoSaveDebounced = debounce((e, content) => {
      autosaveContent(content);
    }, 300);

    // Listen to model (content) changes from monaco
    const onDidChangeModelContent = e => {
      const content = valueGetter.current();

      // LR: Parse the contents context
      contextEvaluationService.parse(content);

      // LR: Debounce the auto save
      onDidChangeModelContentAutoSaveDebounced(e, content);
    };

    editor.onDidChangeModelContent(onDidChangeModelContent);

    // LR: Register Actions to context menu
    editor.addAction({
      id: 'search-on-google',
      label: 'Search with Google',
      precondition: null,
      keybindingContext: null,
      keybindings: [],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: ed => {
        const searchUrl = 'https://www.google.com/search?q=';
        const selection = ed.getSelection();
        const selectionValue = ed.getModel().getValueInRange(selection);
        const searchQuery = encodeURIComponent(selectionValue);

        if (searchQuery.length > 0) {
          shell.openExternal(`${searchUrl}${searchQuery}`);
        }

        return null;
      }
    });

    editor.addAction({
      id: 'export-note',
      label: 'Export Note',
      precondition: null,
      keybindingContext: null,
      keybindings: [],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.6,
      run: ed => {
        const noteContent = ed.getModel().getValue();

        dialog
          .showSaveDialog({
            title: 'Export Note',
            filters: [
              {
                name: 'Text File',
                extensions: ['txt']
              }
            ]
          })
          .then(result => {
            // eslint-disable-next-line promise/always-return
            if (result.canceled) return;

            return fs.writeFileSync(result.filePath, noteContent, 'utf8');
          })
          .catch(err => {
            console.log(err);
          });

        return null;
      }
    });
  }

  function hookEditorResize() {
    const editor = monacoEditor.current;
    editor.layout();
  }

  const { fontSize, fontWeight, lineHeight, lineNumbers } = preferences;

  // HACK: LR - Fixes an issue when the preferences are loaded from the disk and the editor does not resize.
  // Window Updates will not cause the editor to layout.
  if (monacoEditor.current) {
    monacoEditor.current.layout();
  }

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        language="notemaster"
        theme="notemaster-dark"
        value={preferences.editorContent}
        editorDidMount={handleEditorDidMount}
        automaticLayout
        options={{
          automaticLayout: true,
          scrollbar: {
            verticalSliderSize: 0,
            vertical: 'hidden',
            horizontal: 'hidden'
          },
          minimap: {
            enabled: false
          },

          // Font
          fontFamily: 'Roboto',
          fontWeight,
          fontSize,
          lineHeight,
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          codeLens: false,
          renderLineHighlight: 'all',

          // Word Wrapping
          wordWrap: 'on', // 'wordWrapColumn',
          // wordWrapColumn: viewportColumnWidth,

          // Disable Suggestions
          quickSuggestions: false,
          snippetSuggestions: false,

          // Hide Line Numbers Gutter
          glyphMargin: false,
          folding: lineNumbers !== 'off',
          lineNumbers, // Default: 'off'
          lineDecorationsWidth: lineNumbers !== 'off' ? 5 : 0, // Default: 5
          lineNumbersMinChars: 3 // Default: 3
        }}
      />
    </>
  );
}

const mapStateToProps = state => ({
  window: state.window,
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  autosaveContent: (content: string) =>
    dispatch(preferencesContentAutosave(content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonacoEditorComponent);
