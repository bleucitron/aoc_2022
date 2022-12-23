import { parse, parseFlat, parseSteps, parseCube } from './core.js';

import {
  RIGHT,
  UP,
  DOWN,
  stepByDirection,
  directions,
  makePosition,
  parsePosition,
  move,
} from './utils.js';

export function part1(input) {
  const { carte, instructions } = parse(input);
  const steps = parseSteps(instructions);
  const map = parseFlat(carte);

  const keys = [...map.keys()].map(parsePosition);

  let facing = RIGHT;
  let coords = keys[0];

  steps.forEach((step, _i) => {
    if (typeof step !== 'number') {
      const index = directions.findIndex(d => d === facing);
      const newIndex =
        ((step === 'R' ? index + 1 : index - 1) + directions.length) %
        directions.length;
      facing = directions[newIndex];
    } else {
      for (let i = 1; i <= step; i++) {
        const delta = stepByDirection[facing];
        let newCoords = move(coords, delta);
        const newPosition = makePosition(newCoords);
        let pt = map.get(newPosition);

        if (!pt) {
          const [x, y] = coords;

          const vertical = facing === UP || facing === DOWN;
          const forward = facing === DOWN || facing === RIGHT;
          const sameRowOrCol = vertical
            ? ([xK]) => xK === x
            : ([_, yK]) => yK === y;
          const byRowOrCol = vertical
            ? ([_, y1], [__, y2]) => y1 - y2
            : ([x1], [x2]) => x1 - x2;
          const nextIndex = forward ? 0 : -1;

          const potential = keys.filter(sameRowOrCol).sort(byRowOrCol);

          newCoords = potential.at(nextIndex);
          pt = map.get(makePosition(newCoords));
        }

        if (pt !== '#') {
          coords = newCoords;
        } else {
          break;
        }
      }
    }
  });

  const [x, y] = coords;
  return y * 1000 + 4 * x + facing;
}

export function part2(input) {
  const { carte, instructions } = parse(input);
  const test = carte.length < 1000;

  const steps = parseSteps(instructions);
  const { cube, neighborsById } = parseCube(carte, { size: test ? 4 : 50 });

  let cubeId = test ? 3 : 2;

  let { map } = cube.get(cubeId);

  const keys = [...map.keys()].map(parsePosition);

  let facing = RIGHT;
  let coords = keys[0];

  for (let _i = 0; _i < steps.length; _i++) {
    const step = steps[_i];

    if (typeof step !== 'number') {
      const index = directions.findIndex(d => d === facing);
      const newIndex =
        ((step === 'R' ? index + 1 : index - 1) + directions.length) %
        directions.length;
      facing = directions[newIndex];
    } else {
      for (let i = 1; i <= step; i++) {
        const delta = stepByDirection[facing];

        let newCoords = move(coords, delta);
        let newPosition = makePosition(newCoords);
        let pt = map.get(newPosition);

        let newFacing = facing;
        let newCubeId = cubeId;
        let newMap = map;
        if (!pt) {
          const neighbors = neighborsById.get(cubeId);
          const neighbor = neighbors[facing];

          newCoords = neighbor.transpose(coords);
          newPosition = makePosition(newCoords);
          newFacing = neighbor.facing;
          newCubeId = neighbor.id;
          newMap = cube.get(newCubeId).map;

          pt = newMap.get(newPosition);
        }

        if (pt !== '#') {
          coords = newCoords;
          facing = newFacing;
          cubeId = newCubeId;
          map = cube.get(newCubeId).map;
        } else {
          break;
        }
      }
    }
  }

  const toGlobal = cube.get(cubeId).toGlobal;
  const [X, Y] = toGlobal(coords);

  return Y * 1000 + 4 * X + facing;
}
