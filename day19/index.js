import { parse, run } from './core.js';

export function part1(input) {
  const data = parse(input);

  const maxGeode = [];

  for (let i = 0; i < data.length; i++) {
    // for each blueprint
    const blueprint = data[i];
    const max = run(blueprint, 24);

    maxGeode.push(max);
  }

  const qualities = maxGeode.reduce(
    (acc, result, i) => acc + (i + 1) * result,
    0,
  );

  return qualities;
}

export function part2(input) {
  const data = parse(input).filter((_, i) => i < 3);

  const maxGeode = [];

  for (let i = 0; i < data.length; i++) {
    // for each blueprint
    const blueprint = data[i];
    const max = run(blueprint);

    maxGeode.push(max);
  }

  const answer = maxGeode.reduce((acc, result) => acc * result, 1);

  return answer;
}
