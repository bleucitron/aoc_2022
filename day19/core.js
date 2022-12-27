const oreRegex = /Each (.+) robot costs (\d+) ore/;
const clayRegex = /Each (.+) robot costs (\d+) ore/;
const obsidianRegex = /Each (.+) robot costs (\d+) ore and (\d+) clay/;
const geodeRegex = /Each (.+) robot costs (\d+) ore and (\d+) obsidian/;

const regex = [oreRegex, clayRegex, obsidianRegex, geodeRegex];

export function parse(input) {
  const lines = input.trim().split('\n');

  const data = lines.map(line =>
    line
      .split(':')[1]
      .trim()
      .split('.')
      .filter(s => s)
      .map(s => s.trim())
      .map((s, i) => {
        const m = s.match(regex[i]);

        const name = m?.[1];
        const ore = parseInt(m?.[2]);
        const other = parseInt(m?.[3]);
        const cost = { ore };
        if (other) {
          cost[i <= 2 ? 'clay' : 'obsidian'] = other;
        }

        return { name, cost };
      }),
  );

  return data;
}

export function run(blueprint, minutes = 32) {
  let possibles = [
    {
      quantities: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
      bots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
    },
  ];
  const maxNeeded = getMaxNeeded(blueprint);

  for (let minute = 0; minute < minutes; minute++) {
    // for each minute

    let maxObs = 0;
    let maxGeo = 0;
    possibles.forEach(p => {
      maxObs = Math.max(maxObs, p.bots.obsidian);
      maxGeo = Math.max(maxGeo, p.bots.geode);
    });

    // mitigate number of possibles when options with superior nb of bots are available
    if (maxGeo < 2) {
      if (maxObs > 3) {
        possibles = possibles.filter(p => p.bots.obsidian > maxObs - 3);
      }
    } else {
      possibles = possibles.filter(p => p.bots.geode > maxGeo - 2);
    }

    let newPossibles = [];

    for (let j = 0; j < possibles.length; j++) {
      // for each possible

      const possible = possibles[j];
      const { quantities, bots } = possible;
      const { ore, clay, obsidian, geode } = quantities;

      Object.keys(quantities).forEach(type => {
        quantities[type] += bots[type];
      });

      const factories = blueprint
        .filter(({ name }) => {
          if (name === 'obsidian' || name === 'geode') return true;

          return bots.obsidian <= maxNeeded.obsidian;
        })
        .filter(({ name }) => {
          if (!maxNeeded[name]) return true;

          return bots[name] <= maxNeeded[name];
        })
        .filter(({ name, cost }) => {
          if (name === 'ore' || name === 'clay') {
            return ore <= cost.ore * 2;
          }

          return true;
        })
        .filter(({ name }) => {
          if (name === 'ore' || name === 'clay') {
            return bots.obsidian < 5;
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
        newPossibles.push(wait);
      } else {
        options = factories.map(({ name, cost }) => {
          const newQuantities = { ...quantities };
          const newBots = { ...bots };
          Object.entries(cost).forEach(([type, value]) => {
            newQuantities[type] -= value;
          });

          newBots[name] += 1;

          const output = { name, quantities: newQuantities, bots: newBots };
          newPossibles.push(output);
          return output;
        });
        const skip = { name: 'skip', quantities, bots };
        if (bots.ore < maxNeeded.ore && bots.clay < maxNeeded.clay) {
          options.push(skip);
          newPossibles.push(skip);
        }
      }
    }

    possibles = newPossibles;
  }

  let max = 0;
  for (let k = 0; k < possibles.length; k++) {
    max = Math.max(max, possibles[k].quantities.geode);
  }

  return max;
}

function getMaxNeeded(blueprint) {
  const maxNeeded = {};
  blueprint.forEach(({ cost }) => {
    Object.entries(cost).forEach(([key, value]) => {
      maxNeeded[key] = Math.max(maxNeeded[key] ?? 0, value ?? 0);
    });
  });
  return maxNeeded;
}
