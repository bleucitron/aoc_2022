import parse from './core.js';

export function part1(input) {
  const data = parse(input);

  const cycles = [20, 60, 100, 140, 180, 220];
  let sum = 0;
  let X = 1;

  data
    .map(l => l.split(' '))
    .flat()
    .forEach((line, i) => {
      if (cycles.includes(i + 1)) {
        sum += (i + 1) * X;
      }

      if (line !== 'addx' && line !== 'noop') {
        const x = parseInt(line);
        X += x;
      }
    });
  return sum;
}

export function part2(input) {
  const data = parse(input);

  let screen = '\n';
  let X = 1;

  data
    .map(l => l.split(' '))
    .flat()
    .forEach((line, i) => {
      const base = i % 40;

      screen += base === X - 1 || base === X || base === X + 1 ? '#' : '.';
      if ((i + 1) % 40 === 0) {
        screen += '\n';
      }

      if (line !== 'addx' && line !== 'noop') {
        const x = parseInt(line);
        X += x;
      }
    });

  return screen;
}
