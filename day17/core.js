import { readFileSync } from 'fs';

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
            }
          });
        });

      const allYs = rock.map(([x, y]) => y);
      const height = Math.max(...allYs) - Math.min(...allYs);

      return { shape: rock, height };
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

  let n = 0;
  let h = 0;
  let diffN = 0;
  let diffH = 0;
  let total = 0;
  let cycle = new Set();
  let foundNb;

  while (nb < nbRocks) {
    // look for cycles in rock appearances and jet moves
    const rockNb = nb % rocks.length;
    if (!foundNb && rockNb === 0) {
      if (!cycle.has(moveNb)) {
        cycle.add(moveNb);
      } else {
        foundNb = moveNb;
      }
    }

    // rock appears
    nb++;
    // initialize rock position
    let x = deltaX;
    let y = highest + deltaY;

    /**
     * Once a full cycle is found,
     * compute height and number of rock for all remaining full cycles
     * and let the rest of the rocks to be handled normally
     */
    if (diffN && diffH && diffN === nb - n && diffH === highest - h) {
      const remaining = nbRocks - nb;
      const steps = Math.floor(remaining / diffN);
      nb += steps * diffN;
      total = steps * diffH;
    }

    /**
     * Find height and nb of rocks of one full cycle
     * First cycle is going to be merged with first extra steps,
     * so we need an extra cycle to make sure we have exactly one full cycle
     */
    if (rockNb === 0 && moveNb === foundNb) {
      diffN = nb - n;
      diffH = highest - h;
      n = nb;
      h = highest;
    }

    const { shape: rock, height } = rocks[rockNb];

    const extraHeight = yStart - highest <= 4 ? 4 : 0;

    wallHeight = yStart;
    yStart += extraHeight;

    if (showMap) {
      fillWalls(wallHeight + 1, wallHeight + extraHeight);
    }

    let next = false;
    while (!next) {
      const move = moves[moveNb] === '>' ? 1 : -1;
      let dX = move;
      // Right / Left
      for (let i = 0; i < rock.length; i++) {
        const [xR, yR] = rock[i];

        const _x = x + xR + dX;
        const _y = y + yR;

        if (_x === 0 || _x === 8 || blocked.has(`${_x},${_y}`)) {
          dX = 0;
          break;
        }
      }

      let dY = -1;
      // Down
      for (let i = 0; i < rock.length; i++) {
        const [xR, yR] = rock[i];
        const _x = x + xR + dX;
        const _y = y + yR + dY;

        if (_y === 0 || blocked.has(`${_x},${_y}`)) {
          dY = 0;
          break;
        }
      }

      if (Math.abs(dX) + Math.abs(dY)) {
        x = x + dX;
        y = y + dY;
      }
      moveNb = (moveNb + 1) % moves.length;

      if (dY === 0) {
        next = true;
        highest = Math.max(highest, y + height);
        break;
      }
    }

    // update map
    for (let i = 0; i < rock.length; i++) {
      const [xR, yR] = rock[i];
      const _x = x + xR;
      const _y = y + yR;
      blocked.add(`${_x},${_y}`);
      if (showMap) {
        map.set(`${_x},${_y}`, '#');
      }
    }
    if (showMap && nb <= 10) {
      const m = logMap(map, { height: yStart, width });
      console.log(m);
    }
  }

  return highest + total;
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
