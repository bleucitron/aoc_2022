export const direction = {
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
};
export const { RIGHT, DOWN, LEFT, UP } = direction;
export const directionByIndex = {
  0: 'RIGHT',
  1: 'DOWN',
  2: 'LEFT',
  3: 'UP',
};
export const directions = Object.values(direction);

export const stepByDirection = {
  [direction.RIGHT]: [1, 0],
  [direction.DOWN]: [0, 1],
  [direction.LEFT]: [-1, 0],
  [direction.UP]: [0, -1],
};

export function makePosition([x, y]) {
  return `${x},${y}`;
}
export function parsePosition(position) {
  return position.split(',').map(e => parseInt(e));
}

export function move([x, y], [dX, dY]) {
  return [x + dX, y + dY];
}
