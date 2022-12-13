import { parse } from './core.js';

export function part1(input) {
  const data = parse(input);

  return Object.values(data)
    .filter(value => value <= 100000)
    .reduce((acc, cur) => acc + cur);
}

export function part2(input) {
  const data = parse(input);

  const total = 70000000;
  const used = data['/'];
  const unused = total - used;
  const needed = 30000000;

  const sorted = Object.values(data)
    .sort((a, b) => a - b)
    .find(e => e >= needed - unused);

  return sorted;
}
