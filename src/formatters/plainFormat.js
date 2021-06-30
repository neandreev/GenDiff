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
    const markedValue = (typeof value === 'string') ? `'${value}'` : value;
    const formattedValue = _.isObject(markedValue) ? '[complex value]' : markedValue;

    return [...acc, [fullKey.join('.'), status, formattedValue]];
  }, []);
  const sorted = _.sortBy(pathAndValue, [0]);

  const plainOutput = sorted.reduce((acc, [keypath, propStatus, value], index) => {
    const blank = `Property '${keypath}'`;
    const stringByStatus = (stat) => {
      switch (stat) {
        case 'added':
          return `was added with value: ${value}`;
        default:
          return 'was removed';
      }
    };

    const [nextProp, prevProp] = [sorted[index + 1], sorted[index - 1]];
    if (!!prevProp && prevProp[0] === keypath) return acc;
    if (!!nextProp && nextProp[0] === keypath) {
      const updatedValue = nextProp[2];
      const changedBlank = `was updated. From ${value} to ${updatedValue}`;
      return [...acc, [blank, changedBlank].join(' ')];
    }

    return [...acc, [blank, stringByStatus(propStatus)].join(' ')];
  }, []).join('\n');

  return plainOutput;
};

export default stylish;
