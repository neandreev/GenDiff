import { beforeEach, expect, test } from '@jest/globals';
import jsonGendiff from '../src/jsongendiff.js';
import fs from 'fs';

let filepath1, filepath2, resultPath, result;

beforeEach(() => {
  filepath1 = '__tests__/__fixtures__/json/config1.json';
  filepath2 = '__tests__/__fixtures__/json/config2.json';
  resultPath = '__tests__/__fixtures__/json/result.txt';
  result = fs.readFileSync(resultPath);
});

test('jsonGendiff', () => {
  expect(
    jsonGendiff(filepath1, filepath2)
  )
    .toEqual(result);
});