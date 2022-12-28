import {
  parse,
  findAllDistances,
  findPermutations,
  computeFlow,
} from './core.js';

export function part1(input) {
  const graph = parse(input);

  const distanceMap = findAllDistances(graph);

  const perms = findPermutations(distanceMap);
  let max = 0;

  for (let i = 0; i < perms.length; i++) {
    const perm = perms[i].split('-');
    const score = computeFlow(perm, graph, distanceMap, 30);

    max = Math.max(max, score);
  }

  return max;
}

export function part2(input) {
  const graph = parse(input);

  const distanceMap = findAllDistances(graph);

  const keys = [...distanceMap.keys()].filter(k => k !== 'AA');

  const length = Math.ceil(keys.length / 2);
  const otherLength = keys.length - length;

  // find all permutations of size 'length' that are possible in 26 minutes
  const perms = findPermutations(distanceMap, {
    left: 26,
    size: length,
  }).map(p => p.split('-'));
  // find all permutations of size 'otherLength' that are possible in 26 minutes
  const otherPerms = findPermutations(distanceMap, {
    left: 26,
    size: otherLength,
  }).map(p => p.split('-'));

  let max = 0;

  for (let i = 0; i < perms.length; i++) {
    const me = perms[i];

    for (let j = 0; j < otherPerms.length; j++) {
      const elephant = otherPerms[j];

      let possible = true;

      // check if couple is possible, meaning no spot is present in both permutations
      for (let k = 0; k < elephant.length; k++) {
        const spot = elephant[k];

        if (me.includes(spot)) {
          possible = false;
          break;
        }
      }

      if (possible) {
        // if couple is possible, compute scores

        // weird stuff here: using pts instead of pts.join('-').split('-') compute a different output
        const _me = me.join('-').split('-');
        const _elephant = elephant.join('-').split('-');

        const myScore = computeFlow(_me, graph, distanceMap);
        const elephantScore = computeFlow(_elephant, graph, distanceMap);
        max = Math.max(max, myScore + elephantScore);
      }
    }
  }

  return max;
}
