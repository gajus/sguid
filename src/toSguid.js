// @flow

import nacl from 'tweetnacl';
// eslint-disable-next-line import/no-namespace
import * as base64 from '@stablelib/base64';
// eslint-disable-next-line import/no-namespace
import * as utf8 from '@stablelib/utf8';
import {
  SguidError
} from './errors';
import type {
  ToSguidType
} from './types';

/**
 * @param base64SecretKey {@see https://github.com/gajus/sguid#generating-key-pair}
 * @param namespace A namespace of the GUID (e.g. company name or the application name).
 * @param type A resource type name (e.g. article).
 * @param id Resource identifier.
 */
const toSguid: ToSguidType = (base64SecretKey, namespace, type, id) => {
  if (!namespace) {
    throw new SguidError('Namespace values cannot be falsy.');
  }

  if (!type) {
    throw new SguidError('Resource type name values cannot be falsy.');
  }

  if (!id) {
    throw new SguidError('Resource identifier values cannot be falsy.');
  }

  const payload = JSON.stringify({
    id,
    namespace,
    type
  });

  const secretKey = base64.decodeURLSafe(base64SecretKey);
  const message = utf8.encode(payload);

  return base64.encodeURLSafe(nacl.sign(message, secretKey));
};

export default toSguid;
