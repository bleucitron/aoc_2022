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

function printState({
  ore,
  clay,
  obsidian,
  geode,
  oreBots,
  clayBots,
  obsidianBots,
  geodeBots,
}) {
  console.log('  o  |  C  |  O  |  G  | o-bot | C-bot | O-bot | G-bot ');

  const qties = [ore, clay, obsidian, geode]
    .map(e => e.toString())
    .map(e => e.padStart(4).padEnd(5));
  const bots = [oreBots, clayBots, obsidianBots, geodeBots]
    .map(e => e.toString())
    .map(e => e.padStart(4).padEnd(7));
  console.log([...qties, ...bots].join('|'));
}

export function run(blueprints) {
  const [oreRobot, clayRobot, obsidianRobot, geodeRobot] = blueprints;

  let oreBots = 1;
  let clayBots = 0;
  let obsidianBots = 0;
  let geodeBots = 0;

  let ore = 0;
  let clay = 0;
  let obsidian = 0;
  let geode = 0;

  for (let minute = 1; minute <= 24; minute++) {
    console.log('');
    console.log('Minute', minute);

    const extras = {};
    let factory = geodeRobot;
    let building = false;

    factory = geodeRobot;

    if (ore >= factory.ore && obsidian >= factory.obsidian) {
      console.log('Building Geode robot');
      extras.geode = 1;
      ore -= factory.ore;
      obsidian -= factory.obsidian;
      building = true;
    }
    factory = obsidianRobot;
    if (!building && ore >= factory.ore && clay >= factory.clay) {
      console.log('Building Obsidian robot');
      extras.obsidian = 1;
      ore -= factory.ore;
      clay -= factory.clay;
      building = true;
    }
    factory = clayRobot;
    if (!building && ore >= factory.ore) {
      console.log('Building Clay robot');
      extras.clay = 1;
      ore -= factory.ore;
      building = true;
    }
    factory = oreRobot;
    if (!building && ore >= factory.ore) {
      console.log('Building Ore robot');
      extras.ore = 1;
      ore -= factory.ore;
      building = true;
    }

    ore += oreBots;
    clay += clayBots;
    obsidian += obsidianBots;
    geode += geodeBots;

    oreBots += extras.ore ?? 0;
    clayBots += extras.clay ?? 0;
    obsidianBots += extras.obsidian ?? 0;
    geodeBots += extras.geode ?? 0;

    printState({
      ore,
      clay,
      obsidian,
      geode,
      oreBots,
      clayBots,
      obsidianBots,
      geodeBots,
    });
  }

  return geode;
}
