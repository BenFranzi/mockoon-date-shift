import { intervalToDuration, isBefore } from 'date-fns';

function isValidDateString(raw) {
  const hasNotEnoughDashes = raw.split('').filter(char => char === '-').length < 2;
  const isInvalidDate = (new Date(raw)).toString() === 'Invalid Date';

  return !(isInvalidDate || hasNotEnoughDashes);
}

const captureTZ = /T(.*?)Z/;

function convert(options: Options, target) {
  const start = new Date(target);

  if (Math.abs(start.getFullYear() - (new Date()).getFullYear()) > 200) {
    return target;
  }

  const gap = intervalToDuration({start: options.comparisonDate, end: start});

  gap.years = gap.years || 0;
  gap.months = gap.months || 0;
  gap.days = gap.days || 0;

  if (target.split('').includes('Z')) {
    const tz = captureTZ.test(target) ? target.match(captureTZ).at(1) : '00:00:00';

    return `{{dateTimeShift date=now format={{DOUBLE_QUOTE}}yyyy-MM-dd'T'${tz}'Z{{DOUBLE_QUOTE}} years=${gap.years} months=${gap.months} days=${gap.days} hours=0 minutes=0 seconds=0}}`
  }

  return `{{dateTimeShift date=now format={{SINGLE_QUOTE}}yyyy-MM-dd{{SINGLE_QUOTE}} years=${gap.years} months=${gap.months} days=${gap.days} hours=0 minutes=0 seconds=0}}`
}

function traverse(options: Options, node) {
  if (Array.isArray(node)) {
    return node.map((item) => traverse(options, item));
  }
  if (typeof node === 'string' && Boolean(node) && isValidDateString(node)) {
    return convert(options, node);
  }
  if (node === null || node === undefined) {
    return node;
  }
  if (typeof node === 'object') {
    return Object.entries(node).reduce((acc, [key, value]) => ({...acc, [key]: traverse(options, value)}), {}); // TODO: Uplift this line
  }

  return node;
}


export default async function convertDates(options: Options, raw: string): Promise<string> {
  return JSON.stringify(traverse(options, JSON.parse(raw)), null, 2)
    .replaceAll('{{SINGLE_QUOTE}}', "'")
    .replaceAll('{{DOUBLE_QUOTE}}', '"');
}