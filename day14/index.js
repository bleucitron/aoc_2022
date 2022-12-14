import { writeFileSync } from 'fs';
import { logMap, parse } from './core.js';

export function part1(input) {
  const rocks = parse(input);

  const rockMap = logMap({ rocks: new Set(rocks), start: [500, 0] });
  writeFileSync(`./day14/rockmap-1.txt`, rockMap);

  const sand = new Set();
  const max = Math.max(...rocks.map(rock => rock.split(',')[1]));
  const start = [500, 0];
  const occupied = new Set(rocks);

  let infinite = false;
  let point = start;

  while (!infinite) {
    let [x, y] = point;

    if (y >= max) {
      infinite = true;
      break;
    }
    if (!occupied.has(`${x},${y + 1}`)) {
      y++;
      point = [x, y];
      continue;
    } else {
      if (!occupied.has(`${x - 1},${y + 1}`)) {
        x--;
        y++;
        point = [x, y];
        continue;
      } else if (!occupied.has(`${x + 1},${y + 1}`)) {
        x++;
        y++;
        point = [x, y];
        continue;
      } else {
        sand.add(`${x},${y}`);
        occupied.add(`${x},${y}`);
        point = start;
      }
    }
  }

  const sandMap = logMap({ rocks: new Set(rocks), start: [500, 0], sand });
  writeFileSync(`./day14/sandmap-1.txt`, sandMap);

  return sand.size;
}

export function part2(input) {
  const rocks = parse(input);

  const rockMap = logMap({
    rocks: new Set(rocks),
    start: [500, 0],
    withGround: true,
  });
  writeFileSync(`./day14/rockmap-2.txt`, rockMap);

  const sand = new Set();
  const max = Math.max(...rocks.map(rock => rock.split(',')[1]));
  const start = [500, 0];
  const occupied = new Set(rocks);

  let blocked = false;
  let point = start;

  while (!blocked) {
    let [x, y] = point;

    if (sand.has('500,0')) {
      blocked = true;
      break;
    }
    if (!occupied.has(`${x},${y + 1}`) && y + 1 < max + 2) {
      y++;
      point = [x, y];
      continue;
    } else {
      if (!occupied.has(`${x - 1},${y + 1}`) && y + 1 < max + 2) {
        x--;
        y++;
        point = [x, y];
        continue;
      } else if (!occupied.has(`${x + 1},${y + 1}`) && y + 1 < max + 2) {
        x++;
        y++;
        point = [x, y];
        continue;
      } else {
        sand.add(`${x},${y}`);
        occupied.add(`${x},${y}`);
        point = start;
      }
    }
  }

  const sandMap = logMap({
    rocks: new Set(rocks),
    sand,
    start: [500, 0],
    withGround: true,
  });
  writeFileSync(`./day14/sandmap-2.txt`, sandMap);

  return sand.size;
}
