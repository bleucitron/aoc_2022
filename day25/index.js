import { parse, translation, snafu } from './core.js';

export function part1(input) {
  const data = parse(input);

  const numbers = data.map(line => {
    const chars = line.split('');

    const n = chars
      .reverse()
      .reduce((acc, char, i) => translation[char] * 5 ** i + acc, 0);

    return n;
  });

  const objective = numbers.reduce((acc, n) => acc + n, 0);

  const s = snafu(objective);
  return s;
}
