/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
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
import contextEvaluationService from '../../logic/ContextEvaluation';

const { dialog } = require('electron').remote;
const fs = require('fs');

function MonacoEditorComponent({
  // eslint-disable-next-line no-unused-vars
  window,
  preferences,
  // contextEvaluation,
  autosaveContent
}) {
  // eslint-disable-next-line no-unused-vars
  const [isEditorReady, setIsEditorReady] = useState(false);
  const monacoEditor = useRef(null);
  const valueGetter = useRef(null);
  // eslint-disable-next-line no-use-before-define
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

      // LR: Debounce the auto save
      onDidChangeModelContentAutoSaveDebounced(e, content);

      // LR: Pass the event to the ContextEvaluationService.
      if (preferences.nmlEnabled)
        contextEvaluationService.onDidChangeModelContent(e, content);
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
            fs.writeFileSync(result.filePath, noteContent, 'utf8');
          })
          .catch(err => {
            throw err;
          });

        return null;
      }
    });

    // LR: Trigger parse on intial render
    contextEvaluationService.onDidChangeModelContent(
      null,
      valueGetter.current()
    );
  }

  function hookEditorResize(e) {
    const editor = monacoEditor.current;
    editor.layout();

    // LR: Manage content widgets only if nml is enabled
    if (preferences.nmlEnabled) {
      contextEvaluationService.manageContentWidgets(monacoEditor.current);
    }

    // LR: Get the line width - used for results
    document.documentElement.style.setProperty(
      '--nm-var-linewidth',
      `${e[0].target.clientWidth}px`
    );
  }

  const {
    fontFamily,
    fontSize,
    fontWeight,
    fontLigatures,
    lineHeight,
    lineNumbers,
    nmlEnabled,
    wrappingIndent
  } = preferences;

  // HACK: LR - Fixes an issue when the preferences are loaded from the disk and the editor does not resize.
  // Window Updates will not cause the editor to layout.
  if (monacoEditor.current) {
    monacoEditor.current.layout();

    // LR: Manage content widgets only if nml is enabled
    if (nmlEnabled) {
      // LR: Add the content widgets
      contextEvaluationService.manageContentWidgets(monacoEditor.current);
    }

    // LR: Setup CSS vars
    document.documentElement.style.setProperty(
      '--nm-var-fontsize',
      `${fontSize}px`
    );

    document.documentElement.style.setProperty(
      '--nm-var-lineheight',
      `${lineHeight}px`
    );

    document.documentElement.style.setProperty(
      '--nm-var-fontfamily',
      `'${fontFamily}'`
    );
  }

  const hiddenResultsSeperator = 'nm-editor-results-seperator hidden';

  return (
    <div className="nm-editor-wrapper">
      <div
        className={
          nmlEnabled ? 'nm-editor-results-seperator' : hiddenResultsSeperator
        }
      />
      <Editor
        className="nm-editor"
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
          fontFamily,
          fontWeight,
          fontSize,
          fontLigatures,
          lineHeight,
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          codeLens: false,
          renderLineHighlight: 'all',

          // Word Wrapping
          wordWrap: 'wordWrapColumn',
          // wordWrapColumn: 80,
          wrappingStratergy: 'advanced',
          wrappingIndent,

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
    </div>
  );
}

const mapStateToProps = state => ({
  window: state.window,
  preferences: state.preferences,
  contextEvaluation: state.contextEvaluation
});

const mapDispatchToProps = dispatch => ({
  autosaveContent: content => dispatch(preferencesContentAutosave(content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonacoEditorComponent);
