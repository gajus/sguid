#!/usr/bin/env node

import yargs from 'yargs';
import nacl from 'tweetnacl';
// eslint-disable-next-line import/no-namespace
import * as base64 from '@stablelib/base64';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'new-key-pair',
    desc: 'Generates new random key pair for signing. Returns base64 encoded secret key and public key.',
    handler: () => {
      const keyPair = nacl.sign.keyPair();

      // eslint-disable-next-line no-console
      console.log('secret key:', base64.encodeURLSafe(keyPair.secretKey));

      // eslint-disable-next-line no-console
      console.log('public key:', base64.encodeURLSafe(keyPair.publicKey));
    }
  })
  .demandCommand(1)
  .argv;
