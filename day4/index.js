import parse, { getLimits } from './core.js';

export function part1(input) {
  const data = parse(input);

  return data
    .map(getLimits)
    .filter(([[a, b], [A, B]]) => (a <= A && b >= B) || (A <= a && B >= b))
    .length;
}

export function part2(input) {
  const data = parse(input);

  return data
    .map(getLimits)
    .filter(([[a, b], [A, B]]) => (a <= A && b >= A) || (A <= a && B >= a))
    .length;
}
