import localVarRequest = require('request');
import http = require('http');
import Promise = require('bluebird');
export declare class ContentPattern {
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class GlobalSettings {
    'delayDistribution'?: any;
    'fixedDelay'?: number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class LoggedRequest {
    'absoluteUrl'?: string;
    'body'?: string;
    'cookies'?: any;
    'headers'?: any;
    'method'?: string;
    'url'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class RequestPattern {
    'basicAuthCredentials'?: RequestPatternBasicAuthCredentials;
    'bodyPatterns'?: Array<any>;
    'cookies'?: any;
    'headers'?: any;
    'method'?: string;
    '_queryParameters'?: any;
    'url'?: string;
    'urlPath'?: string;
    'urlPathPattern'?: string;
    'urlPattern'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class RequestPatternBasicAuthCredentials {
    'password': string;
    'username': string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class Scenarios {
    'scenarios'?: Array<ScenariosScenarios>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class ScenariosScenarios {
    'id'?: string;
    'name'?: string;
    'possibleStates'?: Array<string>;
    'state'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class Snapshot {
    'filters'?: any;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StartRecording {
    'filters'?: StartRecordingFilters;
    'targetBaseUrl'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StartRecordingFilters {
    'basicAuthCredentials'?: RequestPatternBasicAuthCredentials;
    'bodyPatterns'?: Array<any>;
    'cookies'?: any;
    'headers'?: any;
    'method'?: string;
    '_queryParameters'?: any;
    'url'?: string;
    'urlPath'?: string;
    'urlPathPattern'?: string;
    'urlPattern'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StubMapping {
    'id'?: string;
    'metadata'?: any;
    'newScenarioState'?: string;
    'persistent'?: boolean;
    'postServeActions'?: any;
    'priority'?: number;
    'request'?: StubMappingRequest;
    'requiredScenarioState'?: string;
    'response'?: StubMappingResponse;
    'scenarioName'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StubMappingRequest {
    'basicAuthCredentials'?: RequestPatternBasicAuthCredentials;
    'bodyPatterns'?: Array<any>;
    'cookies'?: any;
    'headers'?: any;
    'method'?: string;
    '_queryParameters'?: any;
    'url'?: string;
    'urlPath'?: string;
    'urlPathPattern'?: string;
    'urlPattern'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StubMappingResponse {
    'additionalProxyRequestHeaders'?: any;
    'base64Body'?: string;
    'body'?: string;
    'bodyFileName'?: string;
    'delayDistribution'?: any;
    'fault'?: StubMappingResponse.FaultEnum;
    'fixedDelayMilliseconds'?: number;
    'fromConfiguredStub'?: boolean;
    'headers'?: any;
    'jsonBody'?: any;
    'proxyBaseUrl'?: string;
    'status'?: number;
    'statusMessage'?: string;
    'transformerParameters'?: any;
    'transformers'?: Array<string>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare namespace StubMappingResponse {
    enum FaultEnum {
        CONNECTIONRESETBYPEER,
        EMPTYRESPONSE,
        MALFORMEDRESPONSECHUNK,
        RANDOMDATATHENCLOSE
    }
}
export declare class StubMappings {
    'mappings'?: StubMappingsMappings;
    'meta'?: StubMappingsMeta;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StubMappingsMappings {
    'id'?: string;
    'metadata'?: any;
    'newScenarioState'?: string;
    'persistent'?: boolean;
    'postServeActions'?: any;
    'priority'?: number;
    'request'?: StubMappingRequest;
    'requiredScenarioState'?: string;
    'response'?: StubMappingResponse;
    'scenarioName'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare class StubMappingsMeta {
    'total': number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export interface Authentication {
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(_: localVarRequest.Options): void;
}
export declare enum DefaultApiApiKeys {
}
export declare class DefaultApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected authentications: {
        'default': Authentication;
    };
    constructor(basePath?: string);
    useQuerystring: boolean;
    basePath: string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: DefaultApiApiKeys, value: string): void;
    mappingsDelete(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsFindByMetadataPost(body: ContentPattern): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsGet(limit?: number, offset?: number): Promise<{
        response: http.ClientResponse;
        body: StubMappings;
    }>;
    mappingsPost(body: StubMapping): Promise<{
        response: http.ClientResponse;
        body: StubMapping;
    }>;
    mappingsRemoveByMetadataPost(body: ContentPattern): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsResetPost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsSavePost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsStubMappingIdDelete(stubMappingId: string): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    mappingsStubMappingIdGet(stubMappingId: string): Promise<{
        response: http.ClientResponse;
        body: StubMapping;
    }>;
    mappingsStubMappingIdPut(stubMappingId: string, body: StubMapping): Promise<{
        response: http.ClientResponse;
        body: StubMapping;
    }>;
    nearMissesRequestPatternPost(body: RequestPattern): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    nearMissesRequestPost(body: LoggedRequest): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    recordingsSnapshotPost(body: Snapshot): Promise<{
        response: http.ClientResponse;
        body: StubMappings;
    }>;
    recordingsStartPost(body: StartRecording): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    recordingsStatusGet(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    recordingsStopPost(): Promise<{
        response: http.ClientResponse;
        body: StubMappings;
    }>;
    requestsCountPost(body: RequestPattern): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsDelete(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsFindPost(body: RequestPattern): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsGet(limit?: string, since?: string): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsRequestIdGet(requestId: string): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsResetPost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsUnmatchedGet(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    requestsUnmatchedNearMissesGet(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    resetPost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    scenariosGet(): Promise<{
        response: http.ClientResponse;
        body: Scenarios;
    }>;
    scenariosResetPost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    settingsPost(body: GlobalSettings): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
    shutdownPost(): Promise<{
        response: http.ClientResponse;
        body?: any;
    }>;
}
//# sourceMappingURL=api.d.ts.map