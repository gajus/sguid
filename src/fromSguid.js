// @flow

import nacl from 'tweetnacl';
// eslint-disable-next-line import/no-namespace
import * as base64 from '@stablelib/base64';
// eslint-disable-next-line import/no-namespace
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
    payload = nacl.sign.open(base64.decodeURLSafe(sguid), base64.decodeURLSafe(base64PublicKey));

    if (payload !== null) {
      payload = JSON.parse(Buffer.from(payload).toString());
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
