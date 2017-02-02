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
import type {
  ToSguidType
} from './types';

/**
 * @param secretKey {@see https://github.com/gajus/sguid#generating-secret-key}
 * @param namespace A namespace of the GUID (e.g. company name or the application name).
 * @param type A resource type name (e.g. article).
 * @param id Resource identifier.
 */
const toSguid: ToSguidType = (base64SecretKey, namespace, type, id) => {
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
