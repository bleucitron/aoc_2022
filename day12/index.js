import { writeFileSync } from 'fs';
import parse, { trail, logMap } from './core.js';

export function part1(input) {
  const grid = parse(input);

  let start;

  // Look for S and E
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 'S') {
        start = [i, j];
        break;
      }
    }
    if (start) break;
  }

  const path = trail(grid, start);
  writeFileSync(`./day12/map-1.txt`, logMap(grid, path));

  return path.length - 1;
}

export function part2(input) {
  const grid = parse(input);

  const starts = [];

  // Look for starting points
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === 'S' || line[j] === 'a') {
        starts.push([i, j]);
      }
    }
  }

  const paths = starts
    .map(s => trail(grid, s))
    .filter(path => path)
    .sort((a, b) => a.length - b.length);

  writeFileSync(`./day12/map-2.txt`, logMap(grid, paths[0]));

  return paths[0].length - 1;
}
