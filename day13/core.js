export default function parse(input) {
  const data = input.trim().split('\n\n');

  const output = data.map(block => {
    block = block.split('\n');
    const items = block[1]
      .split(':')[1]
      .trim()
      .split(', ')
      .map(x => parseInt(x));
    const op = block[2].split(':')[1].trim().replace('new', 'old');
    const test = parseInt(block[3].split('by')[1].trim());
    const ifTrue = parseInt(block[4].split('monkey')[1].trim());
    const ifFalse = parseInt(block[5].split('monkey')[1].trim());

    function inspect(old) {
      eval(op);
      return old;
    }

    return {
      items,
      inspect,
      test,
      ifTrue,
      ifFalse,
    };
  });

  return output;
}

export function roll(monkeys, nbRounds, modifier = x => x) {
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
