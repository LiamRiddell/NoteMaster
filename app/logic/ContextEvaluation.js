// import { Parser, Grammar } from 'nearley';
import lexer from './Lexer';
import ContextualizedLine from './ContextualizedLine';
// import grammar from '../nearley/arithmetic.ne';

class ContextEvaluationService {
  // Stores the previous event content
  previousContentLines = [];

  // Stores the current event content
  currentContentLines = [];

  // Stores the cached parsed line results
  cachedParserResults = [];

  // Event is propogated from MonacoEditor and debounced for 100ms to increase performance
  onDidChangeModelContent = (e, content) => {
    // LR: Null? -> Ignore
    if (e === null || content === null) return;

    // LR: Set the previous content
    this.previousContentLines = this.currentContentLines;

    // LR: Update the currentContentLines
    this.currentContentLines = content.split('\n');

    // LR: No cached results?
    if (this.cachedParserResults.length <= 0) {
      this.destroyAndRebuildParserCache();
    }

    // LR: Redoing, Undoing, or Flush?
    if (e.isRedoing || e.isUndoing || e.isFlush) {
      this.destroyAndRebuildParserCache();
    }

    // LR: No Lines?
    if (this.currentContentLines.length <= 0) {
      this.destroyAndRebuildParserCache();
    }

    // LR: Line count changed?
    if (this.currentContentLines.length !== this.previousContentLines.length) {
      this.destroyAndRebuildParserCache();
    }

    // LR: Multi-Change Edit?
    if (e.changes.length > 1) {
      this.onMultiChangeEvent(e);
    } else {
      this.onSingleChangeEvent(e);
    }
  };

  // Model Change Event types
  onMultiChangeEvent = e => {
    console.error("I've received MultiChangeEvent from", e);
  };

  onSingleChangeEvent = e => {
    const change = e.changes[0];

    // LR: Is it a Single Line change? -> ProcessSingleLineChange
    if (
      e.changes[0].range.startLineNumber === e.changes[0].range.endLineNumber
    ) {
      this.onSingleLineModelChange(change);
    } else {
      this.onMultiLineModelChange(e.changes);
    }
  };

  // Edits
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
    } else {
      this.contextualize(
        change.range.startLineNumber,
        change.range.endLineNumber
      );
    }
  };

  onMultiLineModelChange = changes => {
    console.log('Multi line edit', changes.length);
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
    this.cachedParserResults = [];

    // LR: Recalculate all lines
    this.contextualize(0, this.currentContentLines.length - 1);
  };

  getCachedContextualizedLine = lineNumberIndex => {
    // LR: Index out of range?
    if (lineNumberIndex > this.cachedParserResults.length) return null;

    // LR: Get the value
    const cachedLine = this.cachedParserResults[lineNumberIndex];

    return cachedLine;
  };

  cacheContextualizedLine = contextualizedLine => {
    // LR: Line number index out of array bounds?
    if (contextualizedLine.lineNumberIndex > this.cachedParserResults.length) {
      this.destroyAndRebuildParserCache();
      return;
    }

    // LR: Add the contextualizedLine to the cache
    this.cachedParserResults = [
      ...this.cachedParserResults,
      contextualizedLine
    ];
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
