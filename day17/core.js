import { readFileSync } from 'fs';

// function getRockHeight(rock) {
//   const ys = new Set();

//   rock.forEach(point => {
//     const [_, y] = parsePosition(point);
//     ys.add(y);
//   });
//   return ys.size;
// }

export function parse(input) {
  const rocks = readFileSync('./day17/rocks.txt')
    .toString()
    .trim()
    .split('\n\n')
    .map(block => {
      const rock = [];

      block
        .split('\n')
        .reverse()
        .map((line, y) => {
          line.split('').forEach((letter, x) => {
            if (letter === '#') {
              rock.push([x, y]);
              // rock.push(`${x},${y}`);
            }
          });
        });

      // return {layout: rock, height: getRockHeight(rock)};
      return rock;
    });

  const moves = input.trim().split('');

  return { rocks, moves };
}

export function play(rocks, moves, nbRocks) {
  const map = new Map();
  const blocked = new Set();
  let yStart = 0;
  const width = 7;

  const showMap = false;

  // fill the map
  function fillWalls(start, end) {
    for (let j = start; j < end + 1; j++) {
      map.set(`${0},${j}`, '|');
      map.set(`${8},${j}`, '|');
    }
  }
  if (showMap) {
    for (let i = 0; i < width + 2; i++) {
      map.set(`${i},${0}`, i === 0 || i === 8 ? '+' : '-');
      map.set(`${i},${0}`, i === 0 || i === 8 ? '+' : '-');
    }
    fillWalls(3);
  }

  let nb = 0;
  let [deltaX, deltaY] = [3, 4];

  let highest = 0;
  let wallHeight = 0;
  let moveNb = 0;

  const _nb = showMap ? 10 : nbRocks;
  // while (nb < 2) {
  while (nb < nbRocks) {
    // rock appears
    const rockNb = nb % rocks.length;
    let rock = [...rocks[rockNb]];
    nb++;
    if (nb % 100000 === 0) console.log(nb);

    const extraHeight = yStart - highest <= 4 ? 4 : 0;

    wallHeight = yStart;
    yStart += extraHeight;

    if (showMap) fillWalls(wallHeight + 1, wallHeight + extraHeight);

    // initialize rock position
    for (let i = 0; i < rock.length; i++) {
      let [x, y] = rock[i];
      x += deltaX;
      y += deltaY + highest;

      rock[i] = [x, y];
    }

    let next = false;
    while (!next) {
      const move = moves[moveNb] === '>' ? 1 : -1;
      let dX = move;
      // Right / Left
      for (let i = 0; i < rock.length; i++) {
        const [x, y] = rock[i];

        if (
          x + move === 0 ||
          x + move === 8 ||
          blocked.has(`${x + move},${y}`)
        ) {
          dX = 0;
          break;
        }
      }

      let dY = -1;
      // Down
      for (let i = 0; i < rock.length; i++) {
        const [x, y] = rock[i];

        if (y + dY === 0 || blocked.has(`${x + dX},${y + dY}`)) {
          dY = 0;
          break;
        }
      }

      if (Math.abs(dX) + Math.abs(dY)) {
        for (let i = 0; i < rock.length; i++) {
          const [x, y] = rock[i];

          rock[i] = [x + dX, y + dY];
        }
      }
      moveNb = (moveNb + 1) % moves.length;
      if (dY === 0) {
        next = true;
        break;
      }
    }

    // console.log('ROCK', rock);
    highest = Math.max(highest, Math.max(...rock.map(([_, y]) => y)));

    // update map
    for (let i = 0; i < rock.length; i++) {
      const [x, y] = rock[i];
      blocked.add(`${x},${y}`);
      map.set(`${x},${y}`, '#');
    }

    if (showMap) {
      const m = logMap(map, { height: yStart, width });
      console.log(m);
    }
  }

  return highest;
}

export function parsePosition(position) {
  return position.split(',').map(n => parseInt(n));
}

export function logMap(map, { height, width }) {
  const list = [];
  height = height + 1;
  width = width + 2;
  for (let n = 0; n < height * width; n++) {
    const i = n % width;
    const j = Math.floor(n / width);
    if (i === 0) {
      list[j] = [];
    }

    list[j][i] = ' ';
  }

  [...map.entries()].forEach(([position, value]) => {
    const [x, y] = parsePosition(position);
    // console.log({ x, y });
    list[y][x] = value;
  });

  let s = '';
  list.forEach(line => {
    let _s = '';
    line.forEach(pt => {
      _s += pt;
    });
    _s = _s.split('').reverse().join('');
    s += _s;
    s += '\n';
  });

  return s.split('').reverse().join('');
}
