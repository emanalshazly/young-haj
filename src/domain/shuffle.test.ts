import { describe, expect, it } from 'vitest';
import { shuffleWith } from './shuffle';

describe('shuffleWith', () => {
  it('is reproducible with an injected random source and does not mutate input', () => {
    const input = [1, 2, 3, 4];
    expect(shuffleWith(input, () => 0)).toEqual([2, 3, 4, 1]);
    expect(input).toEqual([1, 2, 3, 4]);
  });
});
