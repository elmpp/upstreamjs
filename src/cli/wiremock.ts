#!/usr/bin/env node
'use strict'

import program from 'commander'
import path from 'path'

// need to "shift" cwd up to built cli (we cannot maintain executable file permission in there)
const processArgv = JSON.parse(JSON.stringify(process.argv))

// console.log('process.argv :', process.argv);
// console.log('processArgv :', processArgv);
// console.log('__dirname :', __dirname);

processArgv[1] = `${__dirname}/${path.basename(processArgv[1])}`

// console.log('processArgv :', processArgv);

program // https://goo.gl/6Tprx9
  .version('0.1.0')
  .command('map', 'Handle mappings')
  .parse(processArgv)
