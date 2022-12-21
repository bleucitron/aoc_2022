export function parse(input) {
  return input.trim().split('\n');
}

export function makeMap1(data) {
  const m = new Map();

  data.forEach(line => {
    const [id, op] = line.split(': ');

    const n = parseInt(op);
    if (n) {
      m.set(id, n);
      return;
    }

    const r = op.match(/(.+) (\+|-|\*|\/) (.+)/);

    m.set(id, () => {
      // console.log('ID', id);
      let x = m.get(r[1]);
      let y = m.get(r[3]);

      x = typeof x === 'number' ? parseInt(x) : x();
      y = typeof y === 'number' ? parseInt(y) : y();

      // console.log({ x, y });

      return eval(`${x} ${r[2]} ${y}`);
    });
  });

  return m;
}

export function makeMap2(data) {
  const m = new Map();

  data.forEach(line => {
    let [id, op] = line.split(': ');

    const n = parseInt(op);
    if (n) {
      m.set(id, n);
      return;
    }

    const r = op.match(/(.+) (\+|-|\*|\/) (.+)/);
    const arg1 = r[1];
    const arg2 = r[3];
    let operand = r[2];

    if (id === 'root') {
      operand = operand.replace('+', '-');
    }

    m.set(id, () => {
      let x = m.get(arg1);
      let y = m.get(arg2);

      x = typeof x === 'number' ? parseInt(x) : x();
      y = typeof y === 'number' ? parseInt(y) : y();

      return eval(`${x} ${operand} ${y}`);
    });
  });

  return m;
}
