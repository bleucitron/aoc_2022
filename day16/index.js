import { parse } from './core.js';

export function part1(input) {
  const spots = parse(input);

  const spotByPosition = {};
  spots.forEach(spot => {
    spotByPosition[spot.position] = spot;
  });

  const start = spots.find(spot => (spot.position = 'AA'));
  let pressure = 0;
  let ppm = 0;
  let minutes = 30;
  let current = start;

  // const tree = new Map();
  // const step = {
  //   ...start,
  //   path: start.position,
  //   ppm: 0,
  //   open: false,
  //   released: 0,
  //   minutes: 30,
  // };
  // tree.set(start.position, step);
  // const queue = [step];
  // let i = 0;
  // while (i < 10000 && queue.filter(step => step.minutes > 0).length > 0) {
  //   const current = queue.shift();
  //   console.log('check', queue.filter(step => step.minutes > 0).length);

  //   let { options, ppm, released, minutes, rate, open, path } = current;

  //   if (minutes === 0) {
  //     continue;
  //   }

  //   if (rate > 0 && !open) {
  //     released += ppm;
  //     minutes--;
  //     open = !open;
  //     ppm += rate;
  //   }

  //   minutes--;

  //   console.log('STEP', minutes);

  //   options.forEach(option => {
  //     const nextPath = `${path}-${option}`;
  //     const spot = spotByPosition[option];

  //     const step = { ...spot, path: nextPath, minutes, released, ppm, open };
  //     tree.set(nextPath, step);
  //     queue.push(step);
  //   });
  //   console.log('after', queue.length);
  //   i++;
  // }

  // console.log('Queue', queue);
  // console.log('Tree', tree);

  return spots.length;
}

export function part2(input) {
  const data = parse(input);

  return data.length;
}
