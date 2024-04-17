#!/usr/bin/env node

import { createWriteStream } from 'node:fs';
import { getOptions, getStream } from './io';
import process from '.';

(async function wc() {
  const options = getOptions();
  const stream = getStream(options)
  const chunks = []

  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const processed = await process(chunks.join(''), new Date());
  const writeStream = createWriteStream(options.outfile);

  writeStream.write(processed);
})();