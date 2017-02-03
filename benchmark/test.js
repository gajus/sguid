/* eslint-disable import/no-commonjs, class-methods-use-this */

const os = require('os');
const Benchmark = require('benchmark');
const sguid = require('../dist/index');

const minSamples = 1000;

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV !== 'production') {
  throw new Error('Unexpected NODE_ENV.');
}

/**
 * @see https://github.com/petkaantonov/bluebird/blob/4ec337233c1fa7bb4eb90473222014f16d074e58/benchmark/performance.js#L11
 */
const printPlatform = () => {
  const v8 = process.versions.v8;
  const node = process.versions.node;

  // eslint-disable-next-line no-process-env
  const plat = os.type() + ' ' + os.release() + ' ' + os.arch() + '\nNode.JS ' + node + '\nV8 ' + v8 + '\nNODE_ENV=' + process.env.NODE_ENV;

  let cpus = os.cpus()
    .map((cpu) => {
      return cpu.model;
    })
    .reduce((o, model) => {
      if (!o[model]) {
        o[model] = 0;
      }

      o[model]++;

      return o;
    }, {});

  cpus = Object
    .keys(cpus)
    .map((key) => {
      return key + ' \u00d7 ' + cpus[key];
    })
    .join('\n');

  // eslint-disable-next-line no-console
  console.log('\nPlatform info:\n' + plat + '\n' + cpus + '\n');
};

const suite = new Benchmark.Suite();

suite.add('toSguid', () => {
  const secretKey = '6h2K+JuGfWTrs5Lxt+mJw9y5q+mXKCjiJgngIDWDFy23TWmjpfCnUBdO1fDzi6MxHMO2nTPazsnTcC2wuQrxVQ==';

  sguid.toSguid(secretKey, 'bar', 'baz', 1);
}, {
  minSamples
});

suite.add('fromSguid', () => {
  const publicKey = 't01po6Xwp1AXTtXw84ujMRzDtp0z2s7J03AtsLkK8VU=';
  const sguidIdentifier = 'xT9-z0JflGBb-RI0YBw8LCLLDLj2bvhfxMBbqWj2YUgastzMi4s1T49-cyvpuQ35QUWIxUdOtfp1lWVlf4RjAnsiaWQiOjEsIm5hbWVzcGFjZSI6ImJhciIsInR5cGUiOiJiYXoifQ';

  sguid.fromSguid(publicKey, 'bar', 'baz', sguidIdentifier);
}, {
  minSamples
});

const results = [];

suite
  .on('error', (error) => {
    // eslint-disable-next-line no-console
    console.log('error', error);

    throw new Error('An unexpected error has occurred.');
  })
  .on('cycle', (event) => {
    results.push(event.target);
  })
  .on('complete', () => {
    const table = [];

    table.push('|Name|Operations per second (relative margin of error)|Sample size|Difference from the base benchmark|');
    table.push('|---|---|---|---|');

    let base;

    for (const benchmark of results) {
      if (!base) {
        base = benchmark;
      }

      table.push('|' + benchmark.name + '|' + Math.floor(benchmark.hz) + ' (±' + benchmark.stats.rme.toFixed(2) + '%)|' + benchmark.count + '|-' + Math.floor(((base.hz - benchmark.hz) / benchmark.hz) * 100) + '%|');
    }

    // eslint-disable-next-line no-console
    console.log(table.join('\n'));

    printPlatform();
  });

suite.run();
