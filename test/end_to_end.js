// @flow

import test from 'ava';
import {
  SguidError,
  toSguid,
  fromSguid
} from '../src';

const base64PublicKey = '__DHQhQQp5YkGm-0BhsIl6NjKRafm1r9tVAwRg0goXA=';
const base64SecretKey = 'oIVMBI1BjjX8WqruA1Tp91Yg6vhPdvoFJKWRDRpBKab_8MdCFBCnliQab7QGGwiXo2MpFp-bWv21UDBGDSChcA==';
const namespace = 'foo';
const type = 'bar';
const id = 1;

test('toSguid back to fromSguid', (t): void => {
  const hashed = toSguid(base64SecretKey, namespace, type, id);
  const decrypted = fromSguid(base64PublicKey, namespace, type, hashed);
  t.deepEqual(decrypted, {
    id: 1,
    namespace: 'foo',
    type: 'bar'
  });
})
