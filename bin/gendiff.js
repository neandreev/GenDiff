#!/usr/bin/env node

import { program } from 'commander';
import jsonGendiff from '../src/jsongendiff.js';

program
  .version('0.0.1')
  .arguments('<firstFile> <secondFile>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(jsonGendiff(filepath1, filepath2)));

program.parse(process.argv);