export function parse(input) {
  let data = input
    .trim()
    .split('\n')
    .map(line =>
      line.split(' -> ').map(pt => pt.split(',').map(c => parseInt(c))),
    );

  const rocks = data.map(line => {
    const points = [];
    points.push(line[0].join(','));
    line.forEach(([X, Y], i) => {
      if (i > 0) {
        let [x, y] = line[i - 1];

        while (`${x},${y}` !== `${X},${Y}`) {
          if (Math.abs(X - x) > 0) {
            x = X - x > 0 ? x + 1 : x - 1;
            points.push(`${x},${y}`);
          }
          if (Math.abs(Y - y) > 0) {
            y = Y - y > 0 ? y + 1 : y - 1;
            points.push(`${x},${y}`);
          }
        }
      }
    });
    return points;
  });

  return rocks.flat();
}

export function logMap({
  rocks,
  sand = new Set(),
  start: [x0, y0],
  withGround,
}) {
  const points = [...rocks].map(rock => rock.split(','));
  const xs = points.map(rock => rock[0]);
  const ys = points.map(rock => rock[1]);

  const yMin = 0;
  const yMax = Math.max(...ys);
  const xMin = withGround ? x0 - yMax - 2 : Math.min(...xs);
  const xMax = withGround ? x0 + yMax + 2 : Math.max(...xs);

  let map = '';
  for (let y = yMin; y <= yMax + 2; y++) {
    for (let x = xMin; x <= xMax; x++) {
      let pt = '.';

      if (rocks.has(`${x},${y}`)) {
        pt = '#';
      } else if (sand.has(`${x},${y}`)) {
        pt = 'o';
      }
      if (withGround && y === yMax + 2) {
        pt = '#';
      }
      map += pt;
    }
    map += '\n';
  }

  return map;
}
