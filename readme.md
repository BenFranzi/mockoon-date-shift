# mockoon-date-shift
[![npm version](https://badge.fury.io/js/mockoon-date-shift.svg)](https://badge.fury.io/js/mockoon-date-shift)

A dead simple *in-place* date shifting tool that updates all of your dates in a JSON file to use the 
mockoon `dateTimeShift` format.

## Usage
> npx mockoon-date-shift ./file.json

### Before
```json
{
  "item": "2024-04-18"
}
```

### After
```json
{
  "item": "{{dateTimeShift date=now format='yyyy-MM-dd' years=-1 months=-1 days=-14 hours=0 minutes=0 seconds=0}}"
}
```

