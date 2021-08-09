import _ from 'lodash';

const renderValue = (value) => {
  const markedValue = (typeof value === 'string')
    ? `'${value}'`
    : value;

  const formattedValue = _.isObject(markedValue)
    ? '[complex value]'
    : markedValue;

  return formattedValue;
};

const blanks = {
  changed: (originalValue, modifiedValue) => `was updated. From ${originalValue} to ${modifiedValue}`,
  added: (value) => `was added with value: ${value}`,
  removed: () => 'was removed',
};

const renderElement = (elem) => {
  const {
    keypath, status, valueAfter, valueBefore,
  } = elem;

  const blank = `Property '${keypath}'`;

  switch (status) {
    case 'added':
      return `${blank} ${blanks.added(valueAfter)}`;
    case 'removed':
      return `${blank} ${blanks.removed()}`;
    case 'changed':
      return `${blank} ${blanks.changed(valueBefore, valueAfter)}`;
    default:
      throw new Error();
  }
};

const parseElement = (elem) => {
  const { keypath, status } = elem;

  const [valueBefore, valueAfter] = [
    renderValue(elem.valueBefore),
    renderValue(elem.valueAfter),
  ];

  const parsedElement = {
    keypath,
    status,
    valueBefore,
    valueAfter,
  };

  return parsedElement;
};

const makeFlatDiff = (elem, path = []) => {
  const unchangedProps = _.filter(elem, ['status', 'unchanged']);
  const changedProps = _.difference(elem, unchangedProps);

  const flatDiff = changedProps.reduce((acc, prop) => {
    const { key, children } = prop;
    const newKeysArray = [...path, key];

    if (_.has(prop, 'children')) {
      return [...acc, ...makeFlatDiff(children, newKeysArray)];
    }

    const keypath = newKeysArray.join('.');
    const flatProp = { ...prop, keypath };

    return [...acc, flatProp];
  }, []);

  return flatDiff;
};

const stylish = (diff) => {
  const renderedOutput = makeFlatDiff(diff)
    .map(parseElement)
    .map(renderElement)
    .join('\n');

  return renderedOutput;
};

export default stylish;
