import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function parse(input, writeTree = false) {
  const data = input.trim().split('\n');

  const tree = {};
  let currentPath = [];
  let currentDir = tree;
  const sizes = {};

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    if (line.startsWith('$ cd')) {
      const dir = line.split(' ')[2];

      if (dir === '/') {
        currentPath = ['/'];
      } else if (dir === '..') {
        const [root, ...folders] = currentPath.splice(
          0,
          currentPath.length - 1,
        );

        currentDir = folders.reduce((acc, cur) => acc[cur], tree);
        currentPath = [root, ...folders];
      } else {
        currentDir[dir] = {};
        currentDir = currentDir[dir];
        currentPath = [...currentPath, dir];
      }
    } else if (line.startsWith('$ ls')) {
    } else if (!line.startsWith('$')) {
      const [type, name] = line.split(' ');
      currentDir[name] = type === 'dir' ? {} : parseInt(type);

      if (type !== 'dir') {
        const size = parseInt(type);

        currentPath
          .reduce((acc, path) => {
            return acc.length === 0
              ? [path]
              : [...acc, acc.at(-1) + path + '/'];
          }, [])
          .forEach(dir => {
            if (sizes[dir] == null) {
              sizes[dir] = size;
            } else {
              sizes[dir] += size;
            }
          });
      }
    }
  }

  if (writeTree) {
    writeFileSync(`${__dirname}/tree.json`, JSON.stringify(tree));
  }

  return sizes;
}
