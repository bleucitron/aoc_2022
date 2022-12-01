import core from './core.js';

export function part1(input) {
  const loads = core(input);
  const solution = Math.max(...loads);
  return solution;
}

export function part2(input) {
  const loads = core(input);

  const sorted = [...loads].sort((a, b) => b - a);
  const top3 = [...sorted].splice(0, 3);
  const solution = top3.reduce((a, b) => a + b, 0);
  return solution;
}
