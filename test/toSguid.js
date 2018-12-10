// @flow

import test from 'ava';
import {
  SguidError,
  toSguid
} from '../src';

const secretKey = 'oIVMBI1BjjX8WqruA1Tp91Yg6vhPdvoFJKWRDRpBKab_8MdCFBCnliQab7QGGwiXo2MpFp-bWv21UDBGDSChcA==';

test('throws error if the namespace value is (coerced) false ', (t): void => {
  t.throws(() => {
    toSguid(secretKey, '', 'baz', 1);
  }, SguidError);
});

test('throws error if the resource type name value is (coerced) false ', (t): void => {
  t.throws(() => {
    toSguid(secretKey, 'bar', '', 1);
  }, SguidError);
});

test('throws error if the resource identifier value is (coerced) false ', (t): void => {
  t.throws(() => {
    toSguid(secretKey, 'bar', 'baz', '');
  }, SguidError);
});

test('signs message', (t): void => {
  const sguidId = toSguid(secretKey, 'bar', 'baz', 1);

  t.true(sguidId === '0SQhAtmF290br2krvAlBoU4nCxcLlKy1E1Iokxy4MhfvSzb6BTacC2azJFubF9nHoRMOFg9mlhVQclypSbl8DnsiaWQiOjEsIm5hbWVzcGFjZSI6ImJhciIsInR5cGUiOiJiYXoifQ==');
});
