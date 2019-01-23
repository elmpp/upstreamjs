#!/usr/bin/env node
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const api_1 = require("../client/api");
const defaultBasePath = 'http://localhost:9999';
commander_1.default
    .option('-b, --base-path [basePath]', `The base path of the wiremock server. Defaults to '${defaultBasePath}'`)
    .action(async function (options) {
    const { basePath = defaultBasePath } = options;
    const client = new api_1.DefaultApi(basePath);
    const snapshot = {
        "filters": {
            "method": "ANY",
            "headers": {
                "x-feed-supplier": {
                    "contains": "coral"
                }
            }
        },
    };
    try {
        const res = await client.recordingsSnapshotPost(snapshot);
        console.log(res);
    }
    catch (error) {
        console.error(error);
    }
})
    .parse(process.argv);
//# sourceMappingURL=wiremock-snapshot-create.js.map