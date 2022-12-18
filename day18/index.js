import { parse, computeSurface, isInside, findLimits } from './core.js';

export function part1(input) {
  const points = parse(input);

  return computeSurface(points);
}

export function part2(input) {
  const points = parse(input);
  const pointSet = new Set(points.map(([x, y, z]) => `${x},${y},${z}`));

  const nbFreeSides = computeSurface(points);

  const { xMin, xMax, yMin, yMax, zMin, zMax } = findLimits(points);

  // find all points inside the limits
  const insiders = [];
  for (let i = xMin; i <= xMax; i++) {
    for (let j = yMin; j <= yMax; j++) {
      for (let k = zMin; k <= zMax; k++) {
        const pt = `${i},${j},${k}`;

        if (pointSet.has(pt)) {
          continue;
        }

        const inside = isInside([i, j, k], points, pointSet);

        if (inside) {
          insiders.push([i, j, k]);
        }
      }
    }
  }

  // dig from one inside point, finding cavities or connections to the outside
  const visited = new Set();

  function dig(coords) {
    const [X, Y, Z] = coords;
    const queue = [coords];

    if (visited.has(`${X},${Y},${Z}`)) {
      return;
    }

    const cavity = [];

    while (queue.length) {
      const [x, y, z] = queue.shift();

      const pt = `${x},${y},${z}`;

      if (visited.has(pt)) continue;

      if (
        x === xMin ||
        x === xMax ||
        y === yMin ||
        y === yMax ||
        z === zMin ||
        z === zMax
      ) {
        // connected to outside
        cavity.push([x, y, z]);
        return;
      }

      cavity.push([x, y, z]);
      visited.add(pt);

      for (let delta = -1; delta <= 1; delta += 2) {
        const _x = x + delta;
        const _y = y + delta;
        const _z = z + delta;

        const ptx = `${_x},${y},${z}`;
        if (!pointSet.has(ptx) && !visited.has(ptx)) {
          queue.push([_x, y, z]);
        }

        const pty = `${x},${_y},${z}`;
        if (!pointSet.has(pty) && !visited.has(pty)) {
          queue.push([x, _y, z]);
        }

        const ptz = `${x},${y},${_z}`;
        if (!pointSet.has(ptz) && !visited.has(ptz)) {
          queue.push([x, y, _z]);
        }
      }
    }

    return cavity;
  }

  const cavities = insiders.map(dig).filter(x => x);

  const nbInnerSides = cavities
    .map(computeSurface)
    .reduce((acc, nb) => acc + nb, 0);

  return nbFreeSides - nbInnerSides;
}
