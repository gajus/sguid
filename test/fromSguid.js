// @flow

import test from 'ava';
import {
  fromSguid,
  InvalidSguidError,
  UnexpectedNamespaceValueError,
  UnexpectedResourceTypeNameValueError
} from '../src';

const publicKey = 't01po6Xwp1AXTtXw84ujMRzDtp0z2s7J03AtsLkK8VU=';
const sguidIdentifier = 'xT9-z0JflGBb-RI0YBw8LCLLDLj2bvhfxMBbqWj2YUgastzMi4s1T49-cyvpuQ35QUWIxUdOtfp1lWVlf4RjAnsiaWQiOjEsIm5hbWVzcGFjZSI6ImJhciIsInR5cGUiOiJiYXoifQ';

test('verifies the signed messaged and returns the payload', (t): void => {
  const id = fromSguid(publicKey, 'bar', 'baz', sguidIdentifier);

  t.deepEqual(id, {
    id: 1,
    namespace: 'bar',
    type: 'baz'
  });
});

test('throws an error if the decoded namespace does not match the expected namespace', (t): void => {
  // $FlowFixMe
  const error = t.throws(() => {
    fromSguid(publicKey, 'qux', 'baz', sguidIdentifier);
  }, UnexpectedNamespaceValueError);

  t.true(error.message === 'Decrypted SGUID namespace does not match the expected namespace.');
});

test('throws an error if the decoded resource type name does not match the expected resource type name', (t): void => {
  // $FlowFixMe
  const error = t.throws(() => {
    fromSguid(publicKey, 'bar', 'qux', sguidIdentifier);
  }, UnexpectedResourceTypeNameValueError);

  t.true(error.message === 'Decrypted SGUID resource type name does not match the expected resource type name.');
});

test('throws InvalidSguidError if signed message cannot be opened', (t): void => {
  // $FlowFixMe
  const error = t.throws(() => {
    fromSguid(publicKey, 'bar', 'baz', 'qux');
  }, InvalidSguidError);

  t.true(error.message === 'The input SGUID cannot be decrypted.');
});
