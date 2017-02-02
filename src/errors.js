// @flow

import ExtendableError from 'es6-error';
import type {
  SguidPayloadType
} from './types';

export class SguidError extends ExtendableError {}

export class InvalidSguidError extends SguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string) {
    super('The input SGUID cannot be decrypted.');
  }
}

export class UnexpectedNamespaceValueError extends InvalidSguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string, expectedNamespace: string, expectedResourceTypeName: string, payload: SguidPayloadType) {
    super(sguid);

    this.message = 'Decrypted SGUID namespace does not match the expected namespace.';
  }
}

export class UnexpectedResourceTypeNameValueError extends InvalidSguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string, expectedNamespace: string, expectedResourceTypeName: string, payload: SguidPayloadType) {
    super(sguid);

    this.message = 'Decrypted SGUID resource type name does not match the expected resource type name.';
  }
}
