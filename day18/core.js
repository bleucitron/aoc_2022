export function parse(input) {
  const data = input
    .trim()
    .split('\n')
    .map(line => line.split(',').map(e => parseInt(e)));

  return data;
}

function distance(a, b) {
  return a.reduce((acc, coord, i) => acc + Math.abs(coord - b[i]), 0);
}

export function computeSurface(points) {
  const freeSides = points.map(coords => {
    const distances = points.map(_coords => distance(coords, _coords));

    const nbConnexions = distances.filter(c => c === 1).length;
    return 2 * coords.length - nbConnexions;
  });

  return freeSides.reduce((acc, nb) => acc + nb, 0);
}
export function findLimits(points) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([_, y]) => y);
  const zs = points.map(([_, __, z]) => z);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys);
  const zMax = Math.max(...zs);
  const xMin = Math.min(...xs);
  const yMin = Math.min(...ys);
  const zMin = Math.min(...zs);

  return { xMin, xMax, yMin, yMax, zMin, zMax };
}

export function isInside([x, y, z], points, pointSet) {
  if (pointSet.has(`${x},${y},${z}`)) {
    return false;
  }

  const minX = points.find(([_x, _y, _z]) => {
    return _x < x && _y === y && _z === z;
  });
  const maxX = points.find(([_x, _y, _z]) => {
    return x < _x && _y === y && _z === z;
  });
  const minY = points.find(([_x, _y, _z]) => {
    return _y < y && _x === x && _z === z;
  });
  const maxY = points.find(([_x, _y, _z]) => {
    return y < _y && _x === x && _z === z;
  });
  const minZ = points.find(([_x, _y, _z]) => {
    return _z < z && _x === x && _y === y;
  });
  const maxZ = points.find(([_x, _y, _z]) => {
    return z < _z && _x === x && _y === y;
  });

  return !!(minX && maxX && minY && maxY && minZ && maxZ);
}
