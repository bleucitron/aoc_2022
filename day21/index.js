import { parse, makeMap1, makeMap2 } from './core.js';

export function part1(input) {
  const map = makeMap1(parse(input));

  const root = map.get('root');

  return root();
}

export function part2(input) {
  const data = parse(input);

  const map = makeMap2(data);
  const root = map.get('root');

  // find slope and offset to determine which way to explore
  const x1 = 0;
  const x2 = 10;

  map.set('humn', 0);
  const offset = root();
  map.set('humn', x1);
  const y1 = root();
  map.set('humn', x2);
  const y2 = root();

  const slope = (y2 - offset) / x2;

  const positive = (offset > 0 && slope < 0) || (offset < 0 && slope > 0);

  let i = positive ? 1 : -1;
  let prec;
  let found = false;
  let min;
  let max;

  // find boundaries
  while (found === false) {
    map.set('humn', i);
    const n = root();

    if (n === 0) {
      found = true;
      break;
    }

    if (!prec || Math.sign(prec) === Math.sign(n)) {
      i *= 2;
    } else {
      min = positive ? i / 2 : i;
      max = positive ? i : i / 2;

      i = min + Math.floor((max - min) / 2);
      break;
    }

    prec = n;
  }

  // dichotomy
  while (!found) {
    map.set('humn', i);
    const n = root();

    if (n === 0) {
      found = true;
      break;
    }
    map.set('humn', min);
    const yMin = root();

    map.set('humn', max);
    const yMax = root();

    if (Math.abs(yMin) < Math.abs(yMax)) {
      max = i;
    } else {
      min = i;
    }
    i = min + Math.floor((max - min) / 2);
  }

  return i;
}
