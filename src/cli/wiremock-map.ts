#!/usr/bin/env node
'use strict'

import program from 'commander'

program
  .command('list', 'List mappings')
  .parse(process.argv)
