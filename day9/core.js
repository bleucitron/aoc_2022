export default function parse(input) {
  const data = input
    .trim()
    .split('\n')
    .map(line => line.split(' '))
    .map(([direction, steps]) => [direction, parseInt(steps)]);

  return data;
}

export function logMap(knots) {
  let s = '';
  for (let i = 16; i >= -5; i--) {
    for (let j = -11; j <= 14; j++) {
      let point = '.';
      const [h, ...rest] = knots;
      if (0 === j && 0 === i) {
        point = 's';
      }
      [...rest].reverse().forEach(([x, y], k) => {
        if (x === j && y === i) {
          point = rest.length - k;
        }
      });
      if (h[0] === j && h[1] === i) {
        point = 'H';
      }
      s += point;
    }
    s += '\n';
  }
  console.log(s);
}

export function logVisited(visited) {
  const points = [...visited]
    .map(v => v.split(','))
    .map(([x, y]) => [parseInt(x), parseInt(y)]);
  let s = '';
  for (let i = 16; i >= -5; i--) {
    for (let j = -11; j <= 14; j++) {
      let point = '.';
      if (0 === j && 0 === i) {
        point = 's';
      }
      points.forEach(([x, y]) => {
        if (x === j && y === i) {
          point = '#';
        }
      });
      s += point;
    }
    s += '\n';
  }
  console.log(s);
  console.log('');
}
