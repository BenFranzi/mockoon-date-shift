import process from '.';

const year = (new Date()).getFullYear();

/*
Primary supported formats
- 2024-03-05
- 2024-03-05T11:45:00Z
 */

const params = {
  outOfRangePast: `${year - 201}-03-05`,
  outOfRangeFuture: `${year + 201}-03-05`,
  outOfRangePastWithTime: `${year - 201}-03-05T11:45:00Z`,
  outOfRangeFutureWithTime: `${year + 201}-03-05T11:45:00Z`,
  normalDateShift: `${year}-03-05`,
  normalDateShiftWithTime: `${year}-03-05T11:45:00Z`,
}

const expected = `{
  "outOfRangePast": "1823-03-05",
  "outOfRangeFuture": "2225-03-05",
  "outOfRangePastWithTime": "1823-03-05T11:45:00Z",
  "outOfRangeFutureWithTime": "2225-03-05T11:45:00Z",
  "normalDateShift": "{{dateTimeShift date=now format='yyyy-MM-dd' years=0 months=-3 days=-1 hours=0 minutes=0 seconds=0}}",
  "normalDateShiftWithTime": "{{dateTimeShift date=now format="yyyy-MM-dd'T'00:00:00'Z" years=0 months=-3 days=0 hours=0 minutes=0 seconds=0}}"
}`

describe(process, () => {
  it('should convert dates', async () => {
    const result = await process(JSON.stringify(params), new Date());

    expect(result).toEqual(expected);
  });
});
