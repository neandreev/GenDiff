import _ from 'lodash';

const stringByStatus = (stat, value) => {
  switch (stat) {
    case 'added':
      return `was added with value: ${value}`;
    case 'removed':
      return 'was removed';
    default:
      throw new Error();
  }
};

const renderDifferenceString = (acc, { keypath, status, value }, index, arr) => {
  const blank = `Property '${keypath}'`;

  const [nextProp, prevProp] = [arr[index + 1], arr[index - 1]];
  if (!!prevProp && prevProp.keypath === keypath) return acc;
  if (!!nextProp && nextProp.keypath === keypath) {
    const updatedValue = nextProp.value;
    const changedBlank = `was updated. From ${value} to ${updatedValue}`;
    return [...acc, [blank, changedBlank].join(' ')];
  }

  return [...acc, [blank, stringByStatus(status, value)].join(' ')];
};

const parseElements = (acc, elem) => {
  const {
    fullKey, valueAfter, valueBefore, status,
  } = elem;

  const value = (status === 'added') ? valueAfter : valueBefore;
  const markedValue = (typeof value === 'string') ? `'${value}'` : value;
  const formattedValue = _.isObject(markedValue) ? '[complex value]' : markedValue;
  return [...acc, { keypath: fullKey.join('.'), status, value: formattedValue }];
};

const makeDiffFlat = (elem, path = []) => {
  const unchanged = _.filter(elem, ['status', 'unchanged']);
  const changed = _.difference(elem, unchanged);

  const result = changed.reduce((acc, prop) => {
    if (_.has(prop, 'children')) {
      return [...acc, ...makeDiffFlat(prop.children, [...path, prop.key])];
    }
    return [...acc, ({ ...prop, fullKey: [...path, prop.key] })];
  }, []);

  return result;
};

const stylish = (diff) => {
  const flatDiff = makeDiffFlat(diff);
  const parsedElements = flatDiff.reduce(parseElements, []);
  const plainOutput = parsedElements.reduce(renderDifferenceString, []).join('\n');

  return plainOutput;
};

export default stylish;
