import _ from 'lodash';

const addSpaces = (depth) => '    '.repeat(depth);
const addSign = (status) => {
  switch (status) {
    case 'added':
      return '  + ';
    case 'removed':
      return '  - ';
    default:
      return '    ';
  }
};

const renderValue = (prop) => {
  const {
    valueBefore, valueAfter, status, depth,
  } = prop;
  const spaces = addSpaces(depth);
  const key = `${spaces}${addSign(status)}${prop.key}`;
  const value = (status === 'added') ? valueAfter : valueBefore;

  if (!_.isObject(value)) return `${key}: ${value}`;

  const entryToElem = ([entrykey, entryvalue]) => (
    { depth: depth + 1, key: entrykey, valueBefore: entryvalue }
  );

  const renderedValues = Object.entries(value)
    .map(entryToElem)
    .flatMap(renderValue);

  return [
    `${key}: {`,
    ...renderedValues,
    `${addSpaces(depth + 1)}}`,
  ];
};

const renderElement = (depth, stylish) => (prop) => {
  const { children, status, key } = prop;
  const spaces = addSpaces(depth + 1);

  if (status === 'children') {
    return [
      `${spaces}${key}: {`,
      stylish(children, depth + 1),
      `${spaces}}`,
    ];
  }

  if (status === 'changed') {
    return [
      renderValue({ ...prop, depth, status: 'removed' }),
      renderValue({ ...prop, depth, status: 'added' }),
    ];
  }

  return renderValue({ ...prop, depth });
};

const stylish = (diff, depth = 0) => {
  const renderedElements = diff.flatMap(renderElement(depth, stylish));
  const renderedOutput = _.flatten(renderedElements).join('\n');
  return renderedOutput;
};

export default (diff) => `{\n${stylish(diff)}\n}`;
