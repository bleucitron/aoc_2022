export function parse(input) {
  let data = input.trim().split('\n');

  const points = data.map(line => {
    const m = line.match(
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/,
    );

    const sensor = [parseInt(m[1]), parseInt(m[2])];
    const beacon = [parseInt(m[3]), parseInt(m[4])];
    return {
      sensor,
      beacon,
      distance: getDistance(sensor, beacon),
    };
  });

  return points;
}

export function parsePosition(position) {
  return position.split(',').map(n => parseInt(n));
}

export function getDistance([xA, yA], [xB, yB]) {
  return Math.abs(xA - xB) + Math.abs(yA - yB);
}

export function logMap({ sensors, beacons, points }) {
  const all = [...sensors, ...beacons, ...points];
  const xs = all.map(e => parseInt(e.split(',')[0]));
  const ys = all.map(e => parseInt(e.split(',')[1]));
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);

  let map = '';
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      let pt = '.';

      if (points.has(`${x},${y}`)) {
        pt = '#';
      }
      if (sensors.has(`${x},${y}`)) {
        pt = 'S';
      }
      if (beacons.has(`${x},${y}`)) {
        pt = 'B';
      }
      map += pt;
    }
    map += '\n';
  }

  return map;
}
