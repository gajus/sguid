# SGUID

[![Travis build status](http://img.shields.io/travis/gajus/sguid/master.svg?style=flat-square)](https://travis-ci.org/gajus/sguid)
[![Coveralls](https://img.shields.io/coveralls/gajus/sguid.svg?style=flat-square)](https://coveralls.io/github/gajus/sguid)
[![NPM version](http://img.shields.io/npm/v/sguid.svg?style=flat-square)](https://www.npmjs.org/package/sguid)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Signed Globally Unique Identifier (SGUID) generator.

* [Implementation](#implementation)
* [Use case](#use-case)
* [API](#api)
* [Usage](#Usage)
* [Generating key pair](#generating-key-pair)

## Implementation

* SGUID uses [Ed25519 public-key signature system](https://github.com/dchest/tweetnacl-js/blob/master/README.md#signatures).
* The resulting signature is encoded using URL-safe base64 encoding.

## Use case

SGUID is used to mitigate certain types of DDoS attacks.

## API

```js
type SguidPayloadType = {|
  id: number | string,
  namespace: string,
  type: string
|};

/**
* @throws InvalidSguidError Throws if signed message cannot be opened.
* @throws UnexpectedNamespaceValueError Throws if the namespace contained in the payload does not match the expected namespace.
* @throws UnexpectedResourceTypeNameValueError Throws if the resource type name contained in the payload does not match the expected resource type name.
*/
type FromSguidType = (publicKey: string, expectedNamespace: string, expectedResourceTypeName: string, sguid: string) => SguidPayloadType;

/**
 * @param secretKey {@see https://github.com/gajus/sguid#generating-secret-key}
 * @param namespace A namespace of the GUID (e.g. company name or the application name).
 * @param type A resource type name (e.g. article).
 * @param id Resource identifier.
 */
type ToSguidType = (secretKey: string, namespace: string, type: string, id: number | string) => string;

```

## Usage

```js
import {
  fromSguid,
  toSguid,
} from 'sguid';

const secretKey = '6h2K+JuGfWTrs5Lxt+mJw9y5q+mXKCjiJgngIDWDFy23TWmjpfCnUBdO1fDzi6MxHMO2nTPazsnTcC2wuQrxVQ==';
const publicKey = 't01po6Xwp1AXTtXw84ujMRzDtp0z2s7J03AtsLkK8VU=';
const namespace = 'gajus';
const resourceTypeName = 'article';
const resourceIdentifier = 1;

const sguid = toSguid(secretKey, namespace, resourceTypeName, resourceIdentifier);

// "pbp3h9nTr0wPboKaWrg_Q77KnZW1-rBkwzzYJ0Px9Qvbq0KQvcfuR2uCRCtijQYsX98g1F50k50x5YKiCgnPAnsiaWQiOjEsIm5hbWVzcGFjZSI6ImdhanVzIiwidHlwZSI6ImFydGljbGUifQ"

const payload = fromSguid(publicKey, namespace, resourceTypeName, sguid);

// {
//   "id": 1,
//   "namespace": "gajus",
//   "type": "article"
// }

```


## Handling errors

`fromSguid` method can throw the following errors.

|Error constructor name|Description|
|---|---|
|`InvalidSguidError`|Throws if signed message cannot be opened.|
|`UnexpectedNamespaceValueError`|Throws if the namespace contained in the payload does not match the expected namespace.|
|`UnexpectedResourceTypeNameValueError`|Throws if the resource type name contained in the payload does not match the expected resource type name.|

Error constructors can be imported from `sguid` package.

`UnexpectedNamespaceValueError` and `UnexpectedResourceTypeNameValueError` extend from `InvalidSguidError`. It is enough to check if an error object is an instance of `InvalidSguidError` to assert that an error is a result of an invalid SGUID.

```js
import {
  fromSguid,
  InvalidSguidError
} from 'sguid';

try {
  fromSguid(initializationVectorValue, namespace, resourceTypeName, sguid);
} catch (error) {
  if (error instanceof InvalidSguidError) {
    // Handle error.
  }

  // Re-throw other errors.
  throw error;
}

```

## Generating key pair

Sguid provides a CLI utility `sguid new-key-pair` to generate a key pair

```bash
$ npm install sguid -g
$ sguid new-key-pair
```

If you need to generate the key pair programmatically, use [`nacl.sign.keyPair()`](https://github.com/dchest/tweetnacl-js/blob/master/README.md#naclsignkeypair).
