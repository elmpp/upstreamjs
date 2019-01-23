#!/usr/bin/env node
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const path_1 = __importDefault(require("path"));
const processArgv = JSON.parse(JSON.stringify(process.argv));
processArgv[1] = `${__dirname}/${path_1.default.basename(processArgv[1])}`;
commander_1.default
    .version('0.1.0')
    .command('map', 'Handle mappings')
    .parse(processArgv);
//# sourceMappingURL=wiremock.js.map