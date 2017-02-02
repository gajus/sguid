#!/usr/bin/env node

import yargs from 'yargs';
import nacl from 'tweetnacl';
import {
  encodeBase64
} from 'tweetnacl-util';

// eslint-disable-next-line no-unused-expressions
yargs
  .command({
    command: 'new-key-pair',
    desc: 'Generates new random key pair for signing. Returns base64 encoded secret key and public key.',
    handler: () => {
      const keyPair = nacl.sign.keyPair();

      // eslint-disable-next-line no-console
      console.log('secret key:', encodeBase64(keyPair.secretKey));

      // eslint-disable-next-line no-console
      console.log('public key:', encodeBase64(keyPair.publicKey));
    }
  })
  .demandCommand(1)
  .argv;
