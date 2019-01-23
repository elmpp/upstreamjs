#!/usr/bin/env node
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const api_1 = require("../client/api");
commander_1.default
    .command('list', 'List mappings')
    .option("-b, --base-path [basePath]", "The base path of the wiremock server. Defaults to 'http://locahost:9999'")
    .action(function (options) {
    const { basePath = 'http://localhost:9999' } = options;
    const client = new api_1.DefaultApi(basePath);
    console.log(client.mappingsGet());
})
    .parse(process.argv);
//# sourceMappingURL=wiremock-mapping.js.map