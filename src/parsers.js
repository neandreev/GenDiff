import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filePath) => {
  const extension = path.extname(filePath);
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullFilePath, 'utf-8');

  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.load(fileContent);
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};
