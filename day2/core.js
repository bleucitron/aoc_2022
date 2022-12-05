export default function core(input) {
  return input.trim().split('\n');
}

export function points1(letter) {
  return letter === 'X' ? 1 : letter === 'Y' ? 2 : 3;
}

export function outcome1(l1, l2) {
  if (l1 === 'A') {
    return l2 === 'X' ? 3 : l2 === 'Y' ? 6 : 0;
  } else if (l1 === 'B') {
    return l2 === 'X' ? 0 : l2 === 'Y' ? 3 : 6;
  } else {
    return l2 === 'X' ? 6 : l2 === 'Y' ? 0 : 3;
  }
}

export function outcome2(letter) {
  return letter === 'X' ? 0 : letter === 'Y' ? 3 : 6;
}

export function points2(l1, l2) {
  if (l1 === 'A') {
    return l2 === 'X' ? 3 : l2 === 'Y' ? 1 : 2;
  } else if (l1 === 'B') {
    return l2 === 'X' ? 1 : l2 === 'Y' ? 2 : 3;
  } else {
    return l2 === 'X' ? 2 : l2 === 'Y' ? 3 : 1;
  }
}
