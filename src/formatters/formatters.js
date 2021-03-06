import jsonFormatter from './jsonFormat.js';
import plainFormatter from './plainFormat.js';
import prettyFormatter from './prettyFormat.js';

export default (format) => {
  switch (format) {
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    case 'pretty':
      return prettyFormatter;
    default:
      throw new Error(`Unknown output format: ${format}`);
  }
};
