import parse, { roll } from './core.js';

export function part1(input) {
  const monkeys = parse(input);

  return roll(monkeys, 20, x => Math.floor(x / 3));
}

export function part2(input) {
  const monkeys = parse(input);
  const factors = monkeys.reduce((acc, { test }) => acc * test, 1);

  return roll(monkeys, 10000, x => x % factors);
}
