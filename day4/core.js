export function parse(input) {
  const data = input.trim().split('\n');

  return data;
}

export function getLimits(line) {
  const [A, B] = line.split(',');
  const [firstA, lastA] = A.split('-').map(n => parseInt(n));
  const [firstB, lastB] = B.split('-').map(n => parseInt(n));

  return [
    [firstA, lastA],
    [firstB, lastB],
  ];
}
