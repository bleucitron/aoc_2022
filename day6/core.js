export function solve(data, length) {
  let position;

  for (let i = 0; i < data.length; i++) {
    const letters = data.slice(i, i + length).split('');

    const duplicates = letters.map((letter, j) =>
      letters.filter((_, k) => k !== j).includes(letter),
    );

    if (!duplicates.includes(true)) {
      position = i + length;
      break;
    }
  }

  return position;
}
