import _ from 'lodash';

const stylish = (diff) => {
  const makeFlat = (elem, path = []) => {
    const clearDiff = _.filter(elem, ({ status }) => status !== 'unchanged');

    const result = clearDiff.reduce((acc, prop) => {
      if (_.has(prop, 'children')) {
        return [...acc, ...makeFlat(prop.children, [...path, prop.key])];
      }
      return [...acc, ({ ...prop, fullKey: [...path, prop.key] })];
    }, []);

    return result;
  };

  const result = _.flatten(makeFlat(diff, []));
  const pathAndValue = _.reduce(result, (acc, elem) => {
    const {
      fullKey, valueAfter, valueBefore, status,
    } = elem;

    const value = (status === 'added') ? valueAfter : valueBefore;
    const formattedValue = _.isObject(value) ? '[complex value]' : value;

    return [...acc, [fullKey.join('.'), status, formattedValue]];
  }, []);
  const sorted = _.sortBy(pathAndValue, (e) => e[0]);
  console.log(JSON.stringify(sorted, null, '  '));

  return result;
};

export default stylish;
