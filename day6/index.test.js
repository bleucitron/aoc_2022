import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { part1, part2 } from './index.js';

const input = readFileSync(`${__dirname}/test.txt`, 'utf8');
const input2 = readFileSync(`${__dirname}/test2.txt`, 'utf8');
const input3 = readFileSync(`${__dirname}/test3.txt`, 'utf8');
const input4 = readFileSync(`${__dirname}/test4.txt`, 'utf8');
const input5 = readFileSync(`${__dirname}/test5.txt`, 'utf8');

describe('Day 4', () => {
  it('Part 1', () => {
    expect(part1(input)).toBe(7);
    expect(part1(input2)).toBe(5);
    expect(part1(input3)).toBe(6);
    expect(part1(input4)).toBe(10);
    expect(part1(input5)).toBe(11);
  });

  it('Part 2', () => {
    expect(part2(input)).toBe(19);
    expect(part2(input2)).toBe(23);
    expect(part2(input3)).toBe(23);
    expect(part2(input4)).toBe(29);
    expect(part2(input5)).toBe(26);
  });
});
