import { parse } from './core.js';

export function part1(input) {
  const data = parse(input);

  const trees = [];

  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - 1; j++) {
      const tree = data[i][j];

      if (
        tree <= data[i][0] &&
        tree <= data[0][j] &&
        tree <= data.at(-1)[j] &&
        tree <= data[i].at(-1)
      ) {
        if (!trees[i - 1]) {
          trees[i - 1] = [];
        }
        trees[i - 1][j - 1] = false;
      } else {
        if (!trees[i - 1]) {
          trees[i - 1] = [];
        }
        let visible = true;

        let x = i;
        while (x > 0) {
          x--;
          if (data[x][j] >= tree) {
            visible = false;
            break;
          }
        }

        if (visible) {
          trees[i - 1][j - 1] = true;
        } else {
          x = j;
          let visible = true;
          while (x > 0) {
            x--;
            if (data[i][x] >= tree) {
              visible = false;
              break;
            }
          }

          if (visible) {
            trees[i - 1][j - 1] = true;
          } else {
            x = i;
            let visible = true;
            while (x < data.length - 1) {
              x++;
              if (data[x][j] >= tree) {
                visible = false;
                break;
              }
            }

            if (visible) {
              trees[i - 1][j - 1] = true;
            } else {
              x = j;
              let visible = true;
              while (x < data.length - 1) {
                x++;
                if (data[i][x] >= tree) {
                  visible = false;
                  break;
                }
              }
              trees[i - 1][j - 1] = visible;
            }
          }
        }
      }
    }
  }

  return (
    trees.flat().filter(x => x).length +
    2 * data.length +
    2 * (data[0].length - 2)
  );
}

export function part2(input) {
  const data = parse(input);

  const scores = [];

  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - 1; j++) {
      const tree = data[i][j];

      if (!scores[i - 1]) {
        scores[i - 1] = [];
      }

      let x = i;
      let blocked = false;
      while (x > 0) {
        x--;
        if (data[x][j] >= tree) {
          scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * Math.abs(x - i);
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * i;
      }

      x = j;
      blocked = false;
      while (x > 0) {
        x--;
        if (data[i][x] >= tree) {
          scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * Math.abs(x - j);
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * j;
      }

      x = i;
      blocked = false;
      while (x < data.length - 1) {
        x++;
        if (data[x][j] >= tree) {
          scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * Math.abs(x - i);
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        scores[i - 1][j - 1] =
          (scores[i - 1][j - 1] ?? 1) * (data.length - i - 1);
      }

      x = j;
      blocked = false;
      while (x < data.length - 1) {
        x++;
        if (data[i][x] >= tree) {
          scores[i - 1][j - 1] = (scores[i - 1][j - 1] ?? 1) * Math.abs(x - j);
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        scores[i - 1][j - 1] =
          (scores[i - 1][j - 1] ?? 1) * (data[i].length - j - 1);
      }
    }
  }

  return Math.max(...scores.flat());
}
