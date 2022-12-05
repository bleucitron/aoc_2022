export default function parse(input) {
  const data = input.split('\n').filter(x => x);

  const moveString = data.filter(l => l.startsWith('move'));
  const stackString = data.filter(
    l => !l.startsWith('move') && !l.includes('1'),
  );
  const nb = data
    .find(l => l.trim().startsWith('1'))
    .trim()
    .split('  ');

  const stacks = nb.map(() => []);
  stackString.forEach(s => {
    nb.forEach((n, i) => {
      const e = s
        .substring(4 * i, 4 * i + 3)
        .trim()
        .split('')
        .filter(x => x !== '[' && x !== ']')
        .join('');

      if (e) {
        stacks[i].push(e);
      }
    });
  });

  const moves = moveString.map(s => {
    const m = s.match(/move (\d+) from (\d) to (\d)/);
    return { qty: m[1], from: m[2], to: m[3] };
  });

  return {
    moves,
    stacks,
  };
}

export function moveCrates({ stacks, moves, oneByOne = true }) {
  moves.forEach(({ qty, from, to }) => {
    const origin = stacks[from - 1];
    const destination = stacks[to - 1];

    let crates = origin.splice(0, qty);
    if (oneByOne) {
      crates = crates.reverse();
    }
    stacks[to - 1] = [...crates, ...destination];
    stacks[from - 1] = origin;
  });

  return stacks.map(s => s[0]).join('');
}
