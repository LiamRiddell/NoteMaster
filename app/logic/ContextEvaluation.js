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
    console.log('Single line edit', change.range.startLineNumber, change);

    // LR: Get the current the line from the content
    const line = this.currentContentLines[change.range.startLineNumber - 1];

    // LR: Contains variable?
    if (this.stringContainsVariable(line)) {
      console.debug(
        `This line contains variable -> Rebuilding Parser Cache for Lines ${change.range.startLineNumber} to ${this.currentContentLines.length}`
      );

      this.contextualize(
        change.range.startLineNumber,
        this.currentContentLines.length - 1
      );
    } else if (this.editorLinesIncreased) {
      console.debug(
        `The lines below are out of sync -> Rebuilding Parser Cache for Lines ${change.range.startLineNumber} to ${this.currentContentLines.length}`
      );

      this.contextualize(
        change.range.startLineNumber,
        this.currentContentLines.length - 1
      );
    } else {
      this.contextualize(
        change.range.startLineNumber,
        change.range.endLineNumber
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
          change.range.startLineNumber,
          this.currentContentLines.length - 1
        );
      } else {
        this.contextualize(
          change.range.startLineNumber,
          change.range.endLineNumber
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
      let lineContent = this.currentContentLines[lineIndex];

      // LR: If the line content is null or undefined replace with empty string
      if (lineContent === null || typeof lineContent === 'undefined') {
        lineContent = '';
      }

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
          `Reset Cached Context for line ${cachedContextualizedLine.lineNumber}`,
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
