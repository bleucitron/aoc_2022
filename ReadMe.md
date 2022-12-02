# [Advent of Code 2022](https://adventofcode.com/2022)

In Javascript.

## Usage

You can run each day solution by using:
```bash
npm run day X
```

By default, if the `input.txt` is found in the corresponding day directory, the script will use it.
If not found, the script will load your input data based on your cookie, that you should set in `secret.json`, like so:
```json
{
  "cookie": "your-cookie"
}
```


You can force the replacement of your `input.txt` by using the `replace` option when running the command.

## Input files

Use your input files by either:

- replace all `input.txt` files by your own
- remove all `input.txt` files (don't forget to add your `secret.json`)
- use the `replace` option (don't forget to add your `secret.json`)


## Scripts

```bash
npm i

npm run day 1 # runs day 1
npm run day 2 # runs day 2
npm run day X # runs day X

npm run day X replace # runs day X overwriting input

npm run test day1 # runs tests for day 1 with example input
npm run test:watch day1 # runs and watches tests for day 1 with example input

npm run test # runs tests for all days with example input
```
