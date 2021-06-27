import { beforeEach, expect, test } from '@jest/globals';
import fs from 'fs';
import jsonGendiff from '../src/jsongendiff.js';

let filepath1;
let filepath2;
let resultPath;
let result;

beforeEach(() => {
  filepath1 = '__tests__/__fixtures__/json/config1.json';
  filepath2 = '__tests__/__fixtures__/json/config2.json';
  resultPath = '__tests__/__fixtures__/json/result.txt';
  result = fs.readFileSync(resultPath, 'utf-8');
});

test('jsonGendiff', () => {
  expect(
    jsonGendiff(filepath1, filepath2),
  )
    .toEqual(result);
});
