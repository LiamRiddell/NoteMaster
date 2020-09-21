/* eslint-disable no-console */
import nearley from 'nearley';
import grammar from './grammar/compiled/nml';

class NMLParserService {
  // eslint-disable-next-line consistent-return
  parse = content => {
    try {
      // LR: Create Parser
      const parser = new nearley.Parser(grammar);

      // LR: Feed the line to the nearley parser
      parser.feed(content);

      // LR: Evaulate the results
      if (parser.results.length > 1) {
        console.log('NLP Result -> Ambigous Action');

        return {
          parsedSuccessful: false
        };
      }

      if (parser.results.length === 1) {
        // LR: Get the result from the results array
        const ast = parser.results[0];
        console.log('NLP Result -> Valid Statement -> Result:', ast);

        return {
          parsedSuccessful: true,
          unit: ast
        };
      }

      return {
        parsedSuccessful: false
      };

      // eslint-disable-next-line no-empty
    } catch (error) {
      console.error(error);
    }
  };
}

const NMLParser = new NMLParserService();

export default NMLParser;
