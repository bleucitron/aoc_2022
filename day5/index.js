import parse, { moveCrates } from './core.js';

export function part1(input) {
  const { stacks, moves } = parse(input);

  return moveCrates({ stacks, moves });
}

export function part2(input) {
  const { moves, stacks } = parse(input);

  return moveCrates({ stacks, moves, oneByOne: false });
}
