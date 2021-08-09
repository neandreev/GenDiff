import _ from 'lodash';
import getFormatter from './formatters/formatters.js';
import parse from './parsers.js';

export default (filepath1, filepath2, format) => {
  const [file1Obj, file2Obj] = [parse(filepath1), parse(filepath2)];
  const formatter = getFormatter(format);

  const gendiff = (object1, object2) => {
    const [file1keys, file2keys] = [object1, object2].map(Object.keys);
    const keys = _.union([...file1keys, ...file2keys]);

    const gendiffTree = keys.reduce((acc, key) => {
      const [valueBefore, valueAfter] = [object1[key], object2[key]];
      const prop = {
        key,
        valueBefore,
        valueAfter,
        status: 'unchanged',
      };

      if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
        return [...acc, { ...prop, status: 'children', children: gendiff(valueBefore, valueAfter) }];
      }

      if (!file1keys.includes(key) && file2keys.includes(key)) { // property was added
        return [...acc, { ...prop, status: 'added' }];
      }

      if (file1keys.includes(key) && !file2keys.includes(key)) { // property was removed
        return [...acc, { ...prop, status: 'removed' }];
      }

      if (valueBefore === valueAfter) {
        return [...acc, prop];
      }

      return [...acc, { ...prop, status: 'removed' }, { ...prop, status: 'added' }];
    }, []);

    return _.sortBy(gendiffTree, ['key']);
  };

  const diff = gendiff(file1Obj, file2Obj);
  const resultText = formatter(diff);
  return resultText;
};
