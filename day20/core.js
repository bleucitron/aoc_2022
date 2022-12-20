export function parse(input) {
  const numbers = input
    .trim()
    .split('\n')
    .map(e => parseInt(e));

  return numbers;
}

function makeMap(numbers) {
  const linked = new Map();

  numbers.forEach((number, i) => {
    const next = i === numbers.length - 1 ? numbers[0] : numbers[i + 1];
    linked.set(`${i},${number}`, {
      value: number,
      next: `${(i + 1) % numbers.length},${next}`,
    });
  });

  return linked;
}

export function decipher(
  input,
  { key = 1, rounds = 1 } = { key: 1, rounds: 1 },
) {
  const numbers = input.map(n => n * key);
  const linked = makeMap(numbers);

  function move(item) {
    let [_, n] = item.split(',');
    n = parseInt(n);
    const max = linked.size - 1;

    if ((n + max) % max === 0) return;

    const toMove = linked.get(item);

    let current = toMove;

    for (let i = 0; i < Math.abs(((n % max) + max) % max); i++) {
      current = linked.get(current.next);
    }

    const prec = [...linked.values()].find(v => v.next === item);

    prec.next = toMove.next;
    toMove.next = current.next;
    current.next = item;
  }

  const keys = [...linked.keys()];
  for (let i = 1; i <= rounds; i++) {
    keys.forEach(move);
  }

  const zero = [...linked.values()].find(v => v.value === 0);
  let current = zero;
  for (let i = 1; i <= 1000; i++) {
    current = linked.get(current.next);
  }
  const n1000 = current.value;
  for (let i = 1; i <= 1000; i++) {
    current = linked.get(current.next);
  }
  const n2000 = current.value;
  for (let i = 1; i <= 1000; i++) {
    current = linked.get(current.next);
  }
  const n3000 = current.value;

  return n1000 + n2000 + n3000;
}
