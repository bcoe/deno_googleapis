// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * API Discovery Service Client for Deno
 * =====================================
 *
 * Provides information about other Google APIs, such as what APIs are available, the resource, and method details for each API.
 *
 * Docs: https://developers.google.com/discovery/
 * Source: http://localhost:8000/v1/discovery:v1.ts
 */

import { Anonymous, Auth, ServiceAccount } from "../auth/mod.ts";
export { Anonymous, ServiceAccount };

/**
 * Provides information about other Google APIs, such as what APIs are
 * available, the resource, and method details for each API.
 */
export class Discovery {
  #auth: Auth;
  #baseUrl: string;

  constructor(
    auth: Auth = new Anonymous(),
    baseUrl: string = "https://www.googleapis.com/discovery/v1/",
  ) {
    this.#auth = auth;
    this.#baseUrl = baseUrl;
  }

  /**
   * Retrieve the description of a particular version of an api.
   *
   * @param api The name of the API.
   * @param version The version of the API.
   */
  async apisGetRest(api: string, version: string): Promise<RestDescription> {
    const url = new URL(`${this.#baseUrl}apis/${api}/${version}/rest`);
    const data = await this.#auth.request(url.href, {
      method: "GET",
    });
    return data as any;
  }

  /**
   * Retrieve the list of APIs supported at this endpoint.
   */
  async apisList(opts: ApisListOptions = {}): Promise<DirectoryList> {
    const url = new URL(`${this.#baseUrl}apis`);
    if (opts.name !== undefined) {
      url.searchParams.append("name", String(opts.name));
    }
    if (opts.preferred !== undefined) {
      url.searchParams.append("preferred", String(opts.preferred));
    }
    const data = await this.#auth.request(url.href, {
      method: "GET",
    });
    return data as any;
  }
}

/**
 * Additional options for Discovery#apisList.
 */
export interface ApisListOptions {
  /**
   * Only include APIs with the given name.
   */
  name?: string;
  /**
   * Return only the preferred version of an API.
   */
  preferred?: boolean;
}

export interface DirectoryList {
  /**
   * Indicate the version of the Discovery API used to generate this doc.
   */
  discoveryVersion?: string;
  /**
   * The individual directory entries. One entry per api/version pair.
   */
  items?: {
    description?: string;
    discoveryLink?: string;
    discoveryRestUrl?: string;
    documentationLink?: string;
    icons?: {
      x16?: string;
      x32?: string;
    };
    id?: string;
    kind?: string;
    labels?: string[];
    name?: string;
    preferred?: boolean;
    title?: string;
    version?: string;
  }[];
  /**
   * The kind for this response.
   */
  kind?: string;
}

export interface JsonSchema {
  /**
   * A reference to another schema. The value of this property is the "id" of
   * another schema.
   */
  $ref?: string;
  /**
   * If this is a schema for an object, this property is the schema for any
   * additional properties with dynamic keys on this object.
   */
  additionalProperties?: JsonSchema;
  /**
   * Additional information about this property.
   */
  annotations?: {
    required?: string[];
  };
  /**
   * The default value of this property (if one exists).
   */
  default?: string;
  /**
   * A description of this object.
   */
  description?: string;
  /**
   * Values this parameter may take (if it is an enum).
   */
  enum?: string[];
  /**
   * The descriptions for the enums. Each position maps to the corresponding
   * value in the "enum" array.
   */
  enumDescriptions?: string[];
  /**
   * An additional regular expression or key that helps constrain the value.
   * For more details see:
   * http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.23
   */
  format?: string;
  /**
   * Unique identifier for this schema.
   */
  id?: string;
  /**
   * If this is a schema for an array, this property is the schema for each
   * element in the array.
   */
  items?: JsonSchema;
  /**
   * Whether this parameter goes in the query or the path for REST requests.
   */
  location?: string;
  /**
   * The maximum value of this parameter.
   */
  maximum?: string;
  /**
   * The minimum value of this parameter.
   */
  minimum?: string;
  /**
   * The regular expression this parameter must conform to. Uses Java 6 regex
   * format:
   * http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
   */
  pattern?: string;
  /**
   * If this is a schema for an object, list the schema for each property of
   * this object.
   */
  properties?: {
    [key: string]: JsonSchema;
  };
  /**
   * The value is read-only, generated by the service. The value cannot be
   * modified by the client. If the value is included in a POST, PUT, or PATCH
   * request, it is ignored by the service.
   */
  readOnly?: boolean;
  /**
   * Whether this parameter may appear multiple times.
   */
  repeated?: boolean;
  /**
   * Whether the parameter is required.
   */
  required?: boolean;
  /**
   * The value type for this schema. A list of values can be found here:
   * http://tools.ietf.org/html/draft-zyp-json-schema-03#section-5.1
   */
  type?: string;
  /**
   * In a variant data type, the value of one property is used to determine how
   * to interpret the entire entity. Its value must exist in a map of
   * descriminant values to schema names.
   */
  variant?: {
    discriminant?: string;
    map?: {
      $ref?: string;
      type_value?: string;
    }[];
  };
}

export interface RestDescription {
  /**
   * Authentication information.
   */
  auth?: {
    oauth2?: {
      scopes?: {
        [key: string]: {
          description?: string;
        };
      };
    };
  };
  /**
   * [DEPRECATED] The base path for REST requests.
   */
  basePath?: string;
  /**
   * [DEPRECATED] The base URL for REST requests.
   */
  baseUrl?: string;
  /**
   * The path for REST batch requests.
   */
  batchPath?: string;
  /**
   * Indicates how the API name should be capitalized and split into various
   * parts. Useful for generating pretty class names.
   */
  canonicalName?: string;
  /**
   * The description of this API.
   */
  description?: string;
  /**
   * Indicate the version of the Discovery API used to generate this doc.
   */
  discoveryVersion?: string;
  /**
   * A link to human readable documentation for the API.
   */
  documentationLink?: string;
  /**
   * The ETag for this response.
   */
  etag?: string;
  /**
   * Enable exponential backoff for suitable methods in the generated clients.
   */
  exponentialBackoffDefault?: boolean;
  /**
   * A list of supported features for this API.
   */
  features?: string[];
  /**
   * Links to 16x16 and 32x32 icons representing the API.
   */
  icons?: {
    x16?: string;
    x32?: string;
  };
  /**
   * The ID of this API.
   */
  id?: string;
  /**
   * The kind for this response.
   */
  kind?: string;
  /**
   * Labels for the status of this API, such as labs or deprecated.
   */
  labels?: string[];
  /**
   * API-level methods for this API.
   */
  methods?: {
    [key: string]: RestMethod;
  };
  /**
   * The name of this API.
   */
  name?: string;
  /**
   * The domain of the owner of this API. Together with the ownerName and a
   * packagePath values, this can be used to generate a library for this API
   * which would have a unique fully qualified name.
   */
  ownerDomain?: string;
  /**
   * The name of the owner of this API. See ownerDomain.
   */
  ownerName?: string;
  /**
   * The package of the owner of this API. See ownerDomain.
   */
  packagePath?: string;
  /**
   * Common parameters that apply across all apis.
   */
  parameters?: {
    [key: string]: JsonSchema;
  };
  /**
   * The protocol described by this document.
   */
  protocol?: string;
  /**
   * The resources in this API.
   */
  resources?: {
    [key: string]: RestResource;
  };
  /**
   * The version of this API.
   */
  revision?: string;
  /**
   * The root URL under which all API services live.
   */
  rootUrl?: string;
  /**
   * The schemas for this API.
   */
  schemas?: {
    [key: string]: JsonSchema;
  };
  /**
   * The base path for all REST requests.
   */
  servicePath?: string;
  /**
   * The title of this API.
   */
  title?: string;
  /**
   * The version of this API.
   */
  version?: string;
  version_module?: boolean;
}

export interface RestMethod {
  /**
   * Description of this method.
   */
  description?: string;
  /**
   * Whether this method requires an ETag to be specified. The ETag is sent as
   * an HTTP If-Match or If-None-Match header.
   */
  etagRequired?: boolean;
  /**
   * The URI path of this REST method in (RFC 6570) format without level 2
   * features ({+var}). Supplementary to the path property.
   */
  flatPath?: string;
  /**
   * HTTP method used by this method.
   */
  httpMethod?: string;
  /**
   * A unique ID for this method. This property can be used to match methods
   * between different versions of Discovery.
   */
  id?: string;
  /**
   * Media upload parameters.
   */
  mediaUpload?: {
    accept?: string[];
    maxSize?: string;
    protocols?: {
      resumable?: {
        multipart?: boolean;
        path?: string;
      };
      simple?: {
        multipart?: boolean;
        path?: string;
      };
    };
  };
  /**
   * Ordered list of required parameters, serves as a hint to clients on how to
   * structure their method signatures. The array is ordered such that the
   * "most-significant" parameter appears first.
   */
  parameterOrder?: string[];
  /**
   * Details for all parameters in this method.
   */
  parameters?: {
    [key: string]: JsonSchema;
  };
  /**
   * The URI path of this REST method. Should be used in conjunction with the
   * basePath property at the api-level.
   */
  path?: string;
  /**
   * The schema for the request.
   */
  request?: {
    $ref?: string;
    parameterName?: string;
  };
  /**
   * The schema for the response.
   */
  response?: {
    $ref?: string;
  };
  /**
   * OAuth 2.0 scopes applicable to this method.
   */
  scopes?: string[];
  /**
   * Whether this method supports media downloads.
   */
  supportsMediaDownload?: boolean;
  /**
   * Whether this method supports media uploads.
   */
  supportsMediaUpload?: boolean;
  /**
   * Whether this method supports subscriptions.
   */
  supportsSubscription?: boolean;
  /**
   * Indicates that downloads from this method should use the download service
   * URL (i.e. "/download"). Only applies if the method supports media download.
   */
  useMediaDownloadService?: boolean;
}

export interface RestResource {
  /**
   * Methods on this resource.
   */
  methods?: {
    [key: string]: RestMethod;
  };
  /**
   * Sub-resources on this resource.
   */
  resources?: {
    [key: string]: RestResource;
  };
}