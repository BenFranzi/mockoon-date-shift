#!/usr/bin/env node

import { createWriteStream } from 'node:fs';
import {getOptions, getStream, terminateWithError} from './io';
import {BadRequestException} from './utils';
import convertDates from '.';

(async function wc() {
  try {
    const options = getOptions();
    const stream = getStream(options)
    const chunks = []

    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const processed = await convertDates(options, chunks.join(''));
    const writeStream = createWriteStream(options.outfile);

    writeStream.write(processed);
  } catch (error) {
    if (error instanceof BadRequestException) {
      terminateWithError(error.message);
    }

    throw error;
  }
})();