#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const api_1 = require("../client/api");
const defaultBasePath = 'http://localhost:9999';
commander_1.default
    .option('-b, --base-path [basePath]', `The base path of the wiremock server. Defaults to '${defaultBasePath}'`)
    .action(function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { basePath = defaultBasePath } = options;
        const client = new api_1.DefaultApi(basePath);
        try {
            const mappings = yield client.mappingsGet();
            console.log(mappings);
        }
        catch (error) {
            console.error(error);
        }
    });
})
    .parse(process.argv);
//# sourceMappingURL=wiremock-map-list.js.map