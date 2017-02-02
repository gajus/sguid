// @flow

import test from 'ava';
import {
  toSguid
} from '../src';

const secretKey = '6h2K+JuGfWTrs5Lxt+mJw9y5q+mXKCjiJgngIDWDFy23TWmjpfCnUBdO1fDzi6MxHMO2nTPazsnTcC2wuQrxVQ==';

test('signs message', (t): void => {
  const sguidId = toSguid(secretKey, 'bar', 'baz', 1);

  t.true(sguidId === 'xT9-z0JflGBb-RI0YBw8LCLLDLj2bvhfxMBbqWj2YUgastzMi4s1T49-cyvpuQ35QUWIxUdOtfp1lWVlf4RjAnsiaWQiOjEsIm5hbWVzcGFjZSI6ImJhciIsInR5cGUiOiJiYXoifQ');
});
