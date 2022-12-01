import { readFile, writeFile } from 'node:fs/promises';

const url = 'https://adventofcode.com/2022/day';

async function load(day) {
  const secret = JSON.parse(await readFile('./secret.json', 'utf8'));

  return fetch(`${url}/${day}/input`, {
    headers: {
      credentials: 'same-origin',
      cookie: `session=${secret.cookie}`,
    },
  })
    .then(r => r.text())
    .then(txt => {
      writeFile(`./day${day}/input.txt`, txt);
      return txt;
    });
}

export default function (day, replaceInput = false) {
  if (replaceInput) {
    return load(day);
  }

  return readFile(`./day${day}/input.txt`, 'utf8')
    .then(input => {
      if (input) return input;
      throw 'No input';
    })
    .catch(() => load(day));
}
