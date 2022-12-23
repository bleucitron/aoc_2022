import { parse, logMap, round, N, S, W, E } from './core.js';

export function part1(input) {
  const set = parse(input);

  let order = [N, S, W, E];
  let map = logMap(set);

  for (let i = 1; i <= 10; i++) {
    const result = round(set, order);
    order = result.order;
  }

  map = logMap(set);
  const final = map
    .split('\n')
    .map(line => line.split(''))
    .flat()
    .filter(pt => pt === '.');

  return final.length;
}

export function part2(input) {
  const set = parse(input);

  let order = [N, S, W, E];

  let i = 0;
  let found = false;
  while (!found) {
    i++;

    const result = round(set, order);
    order = result.order;
    const moves = result.moves;

    if (moves === 0) {
      found = true;
      break;
    }
  }

  return i;
}
