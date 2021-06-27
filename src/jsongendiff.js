import _ from 'lodash';
import parse from './parser.js';

const sortByFirstElement = (arr) => _.sortBy(arr, (elem) => elem[0]);

const jsonGendiff = (filepath1, filepath2, format = 'json') => {
  const filesObjects = parse(filepath1, filepath2);
  const [file1Obj, file2Obj] = filesObjects;
  const [file1keys, file2keys] = filesObjects.map(Object.keys);
  const allKeys = _.sortBy(_.uniq([...file1keys, ...file2keys]), (e) => e);

  const makeGendiff = (keys) => {
    const textGendiff = keys.reduce((acc, key) => {
      if (file1keys.includes(key) && file2keys.includes(key) && file1Obj[key] === file2Obj[key]) {  //property was unchanged
        return [...acc, `    ${key}: ${file1Obj[key]}`];
      }

      if (file1keys.includes(key) && file2keys.includes(key)) {   //property was changed
        return [...acc, `  - ${key}: ${file1Obj[key]}`, `  + ${key}: ${file2Obj[key]}`];
      }

      if (!file1keys.includes(key) && file2keys.includes(key)) {  //property was added
        return [...acc, `  + ${key}: ${file2Obj[key]}`]
      }

      if (file1keys.includes(key) && !file2keys.includes(key)) {  //property was removed
        return [...acc, `  - ${key}: ${file1Obj[key]}`]
      }
    }, []);

    return `{${textGendiff.reduce((arr, elem) => arr + `\n${elem}`, ``)}\n}`;
  }

  return makeGendiff(allKeys);
};

export default jsonGendiff;