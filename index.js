import load from './load.js';

const day = process.argv[2];
const reset = process.argv[3];

Promise.all([
  load(day, reset === 'replace'),
  import(`./day${day}/index.js`),
]).then(([input, { part1, part2 }]) => {
  console.log('*** Part 1 ***');
  console.log(part1(input));
  console.log('*** Part 2 ***');
  console.log(part2(input));
});
