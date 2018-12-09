// @flow

import ExtendableError from 'es6-error';
import type {
  SguidPayloadType
} from './types';

// eslint-disable-next-line fp/no-class
export class SguidError extends ExtendableError {}

// eslint-disable-next-line fp/no-class
export class InvalidSguidError extends SguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string) {
    super('The input SGUID cannot be decrypted.');
  }
}

// eslint-disable-next-line fp/no-class
export class UnexpectedNamespaceValueError extends InvalidSguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string, expectedNamespace: string, expectedResourceTypeName: string, payload: SguidPayloadType) {
    super(sguid);

    // eslint-disable-next-line fp/no-this
    this.message = 'Decrypted SGUID namespace does not match the expected namespace.';
  }
}

// eslint-disable-next-line fp/no-class
export class UnexpectedResourceTypeNameValueError extends InvalidSguidError {
  // eslint-disable-next-line no-unused-vars
  constructor (sguid: string, expectedNamespace: string, expectedResourceTypeName: string, payload: SguidPayloadType) {
    super(sguid);

    // eslint-disable-next-line fp/no-this
    this.message = 'Decrypted SGUID resource type name does not match the expected resource type name.';
  }
}
