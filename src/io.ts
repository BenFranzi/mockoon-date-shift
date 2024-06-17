import { access } from 'node:fs/promises';
import { constants, ReadStream } from 'fs';
import { createReadStream } from 'node:fs';
import minimist from 'minimist';
import {BadRequestException} from './utils';

export function getStream(options: Options): ReadStream | NodeJS.ReadStream {
  if (!options.file && !process.stdin.isTTY) return process.stdin;

  if (!options.file || !exists(options.file)) {
    terminateWithError(`file ${options.file} is not valid`);
  }

  return createReadStream(options.file);
}
export function getOptions(): Options {
  const argv = minimist(process.argv.slice(2));


  const comparisonDate = !argv.date
    ? new Date()
    : new Date(argv.date);


  if (argv._.length >= 2) {
    throw new BadRequestException(`Only supports a single file, received [${argv._.join(', ')}]`);
  } else if (!argv._) {
    throw new BadRequestException('requires file as last argument.');
  }


  const [file] = argv._;

  const outfile = !file ? './output.json' : file;

  return {
    file,
    outfile,
    comparisonDate,
  };
}

async function exists(file: string): Promise<boolean> {
  return access(file, constants.R_OK)
    .then(() => true)
    .catch(() => false)
}

const helpMessage = '\nUsage:\nmockoon-date-shift <file>\nmockoon-date-shift --date=YYYY-MM-DD <file>'

export function terminateWithError(message: string): void {
  console.error(message);
  console.log(helpMessage);
  process.exit(1);
}