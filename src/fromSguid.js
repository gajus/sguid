// @flow

import nacl from 'tweetnacl';
import {
  decodeBase64,
  encodeUTF8
} from 'tweetnacl-util';
import {
  unescape as urlUnescape
} from 'base64-url';
import {
  InvalidSguidError,
  UnexpectedNamespaceValueError,
  UnexpectedResourceTypeNameValueError
} from './errors';
import type {
  FromSguidType
} from './types';

/**
 * @throws InvalidSguidError Throws if signed message cannot be opened.
 * @throws UnexpectedNamespaceValueError Throws if the namespace contained in the payload does not match the expected namespace.
 * @throws UnexpectedResourceTypeNameValueError Throws if the resource type name contained in the payload does not match the expected resource type name.
 */
const fromSguid: FromSguidType = (base64PublicKey, expectedNamespace, expectedResourceTypeName, sguid) => {
  let payload;

  try {
    payload = nacl.sign.open(decodeBase64(sguid), decodeBase64(urlUnescape(base64PublicKey)));

    if (payload !== null) {
      payload = JSON.parse(encodeUTF8(payload));
    }
  } catch (error) {
    throw new InvalidSguidError(sguid);
  }

  if (payload === null) {
    throw new InvalidSguidError(sguid);
  }

  if (expectedNamespace !== payload.namespace) {
    throw new UnexpectedNamespaceValueError(sguid, expectedNamespace, expectedResourceTypeName, payload);
  }

  if (expectedResourceTypeName !== payload.type) {
    throw new UnexpectedResourceTypeNameValueError(sguid, expectedNamespace, expectedResourceTypeName, payload);
  }

  return {
    id: payload.id,
    namespace: payload.namespace,
    type: payload.type
  };
};

export default fromSguid;
