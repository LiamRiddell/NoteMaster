// import { Parser, Grammar } from 'nearley';
import { store } from '../store/store';
import lexer from './Lexer';
import ContextualizedLine from './ContextualizedLine';
import { contextEvaluationUpdateContextualisedLinesCache } from '../redux/actions/context-evaluation';
// import grammar from '../nearley/arithmetic.ne';

class ContextEvaluationService {
  // Stores the previous event content
  previousContentLines = [];

  // Stores the current event content
  currentContentLines = [];

  // Stores the cached parsed line results
  cachedContexualisedLines = [];

  // Stores whether the editor lines decresed
  editorLinesDecreased = false;

  // Stores whether the editor lines increased
  editorLinesIncreased = false;

  // Stores whether the editor lines equal between states
  editorLinesEqual = false;

  // Stores the active content widgets on editor
  editorActiveContentWidgets = [];

  // Event is propogated from MonacoEditor and debounced for 100ms to increase performance
  onDidChangeModelContent = (e, content) => {
    // LR: Null Content? -> Ignore
    if (content === null) return;

    // LR: Set the previous content
    this.previousContentLines = this.currentContentLines;

    // LR: Update the currentContentLines
    this.currentContentLines = content.split('\n');

    // LR: Calculate line movement
    this.editorLinesDecreased =
      this.currentContentLines.length < this.previousContentLines.length;

    this.editorLinesIncreased =
      this.currentContentLines.length > this.previousContentLines.length;

    this.editorLinesEqual =
      this.currentContentLines.length === this.previousContentLines.length;

    // LR: Null Event? The editor has just been instantiated
    if (e === null || typeof e === 'undefined') {
      console.debug('Destroyed Cache -> No Results');
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: No cached results?
    if (this.cachedContexualisedLines.length <= 0) {
      console.debug('Destroyed Cache -> No Results');
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: Redoing, Undoing, or Flush?
    if (e.isRedoing || e.isUndoing || e.isFlush) {
      console.debug('Destroyed Cache -> A Redoing, Undoing, or Flush Happened');
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: No Lines?
    if (this.currentContentLines.length <= 0) {
      console.debug('Destroyed Cache -> No Content Lines');
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: Line count decreased?
    if (this.editorLinesDecreased) {
      console.debug('Destroyed Cache -> Line Count Decreased');
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: Multi-Change Edit?
    if (e.changes.length > 1) {
      this.onMultiChangeEvent(e);
    } else {
      this.onSingleChangeEvent(e);
    }

    // LR: Pass the internal cache over to Redux for the front-end
    this.updateContextEvaluationReduxState();
  };

  // Model Change Event types
  onMultiChangeEvent = e => {
    e.changes.forEach(change => {
      // LR: Is it a Single Line change? -> ProcessSingleLineChange
      if (e.changes.range.startLineNumber === e.changes.range.endLineNumber) {
        this.onSingleLineModelChange(change);
      } else {
        this.onMultiLineModelChange(change);
      }
    });
  };

  onSingleChangeEvent = e => {
    const change = e.changes[0];

    // LR: Is it a Single Line change? -> ProcessSingleLineChange
    if (
      e.changes[0].range.startLineNumber === e.changes[0].range.endLineNumber
    ) {
      this.onSingleLineModelChange(change);
    } else {
      this.onMultiLineModelChange(change);
    }
  };

  // Single Line Change
  onSingleLineModelChange = change => {
    // LR: Get the current the line from the content
    const line = this.currentContentLines[change.range.startLineNumber - 1];

    // LR: Contains variable?
    if (this.stringContainsVariable(line)) {
      console.debug(
        `This line contains variable -> Rebuilding Parser Cache for Lines ${change.range.startLineNumber} to ${this.currentContentLines.length}`
      );

      this.contextualize(
        change.range.startLineNumber - 1,
        this.currentContentLines.length - 1
      );
    } else if (this.editorLinesIncreased) {
      console.debug(
        `The lines below are out of sync -> Rebuilding Parser Cache for Lines ${change.range.startLineNumber} to ${this.currentContentLines.length}`
      );

      this.contextualize(
        change.range.startLineNumber - 1,
        this.currentContentLines.length - 1
      );
    } else {
      this.contextualize(
        change.range.startLineNumber - 1,
        change.range.endLineNumber - 1
      );
    }
  };

  // Multi Line Change
  onMultiLineModelChange = change => {
    for (
      let lineIndex = change.range.startLineNumber - 1;
      lineIndex <= change.range.endLineNumber - 1;
      // eslint-disable-next-line no-plusplus
      lineIndex++
    ) {
      // LR: Get the current the line from the content
      const line = this.currentContentLines[lineIndex];

      // LR: Contains variable?
      if (this.stringContainsVariable(line)) {
        console.debug(
          `onMultiLineModelChange -> This line contains variable -> Rebuilding Parser Cache for Lines ${change.range.startLineNumber} to ${this.currentContentLines.length}`
        );

        this.contextualize(
          change.range.startLineNumber - 1,
          this.currentContentLines.length - 1
        );
      } else {
        this.contextualize(
          change.range.startLineNumber - 1,
          change.range.endLineNumber - 1
        );
      }
    }
  };

  // Contextualizer
  contextualize = (startLineIndex, endLineIndex) => {
    for (
      let lineIndex = startLineIndex;
      lineIndex <= endLineIndex;
      // eslint-disable-next-line no-plusplus
      lineIndex++
    ) {
      // LR: Get the line content
      const lineContent = this.currentContentLines[lineIndex];

      // LR: Get the line from cache
      const cachedContextualizedLine = this.getCachedContextualizedLine(
        lineIndex
      );

      // LR: Cache exists?
      if (
        typeof cachedContextualizedLine !== 'undefined' &&
        cachedContextualizedLine !== null
      ) {
        // LR: Reset the line to use the new content
        // Note: Reset is smart and does checks before processing.
        cachedContextualizedLine.reset(lineContent);

        // LR: Reparse the line
        cachedContextualizedLine.parse();

        console.debug(
          `Reset Cached Context for line ${cachedContextualizedLine.lineNumber} | ${lineIndex}`,
          lineContent,
          cachedContextualizedLine
        );

        // eslint-disable-next-line no-continue
        continue;
      }

      // LR: Create contextualized line instance
      const contextualizedLine = new ContextualizedLine(lineIndex, lineContent);

      // LR: Parse the line
      contextualizedLine.parse();

      // LR: Cache the result
      this.cacheContextualizedLine(contextualizedLine);
    }
  };

  // Cache
  destroyAndRebuildParserCache = () => {
    // LR: Clear the in-memory cache
    this.cachedContexualisedLines = [];

    // LR: Recalculate all lines
    this.contextualize(0, this.currentContentLines.length - 1);

    // LR: Update the redux state on cache rebuilds
    this.updateContextEvaluationReduxState();
  };

  getCachedContextualizedLine = lineNumberIndex => {
    // LR: Index out of range?
    if (lineNumberIndex > this.cachedContexualisedLines.length) return null;

    // LR: Get the value
    const cachedLine = this.cachedContexualisedLines[lineNumberIndex];

    return cachedLine;
  };

  cacheContextualizedLine = contextualizedLine => {
    // LR: Line number index out of array bounds?
    if (
      contextualizedLine.lineNumberIndex > this.cachedContexualisedLines.length
    ) {
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: Add the contextualizedLine to the cache
    this.cachedContexualisedLines = [
      ...this.cachedContexualisedLines,
      contextualizedLine
    ];
  };

  // Content Widgets
  // TODO: Optimize by adding cache and reusing already registered widgets
  manageContentWidgets = monacoEditor => {
    // LR: Clear old content widgets
    if (this.editorActiveContentWidgets.length > 0) {
      for (let i = 0; i < this.editorActiveContentWidgets.length; i += 1) {
        monacoEditor.removeContentWidget(this.editorActiveContentWidgets[i]);
      }

      // LR: Reset the internal active content widgets array
      this.editorActiveContentWidgets = [];
    }

    // LR: Calculate the max width for content
    const textModel = monacoEditor.getModel();
    console.log(monacoEditor, textModel, monacoEditor.editor, textModel.editor);

    // LR: Iterate the newly-updated contextualised lines and render the results
    this.cachedContexualisedLines.forEach(contextualizedLine => {
      // LR: Only display lines that are marked as visible
      if (contextualizedLine.isVisible) {
        // LR: Create the content widget for this line
        const contentWidget = this.createContentWidget(contextualizedLine);

        // LR: Add the content widget to the tracking array
        this.editorActiveContentWidgets.push(contentWidget);

        // LR: Register the widget to monaco editor
        // TODO: Swap to Zones?
        monacoEditor.addContentWidget(contentWidget);
      }
    });

    // LR: Recalculate the text wrap column
    this.updateDynamicTextWrapping(monacoEditor);
  };

  createContentWidget = contextualizedLine => {
    // LR: Define the content widget
    return {
      domNode: null,
      allowEditorOverflow: false,

      // LR: The widget Id uses the format nmcl-linenumber (nmcl -> NoteMaste ContextualizedLine)
      getId() {
        return `nmcl-${contextualizedLine.lineNumber}`;
      },

      // LR: Create a dom node for the content widget when it's first initialized
      getDomNode() {
        if (!this.domNode) {
          this.domNode = document.createElement('div');
          this.domNode.classList.add('nm-result');

          this.domNode2 = document.createElement('div');
          this.domNode.appendChild(this.domNode2);
          this.domNode2.innerText = contextualizedLine.parsedValue;
        }
        return this.domNode;
      },

      // LR: The position is defined by the line number
      getPosition() {
        return {
          position: {
            lineNumber: contextualizedLine.lineNumber
          },
          preference: [0]
        };
      }
    };
  };

  // Monaco
  updateDynamicTextWrapping = monacoEditor => {
    // LR: Get the font info (id 34)
    // https://github.com/Microsoft/monaco-editor/blob/master/monaco.d.ts#L3702
    const {
      typicalHalfwidthCharacterWidth,
      typicalFullwidthCharacterWidth
    } = monacoEditor.getOption(34);

    // LR: Get the longest cached result length
    // TODO: ^
    console.log(typicalHalfwidthCharacterWidth, typicalFullwidthCharacterWidth);

    // LR: Re-layout monaco editor
    monacoEditor.layout();
  };

  // Redux
  updateContextEvaluationReduxState = () => {
    console.debug('[ContextEvaluation] Updating Redux State');

    // LR Dispatch the newly updated cached results to the front-end. This means we can update the ui in one pass opposed to multiple mini-edits.
    store.dispatch(
      contextEvaluationUpdateContextualisedLinesCache(
        this.cachedContexualisedLines
      )
    );
  };

  // Helpers
  stringContainsVariable = line => {
    // LR: Lex the line content
    lexer.reset(line);

    // LR: Search for variable
    // eslint-disable-next-line no-restricted-syntax
    for (const token of lexer) {
      if (token.type === 'identifier') return true;
    }

    return false;
  };
}

const contextEvalulationService = new ContextEvaluationService();

export default contextEvalulationService;
