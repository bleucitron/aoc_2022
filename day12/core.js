import { writeFileSync } from 'fs';

export default function parse(input) {
  const data = input.trim().split('\n');

  const grid = data.map(line => line.split(''));

  // console.log('Grid', grid);

  return grid;
}

export function logMap(map) {
  let s = '';

  map.forEach(line => {
    line.forEach(letter => {
      s += letter;
    });

    s += '\n';
  });

  writeFileSync(`./day12/map.txt`, s);
}
