export default function parse(input) {
  const data = input.trim().split('\n');

  let map = [];

  data.forEach((line, j) => {
    line.split('').forEach((letter, i) => {
      if (!map[j]) map[j] = [letter];
      else map[j][i] = letter;
    });
  });

  return map;
}
