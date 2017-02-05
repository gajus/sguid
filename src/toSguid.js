// @flow

import nacl from 'tweetnacl';
import {
  decodeBase64,
  decodeUTF8,
  encodeBase64
} from 'tweetnacl-util';
import {
  escape as urlEscape
} from 'base64-url';
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

  const secretKey = decodeBase64(base64SecretKey);
  const message = decodeUTF8(payload);

  return urlEscape(encodeBase64(nacl.sign(message, secretKey)));
};

export default toSguid;
