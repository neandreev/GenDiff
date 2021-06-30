import jsonFormatter from './jsonFormat.js';
import plainFormatter from './plainFormat.js';
import prettyFormatter from './prettyFormat.js';

export default (format) => {
  switch (format) {
    case 'pretty':
      return prettyFormatter;
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error('Unknown output format, please try again');
  }
};
