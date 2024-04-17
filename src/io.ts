import { access } from 'node:fs/promises';
import { constants, ReadStream } from 'fs';
import { createReadStream } from 'node:fs';

export function getStream(options: Options): ReadStream | NodeJS.ReadStream {
  if (!options.file && !process.stdin.isTTY) return process.stdin;

  if (!options.file || !exists(options.file)) {
    terminateWithError(`file ${options.file} is not valid`);
  }

  return createReadStream(options.file);
}

export function getOptions(): Options {

  const file = process.argv.length > 2
        ? process.argv.at(-1)!
        : undefined;

  const outfile = !file ? './output.json' : file;

  return { file, outfile };
}

async function exists(file: string): Promise<boolean> {
  return access(file, constants.R_OK)
    .then(() => true)
    .catch(() => false)
}

function terminateWithError(message: string): void {
  console.error(message);
  process.exit(1);
}