import { parse, points1, outcome1, points2, outcome2 } from './core.js';

export function part1(input) {
  const data = parse(input);

  const rounds = data.map(round => {
    const [opponent, mine] = round.split(' ');

    const v = outcome1(opponent, mine);
    const points = points1(mine);

    return v + points;
  });

  return rounds.reduce((acc, r) => acc + r, 0);
}

export function part2(input) {
  const data = parse(input);

  const rounds = data.map(round => {
    const [opponent, mine] = round.split(' ');

    const v = outcome2(mine);
    const points = points2(opponent, mine);

    return v + points;
  });

  return rounds.reduce((acc, r) => acc + r, 0);
}
