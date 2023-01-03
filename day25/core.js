export const translation = {
  2: 2,
  1: 1,
  0: 0,
  '-': -1,
  '=': -2,
};
export const reverse = {
  2: 2,
  1: 1,
  0: 0,
  '-1': '-',
  '-2': '=',
};

export function parse(input) {
  const data = input.trim().split('\n');

  return data;
}

export function snafu(n) {
  let i = 0;
  while (n >= 2 * 5 ** i) {
    i++;
  }

  let options = [2, 1, 0, -1, -2];
  let digits = Array.from({ length: i + 1 }, _ => 0);
  let current = digits.reduce(
    (acc, n, index) => acc + (translation[n] ?? 0) * 5 ** index,
    0,
  );

  while (current !== n) {
    const xs = options.map(o => Math.abs(current + o * 5 ** i - n));
    const best = Math.min(...xs);
    const option = options[xs.findIndex(e => e === best)];

    digits[i] = reverse[option];
    current = digits.reduce(
      (acc, n, index) => acc + (translation[n] ?? 0) * 5 ** index,
      0,
    );

    i--;
  }

  let s = digits.reverse().join('');

  while (s.startsWith('0')) {
    s = s.substring(1);
  }

  return s;
}
