import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const extension = path.extname(filepath);
  const fullpath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(fullpath, 'utf-8');

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    default:
      return yaml.load(fileContent);
  }
};
