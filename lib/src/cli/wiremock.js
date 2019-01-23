"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const package_json_1 = require("../../package.json");
commander_1.default
    .version(package_json_1.version)
    .command('mapping', 'Handle mappings')
    .parse(process.argv);
//# sourceMappingURL=wiremock.js.map