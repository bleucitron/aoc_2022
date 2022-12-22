import { RIGHT, LEFT, UP, DOWN } from './utils.js';

export function makeNeighbors(cube, size = 50) {
  const neighborsById = new Map();
  [...cube.entries()].forEach(([i, value]) => {
    if (value.size === 0) {
      cube.delete(i);
    } else {
      neighborsById.set(i, {});
    }
  });

  if (size === 50) {
    neighborsById.set(2, {
      [RIGHT]: {
        id: 3,
        facing: RIGHT,
        transpose: ([_, y]) => [1, y],
      },
      [DOWN]: {
        id: 5,
        facing: DOWN,
        transpose: ([x]) => [x, 1],
      },
      [LEFT]: {
        id: 7,
        facing: RIGHT,
        transpose: ([_, y]) => [1, size - y + 1],
      },
      [UP]: {
        id: 10,
        facing: RIGHT,
        transpose: ([x]) => [1, size - x + 1],
      },
    });
    neighborsById.set(3, {
      [RIGHT]: {
        id: 8,
        facing: LEFT,
        transpose: ([_, y]) => [1, size - y + 1],
      },
      [DOWN]: {
        id: 5,
        facing: LEFT,
        transpose: ([x]) => [size, x],
      },
      [LEFT]: {
        id: 2,
        facing: LEFT,
        transpose: ([_, y]) => [size, y],
      },
      [UP]: {
        id: 10,
        facing: UP,
        transpose: ([x]) => [x, size],
      },
    });
    neighborsById.set(5, {
      [RIGHT]: {
        id: 3,
        facing: UP,
        transpose: ([_, y]) => [y, size],
      },
      [DOWN]: {
        id: 8,
        facing: DOWN,
        transpose: ([_, y]) => [1, size - y + 1],
      },
      [LEFT]: {
        id: 7,
        facing: DOWN,
        transpose: ([_, y]) => [y, 1],
      },
      [UP]: {
        id: 2,
        facing: UP,
        transpose: ([x]) => [x, size],
      },
    });
    neighborsById.set(8, {
      [RIGHT]: {
        id: 3,
        facing: LEFT,
        transpose: ([_, y]) => [size, size - y + 1],
      },
      [DOWN]: {
        id: 10,
        facing: LEFT,
        transpose: ([x]) => [size, x],
      },
      [LEFT]: {
        id: 7,
        facing: LEFT,
        transpose: ([_, y]) => [size, y],
      },
      [UP]: {
        id: 5,
        facing: UP,
        transpose: ([x]) => [x, size],
      },
    });
    neighborsById.set(7, {
      [RIGHT]: {
        id: 8,
        facing: RIGHT,
        transpose: ([_, y]) => [1, y],
      },
      [DOWN]: {
        id: 10,
        facing: DOWN,
        transpose: ([x]) => [x, 1],
      },
      [LEFT]: {
        id: 2,
        facing: RIGHT,
        transpose: ([_, y]) => [1, size - y + 1],
      },
      [UP]: {
        id: 5,
        facing: RIGHT,
        transpose: ([x]) => [1, x],
      },
    });
    neighborsById.set(10, {
      [RIGHT]: {
        id: 8,
        facing: UP,
        transpose: ([_, y]) => [y, size],
      },
      [DOWN]: {
        id: 3,
        facing: DOWN,
        transpose: ([x]) => [x, 1],
      },
      [LEFT]: {
        id: 2,
        facing: DOWN,
        transpose: ([_, y]) => [y, 1],
      },
      [UP]: {
        id: 7,
        facing: UP,
        transpose: ([x]) => [x, size],
      },
    });
  } else if (size === 4) {
    neighborsById.set(3, {
      [RIGHT]: {
        id: 12,
        facing: LEFT,
        transpose: ([_, y]) => [size, size - y + 1],
      },
      [DOWN]: {
        id: 7,
        facing: DOWN,
        transpose: ([x]) => [x, 1],
      },
      [LEFT]: {
        id: 6,
        facing: DOWN,
        transpose: ([_, y]) => [y, 1],
      },
      [UP]: {
        id: 5,
        facing: DOWN,
        transpose: ([x]) => [size - x + 1, 1],
      },
    });
    neighborsById.set(5, {
      [RIGHT]: {
        id: 6,
        facing: RIGHT,
        transpose: ([_, y]) => [1, y],
      },
      [DOWN]: {
        id: 11,
        facing: UP,
        transpose: ([x]) => [size - x + 1, size],
      },
      [LEFT]: {
        id: 12,
        facing: UP,
        transpose: ([_, y]) => [size - y + 1, size],
      },
      [UP]: {
        id: 3,
        facing: DOWN,
        transpose: ([x]) => [size - x + 1, 1],
      },
    });
    neighborsById.set(6, {
      [RIGHT]: {
        id: 7,
        facing: RIGHT,
        transpose: ([_, y]) => [1, y],
      },
      [DOWN]: {
        id: 11,
        facing: RIGHT,
        transpose: ([x]) => [1, size - x + 1],
      },
      [LEFT]: {
        id: 5,
        facing: LEFT,
        transpose: ([_, y]) => [size, y],
      },
      [UP]: {
        id: 3,
        facing: RIGHT,
        transpose: ([x]) => [1, x],
      },
    });
    neighborsById.set(7, {
      [RIGHT]: {
        id: 12,
        facing: DOWN,
        transpose: ([_, y]) => [size - y + 1, 1],
      },
      [DOWN]: {
        id: 11,
        facing: DOWN,
        transpose: ([_, y]) => [1, y],
      },
      [LEFT]: {
        id: 6,
        facing: LEFT,
        transpose: ([_, y]) => [size, y],
      },
      [UP]: {
        id: 3,
        facing: UP,
        transpose: ([x]) => [x, size],
      },
    });
    neighborsById.set(11, {
      [RIGHT]: {
        id: 12,
        facing: RIGHT,
        transpose: ([_, y]) => [1, y],
      },
      [DOWN]: {
        id: 5,
        facing: UP,
        transpose: ([x]) => [size - x + 1, size],
      },
      [LEFT]: {
        id: 6,
        facing: UP,
        transpose: ([_, y]) => [size - y + 1, size],
      },
      [UP]: {
        id: 7,
        facing: UP,
        transpose: ([x]) => [size, x],
      },
    });
    neighborsById.set(12, {
      [RIGHT]: {
        id: 3,
        facing: LEFT,
        transpose: ([_, y]) => [size - y + 1, size],
      },
      [DOWN]: {
        id: 5,
        facing: RIGHT,
        transpose: ([x]) => [1, size - x + 1],
      },
      [LEFT]: {
        id: 11,
        facing: LEFT,
        transpose: ([_, y]) => [size, y],
      },
      [UP]: {
        id: 7,
        facing: LEFT,
        transpose: ([x]) => [size, size - x + 1],
      },
    });
  }

  return neighborsById;
}
