import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { snafu } from './core.js';
import { part1 } from './index.js';

const input = readFileSync(`${__dirname}/test.txt`, 'utf8');

describe('Day 25', () => {
  it('SNAFU', () => {
    expect(snafu(1)).toBe('1');
    expect(snafu(2)).toBe('2');
    expect(snafu(3)).toBe('1=');
    expect(snafu(4)).toBe('1-');
    expect(snafu(5)).toBe('10');
    expect(snafu(6)).toBe('11');
    expect(snafu(7)).toBe('12');
    expect(snafu(8)).toBe('2=');
    expect(snafu(9)).toBe('2-');
    expect(snafu(10)).toBe('20');
    expect(snafu(15)).toBe('1=0');
    expect(snafu(20)).toBe('1-0');
    expect(snafu(2022)).toBe('1=11-2');
    expect(snafu(12345)).toBe('1-0---0');
    expect(snafu(314159265)).toBe('1121-1110-1=0');
  });

  it('Part 1', () => {
    expect(part1(input)).toBe('2=-1=0');
  });
});
