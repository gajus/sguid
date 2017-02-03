// @flow

import test from 'ava';
import {
  SguidError,
  toSguid
} from '../src';

const secretKey = '6h2K+JuGfWTrs5Lxt+mJw9y5q+mXKCjiJgngIDWDFy23TWmjpfCnUBdO1fDzi6MxHMO2nTPazsnTcC2wuQrxVQ==';

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

  t.true(sguidId === 'xT9-z0JflGBb-RI0YBw8LCLLDLj2bvhfxMBbqWj2YUgastzMi4s1T49-cyvpuQ35QUWIxUdOtfp1lWVlf4RjAnsiaWQiOjEsIm5hbWVzcGFjZSI6ImJhciIsInR5cGUiOiJiYXoifQ');
});
