#!/usr/bin/env node
'use strict'

import program from 'commander'
import {DefaultApi} from '../client/api'

const defaultBasePath = 'http://localhost:9999'

program // https://goo.gl/6Tprx9
  .option('-b, --base-path [basePath]', `The base path of the wiremock server. Defaults to '${defaultBasePath}'`)
  .action(async function(options) {
    // var mode = options.setup_mode || "normal";
    // env = env || 'all';
    // console.log('setup for %s env(s) with %s mode', env, mode);

    const {basePath = defaultBasePath} = options

    const client = new DefaultApi(basePath)

    try {
      const mappings = await client.mappingsGet()
      console.log(mappings)
    } catch (error) {
      console.error(error)
    }
  })
  .parse(process.argv)
