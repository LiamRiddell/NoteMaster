import lexer from './Lexer';

export default class ContextualizedLine {
  // -- Core
  // Stores the zero-based line number
  lineNumberIndex;

  // Stores the line number for this line
  lineNumber;

  // Stores the content (text) for this line
  lineContent;

  // -- Parsing
  // Stores the parser result from Nearley
  parsed;

  // Stores boolean value of whether the line was parsed successfully
  parsedSuccessful;

  // -- Flags
  // Stores whether the field is empty
  isEmpty;

  // Stores whether this line contains a identifier
  containsVariable;

  // Stores whether line should be visible
  isVisible;

  constructor(lineNumberIndex, lineContent) {
    // LR: Core properties
    this.lineNumberIndex = lineNumberIndex;
    this.lineNumber = lineNumberIndex + 1;

    // LR: Utilize reset function for class setup
    this.reset(lineContent);
  }

  // Functions
  reset = lineContent => {
    // LR: Make sure the content does not match
    if (lineContent === this.lineContent) return;

    // LR: Update the line content
    this.lineContent = lineContent;

    // LR: Boolean flags
    this.isEmpty = this.lineContent.length <= 0;
    this.containsVariable = this.doesContainVariable();
  };

  parse = () => {
    // TODO: Implement this later
    this.parsedSuccessful = true;

    // LR: Fake value for now
    this.parsed = Math.floor(Math.random() * 100);

    // LR: If the value is invalid hide the line
    this.isVisible = this.shouldBeVisible();
  };

  shouldBeVisible = () => {
    // Null or undefined value?
    if (this.parsed === null || typeof this.parsed === 'undefined')
      return false;

    // The line content is empty?
    if (this.lineContent.length === 0) return false;

    return true;
  };

  // Helpers
  doesContainVariable = () => {
    // LR: Lex the line content
    lexer.reset(this.lineContent);

    // LR: Search for variable
    // eslint-disable-next-line no-restricted-syntax
    for (const token of lexer) {
      if (token.type === 'identifier') return true;
    }

    return false;
  };
}
