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

const stylishValue = (prop, depth) => {
  const {
    key, valueBefore, valueAfter, status,
  } = prop;
  const spaces = addSpaces(depth);
  const value = (status === 'added') ? valueAfter : valueBefore;

  if (!_.isObject(value)) return `${spaces}${addSign(status)}${key}: ${value}`;

  const result = Object.entries(value).flatMap(([entryKey, entryValue]) => {
    const newProp = {
      key: entryKey,
      valueBefore: entryValue,
      status: 'unchanged',
    };

    return stylishValue(newProp, depth + 1);
  });

  return [
    `${spaces}${addSign(status)}${key}: {`,
    ...result,
    `${spaces}    }`,
  ];
};

const stylish = (tree, depth = 0) => {
  const result = _.sortBy(tree, ['key']).flatMap((prop) => {
    const { status, key } = prop;

    const spaces = addSpaces(depth);

    if (status === 'children') {
      return [
        `${spaces}    ${key}: {`,
        stylish(prop.children, depth + 1),
        `${spaces}    }`,
      ];
    }

    return stylishValue(prop, depth);
  });

  return _.flatten(result).join('\n');
};

export default (tree) => `{\n${stylish(tree)}\n}`;
