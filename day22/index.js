import { parse, parseFlat, parseSteps, parseCube } from './core.js';

import {
  RIGHT,
  UP,
  DOWN,
  stepByDirection,
  directionByIndex,
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
  const steps = parseSteps(instructions);
  const { cube, neighborsById } = parseCube(carte, { size: 50 });

  // let cubeId = 3;
  let cubeId = 2;

  let { map } = cube.get(cubeId);

  const keys = [...map.keys()].map(parsePosition);

  let facing = RIGHT;
  let coords = keys[0];

  // let count = 0;
  // steps.forEach((step, _i) => {
  for (let _i = 0; _i < steps.length; _i++) {
    // count++;
    // if (count > 30) break;
    const step = steps[_i];

    if (typeof step !== 'number') {
      const index = directions.findIndex(d => d === facing);
      const newIndex =
        ((step === 'R' ? index + 1 : index - 1) + directions.length) %
        directions.length;
      facing = directions[newIndex];
    } else {
      console.log('MOVE', directionByIndex[facing], step);
      for (let i = 1; i <= step; i++) {
        // console.log('i', i);
        const delta = stepByDirection[facing];
        // console.log(coords);
        let newCoords = move(coords, delta);
        let newPosition = makePosition(newCoords);
        let pt = map.get(newPosition);
        // console.log({ newPosition, pt });

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
          // console.log('Try changing cube', {
          //   newCubeId,
          //   newFacing: directionByIndex[newFacing],
          // });

          pt = newMap.get(newPosition);
          // console.log({ newPosition, pt });
        }

        if (pt !== '#') {
          coords = newCoords;
          facing = newFacing;
          cubeId = newCubeId;
          map = cube.get(newCubeId).map;
        } else {
          // console.log('Blocked');
          break;
        }
      }
    }
  }

  const toGlobal = cube.get(cubeId).toGlobal;
  console.log('LOCAL', coords, cubeId);
  const [X, Y] = toGlobal(coords);
  console.log('GLOBAL', [X, Y]);

  return Y * 1000 + 4 * X + facing;
}
