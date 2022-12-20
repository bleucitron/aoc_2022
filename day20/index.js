import { parse, decipher } from './core.js';

export function part1(input) {
  const numbers = parse(input);

  return decipher(numbers);
}

export function part2(input) {
  const numbers = parse(input);

  return decipher(numbers, { key: 811589153, rounds: 10 });
}
