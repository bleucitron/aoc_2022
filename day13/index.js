import { parse, compare } from './core.js';

export function part1(input) {
  const data = parse(input);

  const output = data
    .map(([left, right]) => compare(left, right))
    .map(e => e === 1)
    .reduce((acc, value, index) => (value ? acc + index + 1 : acc), 0);

  return output;
}

export function part2(input) {
  const data = parse(input);

  const packets = [[[2]], [[6]], ...data.flat()];

  const ordered = packets.sort((a, b) => -compare(a, b));
  const first =
    ordered.findIndex(packet => JSON.stringify(packet) === '[[2]]') + 1;
  const second =
    ordered.findIndex(packet => JSON.stringify(packet) === '[[6]]') + 1;

  return first * second;
}
