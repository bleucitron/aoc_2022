import { parse, makePosition, walk } from './core.js';

export function part1(input) {
  let { winds, walls, width, height } = parse(input);

  const start = makePosition([1, 0]);
  const objective = makePosition([width, height + 1]);

  const { minutes } = walk({ winds, walls, width, height, start, objective });

  return minutes;
}

export function part2(input) {
  let { winds, walls, width, height } = parse(input);

  let minutes = 0;

  let start = makePosition([1, 0]);
  let objective = makePosition([width, height + 1]);

  const first = walk({ winds, walls, width, height, start, objective });
  minutes += first.minutes;
  winds = first.winds;

  let pivot = objective;
  objective = start;
  start = pivot;

  const second = walk({ winds, walls, width, height, start, objective });
  minutes += second.minutes;
  winds = second.winds;

  pivot = objective;
  objective = start;
  start = pivot;

  const third = walk({ winds, walls, width, height, start, objective });
  minutes += third.minutes;

  return minutes;
}
