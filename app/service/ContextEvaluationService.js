import lexer from '../logic/Lexer';

class ContextEvaluationService {
  constructor() {
    console.log('[ContextEvaluationService] Setup');
  }

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
    console.groupEnd();
  };

  parse = content => {
    // LR: Logging group
    console.groupCollapsed('[ContextEvaluationService] Parse');

    const lines = content.split('\n');
    console.log(`Parsing ${lines.length} line(s)`);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];

      if (line.length > 0) this.parseLine(i + 1, line);
    }

    // LR: End logging group
    console.groupEnd();
  };
}

const contextEvalulationService = new ContextEvaluationService();

export default contextEvalulationService;
