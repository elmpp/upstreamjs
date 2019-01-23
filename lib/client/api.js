"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localVarRequest = require("request");
const Promise = require("bluebird");
let defaultBasePath = 'https://localhost/__admin';
let primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType;
            }
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType;
            }
            else {
                if (data[discriminatorProperty]) {
                    return data[discriminatorProperty];
                }
                else {
                    return expectedType;
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
class ContentPattern {
    static getAttributeTypeMap() {
        return ContentPattern.attributeTypeMap;
    }
}
ContentPattern.discriminator = undefined;
ContentPattern.attributeTypeMap = [];
exports.ContentPattern = ContentPattern;
class GlobalSettings {
    static getAttributeTypeMap() {
        return GlobalSettings.attributeTypeMap;
    }
}
GlobalSettings.discriminator = undefined;
GlobalSettings.attributeTypeMap = [
    {
        "name": "delayDistribution",
        "baseName": "delayDistribution",
        "type": "any"
    },
    {
        "name": "fixedDelay",
        "baseName": "fixedDelay",
        "type": "number"
    }
];
exports.GlobalSettings = GlobalSettings;
class LoggedRequest {
    static getAttributeTypeMap() {
        return LoggedRequest.attributeTypeMap;
    }
}
LoggedRequest.discriminator = undefined;
LoggedRequest.attributeTypeMap = [
    {
        "name": "absoluteUrl",
        "baseName": "absoluteUrl",
        "type": "string"
    },
    {
        "name": "body",
        "baseName": "body",
        "type": "string"
    },
    {
        "name": "cookies",
        "baseName": "cookies",
        "type": "any"
    },
    {
        "name": "headers",
        "baseName": "headers",
        "type": "any"
    },
    {
        "name": "method",
        "baseName": "method",
        "type": "string"
    },
    {
        "name": "url",
        "baseName": "url",
        "type": "string"
    }
];
exports.LoggedRequest = LoggedRequest;
class RequestPattern {
    static getAttributeTypeMap() {
        return RequestPattern.attributeTypeMap;
    }
}
RequestPattern.discriminator = undefined;
RequestPattern.attributeTypeMap = [
    {
        "name": "basicAuthCredentials",
        "baseName": "basicAuthCredentials",
        "type": "RequestPatternBasicAuthCredentials"
    },
    {
        "name": "bodyPatterns",
        "baseName": "bodyPatterns",
        "type": "Array<any>"
    },
    {
        "name": "cookies",
        "baseName": "cookies",
        "type": "any"
    },
    {
        "name": "headers",
        "baseName": "headers",
        "type": "any"
    },
    {
        "name": "method",
        "baseName": "method",
        "type": "string"
    },
    {
        "name": "_queryParameters",
        "baseName": "queryParameters",
        "type": "any"
    },
    {
        "name": "url",
        "baseName": "url",
        "type": "string"
    },
    {
        "name": "urlPath",
        "baseName": "urlPath",
        "type": "string"
    },
    {
        "name": "urlPathPattern",
        "baseName": "urlPathPattern",
        "type": "string"
    },
    {
        "name": "urlPattern",
        "baseName": "urlPattern",
        "type": "string"
    }
];
exports.RequestPattern = RequestPattern;
class RequestPatternBasicAuthCredentials {
    static getAttributeTypeMap() {
        return RequestPatternBasicAuthCredentials.attributeTypeMap;
    }
}
RequestPatternBasicAuthCredentials.discriminator = undefined;
RequestPatternBasicAuthCredentials.attributeTypeMap = [
    {
        "name": "password",
        "baseName": "password",
        "type": "string"
    },
    {
        "name": "username",
        "baseName": "username",
        "type": "string"
    }
];
exports.RequestPatternBasicAuthCredentials = RequestPatternBasicAuthCredentials;
class Scenarios {
    static getAttributeTypeMap() {
        return Scenarios.attributeTypeMap;
    }
}
Scenarios.discriminator = undefined;
Scenarios.attributeTypeMap = [
    {
        "name": "scenarios",
        "baseName": "scenarios",
        "type": "Array<ScenariosScenarios>"
    }
];
exports.Scenarios = Scenarios;
class ScenariosScenarios {
    static getAttributeTypeMap() {
        return ScenariosScenarios.attributeTypeMap;
    }
}
ScenariosScenarios.discriminator = undefined;
ScenariosScenarios.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "name",
        "type": "string"
    },
    {
        "name": "possibleStates",
        "baseName": "possibleStates",
        "type": "Array<string>"
    },
    {
        "name": "state",
        "baseName": "state",
        "type": "string"
    }
];
exports.ScenariosScenarios = ScenariosScenarios;
class Snapshot {
    static getAttributeTypeMap() {
        return Snapshot.attributeTypeMap;
    }
}
Snapshot.discriminator = undefined;
Snapshot.attributeTypeMap = [
    {
        "name": "filters",
        "baseName": "filters",
        "type": "any"
    }
];
exports.Snapshot = Snapshot;
class StartRecording {
    static getAttributeTypeMap() {
        return StartRecording.attributeTypeMap;
    }
}
StartRecording.discriminator = undefined;
StartRecording.attributeTypeMap = [
    {
        "name": "filters",
        "baseName": "filters",
        "type": "StartRecordingFilters"
    },
    {
        "name": "targetBaseUrl",
        "baseName": "targetBaseUrl",
        "type": "string"
    }
];
exports.StartRecording = StartRecording;
class StartRecordingFilters {
    static getAttributeTypeMap() {
        return StartRecordingFilters.attributeTypeMap;
    }
}
StartRecordingFilters.discriminator = undefined;
StartRecordingFilters.attributeTypeMap = [
    {
        "name": "basicAuthCredentials",
        "baseName": "basicAuthCredentials",
        "type": "RequestPatternBasicAuthCredentials"
    },
    {
        "name": "bodyPatterns",
        "baseName": "bodyPatterns",
        "type": "Array<any>"
    },
    {
        "name": "cookies",
        "baseName": "cookies",
        "type": "any"
    },
    {
        "name": "headers",
        "baseName": "headers",
        "type": "any"
    },
    {
        "name": "method",
        "baseName": "method",
        "type": "string"
    },
    {
        "name": "_queryParameters",
        "baseName": "queryParameters",
        "type": "any"
    },
    {
        "name": "url",
        "baseName": "url",
        "type": "string"
    },
    {
        "name": "urlPath",
        "baseName": "urlPath",
        "type": "string"
    },
    {
        "name": "urlPathPattern",
        "baseName": "urlPathPattern",
        "type": "string"
    },
    {
        "name": "urlPattern",
        "baseName": "urlPattern",
        "type": "string"
    }
];
exports.StartRecordingFilters = StartRecordingFilters;
class StubMapping {
    static getAttributeTypeMap() {
        return StubMapping.attributeTypeMap;
    }
}
StubMapping.discriminator = undefined;
StubMapping.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "metadata",
        "baseName": "metadata",
        "type": "any"
    },
    {
        "name": "newScenarioState",
        "baseName": "newScenarioState",
        "type": "string"
    },
    {
        "name": "persistent",
        "baseName": "persistent",
        "type": "boolean"
    },
    {
        "name": "postServeActions",
        "baseName": "postServeActions",
        "type": "any"
    },
    {
        "name": "priority",
        "baseName": "priority",
        "type": "number"
    },
    {
        "name": "request",
        "baseName": "request",
        "type": "StubMappingRequest"
    },
    {
        "name": "requiredScenarioState",
        "baseName": "requiredScenarioState",
        "type": "string"
    },
    {
        "name": "response",
        "baseName": "response",
        "type": "StubMappingResponse"
    },
    {
        "name": "scenarioName",
        "baseName": "scenarioName",
        "type": "string"
    }
];
exports.StubMapping = StubMapping;
class StubMappingRequest {
    static getAttributeTypeMap() {
        return StubMappingRequest.attributeTypeMap;
    }
}
StubMappingRequest.discriminator = undefined;
StubMappingRequest.attributeTypeMap = [
    {
        "name": "basicAuthCredentials",
        "baseName": "basicAuthCredentials",
        "type": "RequestPatternBasicAuthCredentials"
    },
    {
        "name": "bodyPatterns",
        "baseName": "bodyPatterns",
        "type": "Array<any>"
    },
    {
        "name": "cookies",
        "baseName": "cookies",
        "type": "any"
    },
    {
        "name": "headers",
        "baseName": "headers",
        "type": "any"
    },
    {
        "name": "method",
        "baseName": "method",
        "type": "string"
    },
    {
        "name": "_queryParameters",
        "baseName": "queryParameters",
        "type": "any"
    },
    {
        "name": "url",
        "baseName": "url",
        "type": "string"
    },
    {
        "name": "urlPath",
        "baseName": "urlPath",
        "type": "string"
    },
    {
        "name": "urlPathPattern",
        "baseName": "urlPathPattern",
        "type": "string"
    },
    {
        "name": "urlPattern",
        "baseName": "urlPattern",
        "type": "string"
    }
];
exports.StubMappingRequest = StubMappingRequest;
class StubMappingResponse {
    static getAttributeTypeMap() {
        return StubMappingResponse.attributeTypeMap;
    }
}
StubMappingResponse.discriminator = undefined;
StubMappingResponse.attributeTypeMap = [
    {
        "name": "additionalProxyRequestHeaders",
        "baseName": "additionalProxyRequestHeaders",
        "type": "any"
    },
    {
        "name": "base64Body",
        "baseName": "base64Body",
        "type": "string"
    },
    {
        "name": "body",
        "baseName": "body",
        "type": "string"
    },
    {
        "name": "bodyFileName",
        "baseName": "bodyFileName",
        "type": "string"
    },
    {
        "name": "delayDistribution",
        "baseName": "delayDistribution",
        "type": "any"
    },
    {
        "name": "fault",
        "baseName": "fault",
        "type": "StubMappingResponse.FaultEnum"
    },
    {
        "name": "fixedDelayMilliseconds",
        "baseName": "fixedDelayMilliseconds",
        "type": "number"
    },
    {
        "name": "fromConfiguredStub",
        "baseName": "fromConfiguredStub",
        "type": "boolean"
    },
    {
        "name": "headers",
        "baseName": "headers",
        "type": "any"
    },
    {
        "name": "jsonBody",
        "baseName": "jsonBody",
        "type": "any"
    },
    {
        "name": "proxyBaseUrl",
        "baseName": "proxyBaseUrl",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "status",
        "type": "number"
    },
    {
        "name": "statusMessage",
        "baseName": "statusMessage",
        "type": "string"
    },
    {
        "name": "transformerParameters",
        "baseName": "transformerParameters",
        "type": "any"
    },
    {
        "name": "transformers",
        "baseName": "transformers",
        "type": "Array<string>"
    }
];
exports.StubMappingResponse = StubMappingResponse;
(function (StubMappingResponse) {
    let FaultEnum;
    (function (FaultEnum) {
        FaultEnum[FaultEnum["CONNECTIONRESETBYPEER"] = 'CONNECTION_RESET_BY_PEER'] = "CONNECTIONRESETBYPEER";
        FaultEnum[FaultEnum["EMPTYRESPONSE"] = 'EMPTY_RESPONSE'] = "EMPTYRESPONSE";
        FaultEnum[FaultEnum["MALFORMEDRESPONSECHUNK"] = 'MALFORMED_RESPONSE_CHUNK'] = "MALFORMEDRESPONSECHUNK";
        FaultEnum[FaultEnum["RANDOMDATATHENCLOSE"] = 'RANDOM_DATA_THEN_CLOSE'] = "RANDOMDATATHENCLOSE";
    })(FaultEnum = StubMappingResponse.FaultEnum || (StubMappingResponse.FaultEnum = {}));
})(StubMappingResponse = exports.StubMappingResponse || (exports.StubMappingResponse = {}));
class StubMappings {
    static getAttributeTypeMap() {
        return StubMappings.attributeTypeMap;
    }
}
StubMappings.discriminator = undefined;
StubMappings.attributeTypeMap = [
    {
        "name": "mappings",
        "baseName": "mappings",
        "type": "StubMappingsMappings"
    },
    {
        "name": "meta",
        "baseName": "meta",
        "type": "StubMappingsMeta"
    }
];
exports.StubMappings = StubMappings;
class StubMappingsMappings {
    static getAttributeTypeMap() {
        return StubMappingsMappings.attributeTypeMap;
    }
}
StubMappingsMappings.discriminator = undefined;
StubMappingsMappings.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "id",
        "type": "string"
    },
    {
        "name": "metadata",
        "baseName": "metadata",
        "type": "any"
    },
    {
        "name": "newScenarioState",
        "baseName": "newScenarioState",
        "type": "string"
    },
    {
        "name": "persistent",
        "baseName": "persistent",
        "type": "boolean"
    },
    {
        "name": "postServeActions",
        "baseName": "postServeActions",
        "type": "any"
    },
    {
        "name": "priority",
        "baseName": "priority",
        "type": "number"
    },
    {
        "name": "request",
        "baseName": "request",
        "type": "StubMappingRequest"
    },
    {
        "name": "requiredScenarioState",
        "baseName": "requiredScenarioState",
        "type": "string"
    },
    {
        "name": "response",
        "baseName": "response",
        "type": "StubMappingResponse"
    },
    {
        "name": "scenarioName",
        "baseName": "scenarioName",
        "type": "string"
    }
];
exports.StubMappingsMappings = StubMappingsMappings;
class StubMappingsMeta {
    static getAttributeTypeMap() {
        return StubMappingsMeta.attributeTypeMap;
    }
}
StubMappingsMeta.discriminator = undefined;
StubMappingsMeta.attributeTypeMap = [
    {
        "name": "total",
        "baseName": "total",
        "type": "number"
    }
];
exports.StubMappingsMeta = StubMappingsMeta;
let enumsMap = {
    "StubMappingResponse.FaultEnum": StubMappingResponse.FaultEnum,
};
let typeMap = {
    "ContentPattern": ContentPattern,
    "GlobalSettings": GlobalSettings,
    "LoggedRequest": LoggedRequest,
    "RequestPattern": RequestPattern,
    "RequestPatternBasicAuthCredentials": RequestPatternBasicAuthCredentials,
    "Scenarios": Scenarios,
    "ScenariosScenarios": ScenariosScenarios,
    "Snapshot": Snapshot,
    "StartRecording": StartRecording,
    "StartRecordingFilters": StartRecordingFilters,
    "StubMapping": StubMapping,
    "StubMappingRequest": StubMappingRequest,
    "StubMappingResponse": StubMappingResponse,
    "StubMappings": StubMappings,
    "StubMappingsMappings": StubMappingsMappings,
    "StubMappingsMeta": StubMappingsMeta,
};
class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
exports.HttpBasicAuth = HttpBasicAuth;
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
    }
    applyToRequest(requestOptions) {
        if (this.location == "query") {
            requestOptions.qs[this.paramName] = this.apiKey;
        }
        else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}
exports.ApiKeyAuth = ApiKeyAuth;
class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
exports.OAuth = OAuth;
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(_) {
    }
}
exports.VoidAuth = VoidAuth;
var DefaultApiApiKeys;
(function (DefaultApiApiKeys) {
})(DefaultApiApiKeys = exports.DefaultApiApiKeys || (exports.DefaultApiApiKeys = {}));
class DefaultApi {
    constructor(basePathOrUsername, password, basePath) {
        this._basePath = defaultBasePath;
        this.defaultHeaders = {};
        this._useQuerystring = false;
        this.authentications = {
            'default': new VoidAuth(),
        };
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        }
        else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername;
            }
        }
    }
    set useQuerystring(value) {
        this._useQuerystring = value;
    }
    set basePath(basePath) {
        this._basePath = basePath;
    }
    get basePath() {
        return this._basePath;
    }
    setDefaultAuthentication(auth) {
        this.authentications.default = auth;
    }
    setApiKey(key, value) {
        this.authentications[DefaultApiApiKeys[key]].apiKey = value;
    }
    mappingsDelete() {
        const localVarPath = this.basePath + '/mappings';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsFindByMetadataPost(body) {
        const localVarPath = this.basePath + '/mappings/find-by-metadata';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling mappingsFindByMetadataPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "ContentPattern")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsGet(limit, offset) {
        const localVarPath = this.basePath + '/mappings';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (limit !== undefined) {
            localVarQueryParameters['limit'] = ObjectSerializer.serialize(limit, "number");
        }
        if (offset !== undefined) {
            localVarQueryParameters['offset'] = ObjectSerializer.serialize(offset, "number");
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMappings");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsPost(body) {
        const localVarPath = this.basePath + '/mappings';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling mappingsPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "StubMapping")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMapping");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsRemoveByMetadataPost(body) {
        const localVarPath = this.basePath + '/mappings/remove-by-metadata';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling mappingsRemoveByMetadataPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "ContentPattern")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsResetPost() {
        const localVarPath = this.basePath + '/mappings/reset';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsSavePost() {
        const localVarPath = this.basePath + '/mappings/save';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsStubMappingIdDelete(stubMappingId) {
        const localVarPath = this.basePath + '/mappings/{stubMappingId}'
            .replace('{' + 'stubMappingId' + '}', encodeURIComponent(String(stubMappingId)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (stubMappingId === null || stubMappingId === undefined) {
            throw new Error('Required parameter stubMappingId was null or undefined when calling mappingsStubMappingIdDelete.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsStubMappingIdGet(stubMappingId) {
        const localVarPath = this.basePath + '/mappings/{stubMappingId}'
            .replace('{' + 'stubMappingId' + '}', encodeURIComponent(String(stubMappingId)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (stubMappingId === null || stubMappingId === undefined) {
            throw new Error('Required parameter stubMappingId was null or undefined when calling mappingsStubMappingIdGet.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMapping");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    mappingsStubMappingIdPut(stubMappingId, body) {
        const localVarPath = this.basePath + '/mappings/{stubMappingId}'
            .replace('{' + 'stubMappingId' + '}', encodeURIComponent(String(stubMappingId)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (stubMappingId === null || stubMappingId === undefined) {
            throw new Error('Required parameter stubMappingId was null or undefined when calling mappingsStubMappingIdPut.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling mappingsStubMappingIdPut.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "StubMapping")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMapping");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    nearMissesRequestPatternPost(body) {
        const localVarPath = this.basePath + '/near-misses/request-pattern';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling nearMissesRequestPatternPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "RequestPattern")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    nearMissesRequestPost(body) {
        const localVarPath = this.basePath + '/near-misses/request';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling nearMissesRequestPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "LoggedRequest")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    recordingsSnapshotPost(body) {
        const localVarPath = this.basePath + '/recordings/snapshot';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling recordingsSnapshotPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "Snapshot")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMappings");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    recordingsStartPost(body) {
        const localVarPath = this.basePath + '/recordings/start';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling recordingsStartPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "StartRecording")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    recordingsStatusGet() {
        const localVarPath = this.basePath + '/recordings/status';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    recordingsStopPost() {
        const localVarPath = this.basePath + '/recordings/stop';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "StubMappings");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsCountPost(body) {
        const localVarPath = this.basePath + '/requests/count';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling requestsCountPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "RequestPattern")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsDelete() {
        const localVarPath = this.basePath + '/requests';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsFindPost(body) {
        const localVarPath = this.basePath + '/requests/find';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling requestsFindPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "RequestPattern")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsGet(limit, since) {
        const localVarPath = this.basePath + '/requests';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (limit !== undefined) {
            localVarQueryParameters['limit'] = ObjectSerializer.serialize(limit, "string");
        }
        if (since !== undefined) {
            localVarQueryParameters['since'] = ObjectSerializer.serialize(since, "string");
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsRequestIdGet(requestId) {
        const localVarPath = this.basePath + '/requests/{requestId}'
            .replace('{' + 'requestId' + '}', encodeURIComponent(String(requestId)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (requestId === null || requestId === undefined) {
            throw new Error('Required parameter requestId was null or undefined when calling requestsRequestIdGet.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsResetPost() {
        const localVarPath = this.basePath + '/requests/reset';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsUnmatchedGet() {
        const localVarPath = this.basePath + '/requests/unmatched';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    requestsUnmatchedNearMissesGet() {
        const localVarPath = this.basePath + '/requests/unmatched/near-misses';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    resetPost() {
        const localVarPath = this.basePath + '/reset';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    scenariosGet() {
        const localVarPath = this.basePath + '/scenarios';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    body = ObjectSerializer.deserialize(body, "Scenarios");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    scenariosResetPost() {
        const localVarPath = this.basePath + '/scenarios/reset';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    settingsPost(body) {
        const localVarPath = this.basePath + '/settings';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling settingsPost.');
        }
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(body, "GlobalSettings")
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    shutdownPost() {
        const localVarPath = this.basePath + '/shutdown';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        this.authentications.default.applyToRequest(localVarRequestOptions);
        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                localVarRequestOptions.formData = localVarFormParams;
            }
            else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    }
                    else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
}
exports.DefaultApi = DefaultApi;
//# sourceMappingURL=api.js.map