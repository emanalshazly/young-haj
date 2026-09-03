import { describe, expect, it } from 'vitest';
import { initialProgress, reduceProgress } from './progression';

describe('progression', () => {
  it('awards an item once and advances within bounds', () => {
    const answered = reduceProgress(initialProgress(2), { type: 'answer', itemId: 'a', stars: 3 });
    const duplicate = reduceProgress(answered, { type: 'answer', itemId: 'a', stars: 3 });
    expect(duplicate.stars).toBe(3);
    expect(reduceProgress(duplicate, { type: 'next' }).stepIndex).toBe(1);
    expect(reduceProgress(reduceProgress(duplicate, { type: 'next' }), { type: 'next' }).status).toBe('completed');
  });

  it('restarts without retained progress', () => {
    const played = { ...initialProgress(3), status: 'playing' as const, stars: 2, completedIds: ['a'] };
    expect(reduceProgress(played, { type: 'restart' })).toEqual(initialProgress(3));
  });
});
