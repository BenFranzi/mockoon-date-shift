import { intervalToDuration, isBefore } from 'date-fns';

function isValidDateString(raw) {
  const hasNotEnoughDashes = raw.split('').filter(char => char === '-').length < 2;
  const isInvalidDate = (new Date(raw)).toString() === 'Invalid Date';

  return !(isInvalidDate || hasNotEnoughDashes);
}

function convert(target, dateToCompare) {
  const start = new Date(target);

  if (Math.abs(start.getFullYear() - (new Date()).getFullYear()) > 200) {
    return target;
  }

  let gap = intervalToDuration({start, end: dateToCompare});

  gap.years = gap.years || 0;
  gap.months = gap.months || 0;
  gap.days = gap.days || 0;

  if (isBefore(start, dateToCompare)) {
    gap = Object.entries(gap).reduce((acc, [key, value]) => ({ ...acc, [key]: -1 * value}), {})
  }

  if (target.split('').includes('Z')) {
    return `{{dateTimeShift date=now format={{DOUBLE_QUOTE}}yyyy-MM-dd'T'00:00:00'Z{{DOUBLE_QUOTE}} years=${gap.years} months=${gap.months} days=${gap.days} hours=0 minutes=0 seconds=0}}`
  }

  return `{{dateTimeShift date=now format={{SINGLE_QUOTE}}yyyy-MM-dd{{SINGLE_QUOTE}} years=${gap.years} months=${gap.months} days=${gap.days} hours=0 minutes=0 seconds=0}}`
}


const comparisonDate = new Date();

function traverse(node) {
  if (Array.isArray(node)) {
    return node.map(traverse);
  }
  if (typeof node === 'string' && Boolean(node) && isValidDateString(node)) {
    return convert(node, comparisonDate);
  }
  if (node === null || node === undefined) {
    return node;
  }
  if (typeof node === 'object') {
    return Object.entries(node).reduce((acc, [key, value]) => ({...acc, [key]: traverse(value)}), {}); // TODO: Uplift this line
  }

  return node;
}


export default async function process(raw: string, comparisonDate: Date): Promise<string> {
  return JSON.stringify(traverse(JSON.parse(raw)), null, 2)
    .replaceAll('{{SINGLE_QUOTE}}', "'")
    .replaceAll('{{DOUBLE_QUOTE}}', '"');
}