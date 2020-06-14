import { Parser, Grammar } from 'nearley';
import lexer from '../logic/Lexer';
import grammar from '../nearley/arithmetic.ne';

class ContextEvaluationService {
  parseLine = (lineNumber, content) => {
    console.groupCollapsed(`Line ${lineNumber}`);

    // LR: Log the content
    console.log(`%c${content}`, 'color: Green');

    // LR: Parse the line
    lexer.reset(content);

    // eslint-disable-next-line no-restricted-syntax
    for (const token of lexer) {
      console.log(`[${lineNumber}] =>`, token.value, `\t\t(${token.type})`);
    }

    // LR: Parse the line through nearley
    try {
      const ans = new Parser(Grammar.fromCompiled(grammar)).feed(content);

      if (ans.results.length > 0) {
        console.log(
          '[Nearley] Result:',
          ans.results,
          '# Results:',
          ans.results.length
        );

        console.groupEnd();

        return {
          lineNumber,
          lineContent: content,
          results: ans.results
        };
      }

      console.log('[Nearley] No Results');
    } catch (e) {
      console.log('[Nearley] Exception', e);
    }

    console.groupEnd();
  };

  parse = content => {
    // LR: Logging group
    console.groupCollapsed('[ContextEvaluationService] Parse');

    const lines = content.split('\n');
    console.log(`Parsing ${lines.length} line(s)`);

    const lineParseResultsArray = [];

    // LR: Parse content line by line
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];

      // LR: if the line has content then parse it - if not skip
      if (line.length > 0) {
        const result = this.parseLine(i + 1, line);
        if (typeof result !== 'undefined') lineParseResultsArray.push(result);
      }
    }

    console.log(`Parsed ${lines.length} line(s)`, lineParseResultsArray);

    // LR: End logging group
    console.groupEnd();

    // LR: Return the parsed results
    return lineParseResultsArray;
  };
}

const contextEvalulationService = new ContextEvaluationService();

export default contextEvalulationService;
