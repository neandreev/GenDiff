import _ from 'lodash';
import getFormatter from './formatters/formatters.js';
import parse from './parsers.js';

export default (filePath1, filePath2, outputFormat) => {
  const parsedFile1 = parse(filePath1);
  const parsedFile2 = parse(filePath2);
  const format = getFormatter(outputFormat);

  const gendiff = (object1, object2) => {
    const file1keys = Object.keys(object1);
    const file2keys = Object.keys(object2);
    const keys = _.union([...file1keys, ...file2keys]);

    const gendiffTree = keys.map((key) => {
      const valueBefore = object1[key];
      const valueAfter = object2[key];
      const prop = { key, valueBefore, valueAfter };

      if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
        return { key, status: 'children', children: gendiff(valueBefore, valueAfter) };
      }

      if (!file1keys.includes(key) && file2keys.includes(key)) {
        return { ...prop, status: 'added' };
      }

      if (file1keys.includes(key) && !file2keys.includes(key)) {
        return { ...prop, status: 'removed' };
      }

      if (valueBefore === valueAfter) {
        return { ...prop, status: 'unchanged' };
      }

      return { ...prop, status: 'changed' };
    });

    const sortedGendiffTree = _.sortBy(gendiffTree, ['key']);
    return sortedGendiffTree;
  };

  const diff = gendiff(parsedFile1, parsedFile2);
  const renderedDiff = format(diff);
  return renderedDiff;
};
