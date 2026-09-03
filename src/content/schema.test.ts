import { describe, expect, it } from 'vitest';
import { journeyContent } from './hajj-v1';
import { validateJourneyContent } from './schema';

describe('journey content schema', () => {
  it('accepts the committed content inventory', () => {
    expect(validateJourneyContent(journeyContent)).toEqual([]);
  });

  it('rejects duplicate IDs and invalid quiz answers', () => {
    const duplicate = structuredClone(journeyContent);
    duplicate[1].id = duplicate[0].id;
    if (duplicate[0].options) duplicate[0].options.forEach((option) => { option.isCorrect = false; });

    expect(validateJourneyContent(duplicate)).toEqual(expect.arrayContaining([
      expect.stringContaining('duplicate id'),
      expect.stringContaining('exactly one correct option'),
    ]));
  });

  it('requires an explicit review status for each item', () => {
    const missingReview = structuredClone(journeyContent) as unknown as Array<Record<string, unknown>>;
    delete missingReview[0].review;
    expect(validateJourneyContent(missingReview)).toContain('ihram: missing review status');
  });
});
