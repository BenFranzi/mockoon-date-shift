# mockoon-date-shift
[![npm version](https://badge.fury.io/js/mockoon-date-shift.svg)](https://badge.fury.io/js/mockoon-date-shift)

A dead simple *in-place* date shifting tool that updates all of your dates in a JSON file to use the 
mockoon `dateTimeShift` format.

## Usage
> npx mockoon-date-shift ./file.json

### Before
```json
{
  "item": "2000-01-01"
}
```

### After
```json
{
  "item": "{{dateTimeShift date=now format='yyyy-MM-dd' years=-24 months=-3 days=-16 hours=0 minutes=0 seconds=0}}"
}
```

