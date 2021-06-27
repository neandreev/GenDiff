import path from 'path';
import fs from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => (
  [filepath1, filepath2]
    .map((filepath) => path.resolve(process.cwd(), filepath))
    .map((normalizedPath) => JSON.parse(fs.readFileSync(normalizedPath)))
);