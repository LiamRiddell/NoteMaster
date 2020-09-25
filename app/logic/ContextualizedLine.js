import lexer from '../nearley/lexer/lexer';
import NMLParserService from '../nearley/NMLParserService';

export default class ContextualizedLine {
  // -- Core
  // Stores the zero-based line number
  lineNumberIndex;

  // Stores the line number for this line
  lineNumber;

  // Stores the content (text) for this line
  lineContent;

  // -- Parsing
  // Stores the parser object result (these will be instances of NMLBaseUnit)
  unitResult;

  // Stores the parser result from Nearley (this will most-likely become an object)
  unitResultValue;

  // Stores the charcter length of the result (used for calculating text wrapping width)
  unitResultValueCharacterLength;

  // Stores boolean value of whether the line was parsed successfully
  parsedSuccessful;

  // -- Flags
  shouldParse;

  // Stores whether the field is empty
  isEmpty;

  // Stores whether this line is a header
  containsHeader;

  // Stores whether this line is a comment
  containsComment;

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

    // LR: Reset pre-processing
    this.containsHeader = false;
    this.containsComment = false;
    this.containsVariable = false;
    this.shouldParse = false;

    // LR: Pre-process with lexer. We can use this for meta-information and deciding to parse e.g:
    // 1. Does it contain variable?
    // 2. Is this text?
    // Empty Line? We don't parse
    // eslint-disable-next-line no-unused-expressions
    !this.isEmpty ? this.gatherMetadata() : (this.shouldParse = false);
  };

  parse = () => {
    // TODO: Only parse if requested
    if (!this.shouldParse) {
      this.parsedSuccessful = false;
      this.parsedValue = '';
      this.parsedValueCharacterLength = 0;
      this.isVisible = false;
      return;
    }

    // LR: Pass to the NML language parser
    const result = NMLParserService.parse(this.lineContent);

    if (
      result === null ||
      typeof result === 'undefined' ||
      result.unitResult === null ||
      result.parsedSuccessful === false
    ) {
      this.parsedSuccessful = false;
      this.parsedValue = '';
      this.parsedValueCharacterLength = 0;
      this.isVisible = false;
      return;
    }

    if (result.parsedSuccessful) {
      // LR: Set the parse as successful
      this.parsedSuccessful = true;

      // LR: Set the parsed unit
      this.unitResult = result.unit;

      // LR: Set the parsed value result
      this.unitResultValue = this.unitResult.prettify();

      // LR: Calculate the parsed value length
      this.unitResultValueCharacterLength = String(this.unitResultValue).length;

      // LR: If the value is invalid hide the line
      this.isVisible = this.shouldBeVisible();
    } else {
      this.parsedSuccessful = false;
      this.parsedValue = '';
      this.parsedValueCharacterLength = 0;
      this.isVisible = false;
    }
  };

  shouldBeVisible = () => {
    // Null or undefined value?
    if (this.unitResult === null || typeof this.unitResult === 'undefined')
      return false;

    // The line content is empty?
    if (this.lineContent.length === 0) return false;

    return true;
  };

  gatherMetadata = () => {
    // LR: Lex the line content
    lexer.reset(this.lineContent);

    // LR: Count the number of words in the sentance
    let numberOfTokens = 0;

    // LR: Used for validating if this line is parsable. e.g. if most of this sentence is words then we can skip it.
    let wordTokenCount = 0;

    // LR: Search for variable
    // eslint-disable-next-line no-restricted-syntax
    for (const token of lexer) {
      switch (token.type) {
        case 'header':
          this.containsHeader = true;
          break;

        case 'comment':
          this.containsComment = true;
          break;

        case 'indentifier':
          // LR: If sentance contains variable then set the meta data
          this.containsVariable = true;
          break;

        case 'word':
          // LR: Increase the word counter
          wordTokenCount += 1;
          break;

        default:
          numberOfTokens += 1;
          break;
      }
    }

    // LR: If it's a comment or header then don't parse
    if (this.containsHeader || this.containsComment) {
      this.shouldParse = false;
      return;
    }

    // LR: If the number of token is greater than 50% of the query then let's ignore it
    const queryWordRatio = wordTokenCount / numberOfTokens;

    if (queryWordRatio > 0.5) {
      this.shouldParse = false;
      return;
    }

    // LR: If all the checks have passed and we're confident this is parsable then pass it to the parser.
    this.shouldParse = true;
  };

  supportsParallelProcessing = () => {};
}
