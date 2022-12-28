export function parse(input) {
  let data = input.trim().split('\n');

  const graph = new Map();

  data.forEach(line => {
    const m = line
      .replace('valves', 'valve')
      .replace('tunnels', 'tunnel')
      .replace('leads', 'lead')
      .match(
        /Valve ([A-Z][A-Z]) has flow rate=(\d+); tunnel lead to valve (.+)/,
      );

    const position = m[1];
    const rate = parseInt(m[2]);
    const options = new Set(m[3].split(',').map(d => d.trim()));

    const node = { position, rate, options, open: false };

    graph.set(position, node);
  });

  return graph;
}

export function findAllDistances(graph) {
  const allPoints = [...graph.values()]
    .filter(v => v.rate > 0)
    .map(p => p.position);

  const m = new Map();

  ['AA', ...allPoints].forEach(point => {
    const d = findDistances(graph, point);

    m.set(point, d);
  });

  return m;
}

function findDistances(graph, start) {
  const allPoints = [...graph.values()].map(v => v.position !== start);
  const distances = new Map();

  allPoints.forEach(end => {
    const queue = [{ position: start, prev: undefined }];

    const visited = new Map();
    let current;

    while (queue.length) {
      current = queue.shift();
      const { position } = current;
      visited.set(position, current);

      if (position === end.position) {
        break;
      }
      const node = graph.get(position);

      node.options.forEach(option => {
        if (!visited.has(option)) {
          queue.push({ position: option, prev: position });
        }
      });
    }

    visited.forEach(v => {
      if (!v.prev) return;

      const valve = graph.get(v.position);
      if (!valve.rate) return;

      let current = v;
      const path = [];

      while (current.prev) {
        path.unshift(current.position);
        current = visited.get(current.prev);
      }

      distances.set(v.position, path.length);
    });
  });

  return distances;
}

export function findPermutations(
  distanceMap,

  { path = '', left = 30, size = distanceMap.size } = {
    path: '',
    left: 30,
    size: distanceMap.size,
  },
) {
  const previous = path.split('-').filter(e => e);
  const latest = previous.at(-1) ?? 'AA';

  const ends = [...distanceMap.get(latest).entries()].filter(
    ([e]) => !previous.includes(e),
  );

  let perms = [];
  if (previous.length < size) {
    ends.forEach(([end, distance]) => {
      const remaining = left - distance - 1;
      if (remaining > 0) {
        const newPath = path ? `${path}-${end}` : end;
        const subPerms = findPermutations(distanceMap, {
          path: newPath,
          left: remaining,
          size,
        });
        if (subPerms.length) {
          subPerms.forEach(p => {
            perms.push(p);
          });
        } else {
          perms.push(newPath);
        }
      }
    });
  }
  if (!perms.length) {
    perms = [path];
  }
  return perms;
}

export function computeFlow(path, graph, distanceMap, minutes = 26) {
  let score = 0;
  let flow = 0;
  let prev = 'AA';

  while (path.length) {
    const current = path.shift();
    const distance = distanceMap.get(prev).get(current);

    minutes -= distance + 1;

    score += (distance + 1) * flow;
    flow += graph.get(current).rate;
    prev = current;
  }

  while (minutes > 0) {
    score += flow;
    minutes--;
  }

  return score;
}
