import { parse } from './core.js';

function run({
  during,
  blueprints,
  maxNeeded,
  minute = 1,
  quantities = { ore: 0, clay: 0, obsidian: 0, geode: 0 },
  bots = { ore: 1, clay: 0, obsidian: 0, geode: 0 },
}) {
  if (minute === 1) {
    console.log('Starting run');
  }
  const { ore, clay, obsidian, geode } = quantities;

  Object.keys(quantities).forEach(type => {
    quantities[type] += bots[type];
  });

  const factories = blueprints
    .filter(({ name }) => {
      if (name === 'obsidian' || name === 'geode') return true;

      return bots.obsidian < maxNeeded.obsidian;
    })
    .filter(({ name }) => {
      if (!maxNeeded[name]) return true;

      return bots[name] < maxNeeded[name];
    })
    .filter(({ name, cost }) => {
      if (name === 'ore' || name === 'clay') {
        return ore <= cost.ore * 2;
      }

      return true;
    })
    .filter(({ name }) => {
      if (name === 'ore' || name === 'clay') {
        return bots.obsidian < 2;
      }
      return true;
    })
    .filter(({ cost }) => {
      return (
        ore >= cost.ore &&
        clay >= (cost.clay ?? 0) &&
        obsidian >= (cost.obsidian ?? 0)
      );
    });

  const wait = { name: 'wait', quantities, bots };

  let options = [];

  if (factories.length === 0) {
    options = [wait];
  } else {
    options = factories.map(({ name, cost }) => {
      const newQuantities = { ...quantities };
      const newBots = { ...bots };
      Object.entries(cost).forEach(([type, value]) => {
        newQuantities[type] -= value;
      });

      newBots[name] += 1;

      return { name, quantities: newQuantities, bots: newBots };
    });
    const skip = { name: 'skip', quantities, bots };
    if (
      bots.ore < maxNeeded.ore &&
      bots.clay < maxNeeded.clay
      // bots.obsidian < 2
    ) {
      options.push(skip);
    }
  }

  // wait-wait-clay-wait-clay-wait-clay-wait-clay-wait-skip-obsidian-wait-skip-obsidian-wait-wait-geode-wait-obsidian-wait-geode-wait-geode'
  // wait-wait-clay-wait-clay-wait-clay-wait-skip-skip-obsidian-clay-wait-skip-obsidian-wait-wait-geode-wait-skip-geode-obsidian-wait-geode

  const results =
    minute < during
      ? options.map(({ name, quantities, bots }) => {
          const b = run({
            during,
            blueprints,
            maxNeeded,
            minute: minute + 1,
            quantities,
            bots,
          });
          // return b;
          return { ...b, name: `${name} ${b.name}` };
        })
      : options;

  const best = results.sort(
    (o1, o2) => o2.quantities.geode - o1.quantities.geode,
  )[0];
  return best;
}

export function part1(input) {
  const data = parse(input);

  // const blueprints = data[1];
  // const maxNeeded = {};
  // blueprints.forEach(({ cost }) => {
  //   Object.entries(cost).forEach(([key, value]) => {
  //     maxNeeded[key] = Math.max(maxNeeded[key] ?? 0, value ?? 0);
  //   });
  // });

  // const result = run({ during: 32, blueprints, maxNeeded });
  // console.log('Result', result);

  // return 1;

  const results = data.map(blueprints => {
    console.log('Blueprints', blueprints);
    const maxNeeded = {};
    blueprints.forEach(({ cost }) => {
      Object.entries(cost).forEach(([key, value]) => {
        maxNeeded[key] = Math.max(maxNeeded[key] ?? 0, value ?? 0);
      });
    });

    return run({ during: 24, blueprints, maxNeeded });
  });

  console.log('results', results);
  const qualities = results
    .map(results => results.quantities.geode)
    .reduce((acc, result, i) => acc + (i + 1) * result, 0);

  console.log({ qualities });
  return qualities;
}

export function part2(input) {
  const data = parse(input);
  const blueprints = data[0];
  const maxNeeded = {};
  blueprints.forEach(({ cost }) => {
    Object.entries(cost).forEach(([key, value]) => {
      maxNeeded[key] = Math.max(maxNeeded[key] ?? 0, value ?? 0);
    });
  });

  const result = run({ during: 32, blueprints, maxNeeded });
  console.log('Result', result);
  // const results = data.filter((_d, i) => i < 3).map(e => run(32, e));
  // console.log('results', results);

  // .map(e => run(e));
  // console.log('results', results);
  // const qualities = results
  //   .map(results => results.quantities.geode)
  //   .reduce((acc, result, i) => acc + (i + 1) * result, 0);

  return 1;
  // return results.reduce((acc, r) => acc * r.quantities.geode, 1);
}
