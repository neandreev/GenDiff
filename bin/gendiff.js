#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program
  .version('0.0.1')
  .arguments('<firstFile> <secondFile>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((filepath1, filepath2, options) => console.log(
    gendiff(filepath1, filepath2, options.format),
  ));

program.parse(process.argv);
