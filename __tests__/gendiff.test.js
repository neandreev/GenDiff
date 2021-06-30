import fs from 'fs';
import path from 'path';
import { test, describe, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';

const getFixturePath = (ext, num) => path.resolve(
  process.cwd(),
  '__tests__/__fixtures__',
  ext,
  `config${num}.${ext}`,
);

const getResultPath = (format) => path.resolve(
  process.cwd(),
  '__tests__/__fixtures__',
  `${format}Result.txt`,
);

describe.each([
  ['json'],
  ['yaml'],
])('gendiff, %s', (ext) => {
  describe.each`
    format
    ${'pretty'}
    ${'plain'}
    ${'json'}
  `('format: $format', ({ format }) => {
    test('works well', () => {
      const filepath1 = getFixturePath(ext, 1);
      const filepath2 = getFixturePath(ext, 2);

      const result = fs.readFileSync(getResultPath(format), 'utf-8');

      const gendiffResult = gendiff(filepath1, filepath2, format);
      expect(gendiffResult).toEqual(result);
    });
  });
});
