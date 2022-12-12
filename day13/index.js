import parse from './core.js';

function roll(monkeys, nbRounds, modifier = x => x) {
  const factors = monkeys.reduce((acc, { test }) => acc * test, 1);
  const inspections = monkeys.map(() => 0);

  for (let round = 1; round <= nbRounds; round++) {
    monkeys.forEach(({ items, inspect, test, ifTrue, ifFalse }, i) => {
      items.forEach(item => {
        const value = modifier(inspect(item));
        inspections[i] = inspections[i] + 1;
        const next = value % test === 0 ? ifTrue : ifFalse;
        monkeys[next].items.push(value % factors);
      });
      monkeys[i].items = [];
    });
  }

  const [x, y] = inspections.sort((a, b) => b - a);
  return x * y;
}

export function part1(input) {
  const monkeys = parse(input);

  // return roll(monkeys, 20, x => Math.floor(x / 3));

  const inspections = monkeys.map(() => 0);

  for (let round = 1; round <= 20; round++) {
    monkeys.forEach(({ items, inspect, test, ifTrue, ifFalse }, i) => {
      items.forEach(item => {
        let value = Math.floor(inspect(item) / 3);
        inspections[i] = inspections[i] + 1;
        const next = value % test === 0 ? ifTrue : ifFalse;
        const nextMonkey = monkeys[next];
        nextMonkey.items.push(value);
      });
      monkeys[i].items = [];
    });
  }

  const [x, y] = inspections.sort((a, b) => b - a);
  return x * y;
}

const debug = true;

export function part2(input) {
  const monkeys = parse(input);

  // return roll(monkeys, 20, x => Math.floor(x / 3));
  const factors = monkeys.reduce((acc, { test }) => acc * test, 1);

  const inspections = monkeys.map(() => 0);

  for (let round = 1; round <= 10000; round++) {
    monkeys.forEach(({ items, inspect, test, ifTrue, ifFalse }, i) => {
      items.forEach(item => {
        let value = inspect(item);
        inspections[i] = inspections[i] + 1;
        const next = value % test === 0 ? ifTrue : ifFalse;
        const nextMonkey = monkeys[next];
        nextMonkey.items.push(value % factors);
      });
      monkeys[i].items = [];
    });
  }

  const [x, y] = inspections.sort((a, b) => b - a);
  return x * y;
}
