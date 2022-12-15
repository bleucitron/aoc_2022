import { parse, getDistance, parsePosition } from './core.js';

export function part1(input, target = 2_000_000) {
  const points = parse(input);
  const sensors = new Set(
    points.map(pt => pt.sensor).map(([x, y]) => `${x},${y}`),
  );
  const beacons = new Set(
    points.map(pt => pt.beacon).map(([x, y]) => `${x},${y}`),
  );

  const excluded = new Set();

  points.forEach(({ sensor, distance: d }) => {
    const [x, y] = sensor;
    const deltaY = Math.abs(target - y);

    const xMin = x - d + deltaY;
    const xMax = x + d - deltaY;

    for (let i = xMin; i <= xMax; i++) {
      excluded.add(`${i},${target}`);
    }
  });

  const nbPoints = [...excluded]
    .filter(pt => !beacons.has(pt) && !sensors.has(pt))
    .map(pt => pt.split(','))
    .filter(pt => pt[1] === `${target}`).length;

  return nbPoints;
}

export function part2(input) {
  const points = parse(input);

  const allX = points.map(pt => pt.sensor[0]);
  const allY = points.map(pt => pt.sensor[1]);
  const xMax = Math.max(...allX);
  const yMax = Math.max(...allY);
  const xMin = Math.min(...allX);
  const yMin = Math.min(...allY);

  let candidates = new Set();

  points.forEach(({ sensor, distance }) => {
    const [x, y] = sensor;
    const start = x - distance - 1;
    const end = x + distance + 1;

    let current = start;
    while (current < end + 1) {
      // walk down just outside the frontier of each sensor
      const p1 =
        current < x
          ? [current, y + (start - current)]
          : [current, y - (start - current)];

      const p2 =
        current < x
          ? [current, y - (start - current)]
          : [current, y + (start - current)];

      const [x1, y1] = p1;
      const [x2, y2] = p2;

      // points outside the "inner" square made of sensors are discarded
      if (x1 >= xMin && x1 <= xMax && y1 >= yMin && y1 <= yMax) {
        const hidden = points.reduce(
          (acc, pt) => acc && getDistance(pt.sensor, p1) > pt.distance,
          true,
        );

        /**
         * if the point is inside the "inner" square, and is out of reach of all sensors,
         * then it's a candidate
         */
        if (hidden) {
          candidates.add(`${x1},${y1}`);
        }
      }

      // points outside the "inner" square made of sensors are discarded
      if (x2 >= xMin && x2 <= xMax && y2 >= yMin && y2 <= yMax) {
        const hidden = points.reduce(
          (acc, pt) => acc && getDistance(pt.sensor, p2) > pt.distance,
          true,
        );

        /**
         * if the point is inside the "inner" square, and is out of reach of all sensors,
         * then it's a candidate
         */
        if (hidden) {
          candidates.add(`${x2},${y2}`);
        }
      }

      current++;
    }
  });

  /**
   * In this problem, there can be only one candidate
   */
  const [x, y] = parsePosition([...candidates][0]);

  return 4_000_000 * x + y;
}
