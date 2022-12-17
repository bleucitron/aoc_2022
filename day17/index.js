import { parse, play } from './core.js';

export function part1(input) {
  const { rocks, moves } = parse(input);

  return play(rocks, moves, 2022);
}

export function part2(input) {
  const { rocks, moves } = parse(input);

  return play(rocks, moves, 1000000000000);
}
