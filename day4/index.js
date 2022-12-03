import parse from './core.js';

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function part1(input) {
  const data = parse(input);

  const errors = data.map(line => {
    const length = line.length;
    const first = line.substring(0, length / 2);
    const second = line.substring(length / 2, length);

    const firstArray = first.split('');
    const secondArray = second.split('');

    const found = firstArray.find(l => secondArray.includes(l));

    return letters.indexOf(found) + 1;
  });

  return errors.reduce((acc, e) => acc + e);
}

export function part2(input) {
  const data = parse(input);

  const groups = data.reduce((acc, line) => {
    if (acc.length && acc.at(-1).length < 3) {
      acc.at(-1).push(line);
      return acc;
    } else {
      return [...acc, [line]];
    }
  }, []);

  const badges = groups.map(sacks => {
    const [first, second, third] = sacks;
    const badge = first.split('').find(item => {
      return second.includes(item) && third.includes(item);
    });

    return letters.indexOf(badge) + 1;
  });

  return badges.reduce((a, i) => a + i);
}
