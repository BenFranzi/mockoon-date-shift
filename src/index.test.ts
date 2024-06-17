import convertDates from '.';

/*
Primary supported formats
- 2024-03-05
- 2024-03-05T11:45:00Z
 */

const params = {
  outOfRangePast: '1823-03-05',
  outOfRangeFuture: '2225-03-05',
  outOfRangePastWithTime: '1823-03-05T11:45:00Z',
  outOfRangeFutureWithTime: '2225-03-05T11:45:00Z',
  normalDateShift: '2024-03-05',
  normalDateShiftWithTime: '2024-03-05T11:45:00Z',
  normalDateShiftForwards: '2025-03-05',
  normalDateShiftWithTimeForwards: '2025-03-05T11:45:00Z',

}

const expected = `{
  "outOfRangePast": "1823-03-05",
  "outOfRangeFuture": "2225-03-05",
  "outOfRangePastWithTime": "1823-03-05T11:45:00Z",
  "outOfRangeFutureWithTime": "2225-03-05T11:45:00Z",
  "normalDateShift": "{{dateTimeShift date=now format='yyyy-MM-dd' years=0 months=-3 days=-1 hours=0 minutes=0 seconds=0}}",
  "normalDateShiftWithTime": "{{dateTimeShift date=now format="yyyy-MM-dd'T'00:00:00'Z" years=0 months=-3 days=-1 hours=0 minutes=0 seconds=0}}",
  "normalDateShiftForwards": "{{dateTimeShift date=now format='yyyy-MM-dd' years=0 months=8 days=26 hours=0 minutes=0 seconds=0}}",
  "normalDateShiftWithTimeForwards": "{{dateTimeShift date=now format="yyyy-MM-dd'T'00:00:00'Z" years=0 months=8 days=26 hours=0 minutes=0 seconds=0}}"
}`

describe(convertDates, () => {
  it('should convert dates', async () => {
    const options: Options = {
      comparisonDate: new Date('2024-06-07'),
      outfile: '',
      file: ''
    }

    const result = await convertDates(options, JSON.stringify(params));

    expect(result).toEqual(expected);
  });
});
